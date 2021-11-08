//include dependencies
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const session = require('express-session');
const withAuth = require('../../utils/auth');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//get all users
router.get('/', (req, res) => {
    User.findAll({
        // do not show pw
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

// get user by id
router.get('/:id', (req, res) => {
    User.findOne({
      // exclude pw from display
      attributes: { exclude: ['password'] },
      where: {
        id: req.params.id
      },
      // include posts and comments by user
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
        if (!dbUserData) {
          // return error if user does not exist
          res.status(404).json({ message: 'The user does not exist in our records!' });
          return;
        }
        // if user exists, return data
        res.json(dbUserData);
      })
        // catch server error and exit function
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// new user
router.post('/', (req, res) => {
  User.create({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  })
    // confirm by displaying data and store
    .then(dbUserData => {
      req.session.save(() => {
        req.session.user_id = dbUserData.id;
        req.session.username = dbUserData.username;
        req.session.loggedIn = true;
    
        res.json(dbUserData);
      });
    })
    //catch server error and exit function
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// login
router.post('/login',  (req, res) => {
  //find user by email
    User.findOne({
        where: {
        email: req.body.email
        }
    }).then(dbUserData => {
        // return error if email does not exist
        if (!dbUserData) {
        res.status(400).json({ message: 'No user registered with that email!' });
        return;
        }
        // verify user
        const validPassword = dbUserData.checkPassword(req.body.password);
        // if pw incorrect, return error
        if (!validPassword) {
            res.status(400).json({ message: 'Invalid credentials!' });
            return;
        }
        // if successful, display success message and redirect
        req.session.save(() => {
          // declare session variables
          req.session.user_id = dbUserData.id;
          req.session.username = dbUserData.username;
          req.session.loggedIn = true;
    
          res.json({ user: dbUserData, message: 'Thanks for logging in!' });
        });
    });  
});

// logout user
router.post('/logout', withAuth, (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
})

// update user
router.put('/:id', withAuth, (req, res) => {
    User.update(req.body, {
        // find hook for pw hashing
        individualHooks: true,
        // find user by id
        where: {
            id: req.params.id
        }
    })
      .then(dbUserData => {
        if (!dbUserData[0]) {
          res.status(404).json({ message: 'This user does not exist in our records!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  })

// delete user
router.delete('/:id', withAuth, (req, res) => {
    User.destroy({
      where: {
        //find user by id
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'It looks like this user does not exist in our records!' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;