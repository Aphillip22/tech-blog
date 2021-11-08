//include dependencies
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
// const session = require('express-session');
// Authorization Helper
// const withAuth = require('../../utils/auth');
// SequelizeStore to validate and save user session
// const SequelizeStore = require('connect-session-sequelize')(session.Store);

// access all user data
router.get('/', (req, res) => {
    User.findAll({
        // do not return password data with user data
        attributes: { exclude: ['password'] }
    })
      // JSON format
      .then(dbUserData => res.json(dbUserData))
      // catch server errors and exit function
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// find user by id
router.get('/:id', (req, res) => {
    User.findOne({
      // do not include pw data
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      },
      // include posts user has created or commented on
      include: [
        {
          model: Post,
          attributes: ['id', 'title', 'post_body', 'created_at']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
            include: {
                model: Post,
                attributes: ['title']
            }
        }
      ]
    })
      .then(dbUserData => {
          // return error if no user is found with id requested
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        // return data for user if id exists
        res.json(dbUserData);
      })
      // catch server errors and exit function
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// add user
router.post('/', (req, res) => {
  // define required fieldnames
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    // display data for user confirmation and save session
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
    
        res.json(dbUserData);
      });
    })
    // catch server errors and exit function
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// user login
router.post('/login',  (req, res) => {
    // find user by email
    User.findOne({
        where: {
        email: req.body.email
        }
    })
    //return error if no user exists with email requested
    .then(dbUserData => {
        if (!dbUserData) {
        res.status(400).json({ message: 'No user exists with this email!' });
        return;
        }
        // verify user by pw
        const validPassword = dbUserData.checkPassword(req.body.password);
        // return error for invalid pw
        if (!validPassword) {
            res.status(400).json({ message: 'Invalid credentials!' });
            return;
        }
        // save session and display confirmation
        req.session.save(() => {
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
    
          res.json({ user: dbUserData, message: 'Login successful!' });
        });
    });  
});

// Log out route
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
      //end session after validation and display reroute message
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
      //return error route does not exist
    res.status(404).end();
  }
})

// update user data
router.put('/:id', (req, res) => {
    // find user by id and define reqs with req.body as reqs match model exactly
    User.update(req.body, {
        // call pw hash hook
        individualHooks: true,
        where: {
            id: req.params.id
        }
    })
    // return error if no user exists with id requested
      .then(dbUserData => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        //return data if id exists
        res.json(dbUserData);
      })
      //catch server errors and exit function
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  })

// delete user
router.delete('/:id', (req, res) => {
    // validate by id and then destroy
    User.destroy({
      where: {
        id: req.params.id
      }
    })
    // return error if no user exists with id requested
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        //return data if user id exists
        res.json(dbUserData);
      })
      //catch server errors and exit function
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;