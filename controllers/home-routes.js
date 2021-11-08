const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

// render home page
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_body',
            'title',
            'created_at',
          ],
        // most recent to oldest order
        order: [[ 'created_at', 'DESC']],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    // render posts
    .then(dbPostData => {
      // create an array and sequelize object
      const posts = dbPostData.map(post => post.get({ plain: true }));
      // pass the posts into the homepage
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    // catch server errors and display
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// find single post
router.get('/post/:id', (req, res) => {
    Post.findOne({
      where: {
        // find by id
        id: req.params.id
      },
      attributes: [
        'id',
        'post_body',
        'title',
        'created_at',
      ],
      include: [
        {
          model: User,
          attributes: ['username']
        },
        {
            model: Comment,
            attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['username']
            }
        }
      ]
    })
      .then(dbPostData => {
        // return error if no post found by id
        if (!dbPostData) {
          res.status(404).json({ message: 'It looks like there are no posts matching your query!' });
          return;
        }
        // serialize the data
        const post = dbPostData.get({ plain: true });
        
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
          });
      })
      // catch server error and exit function
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// Render the login page or redirect to home
router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
  
    res.render('login');
  });

// Render the sign up page or redirect to home
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }

  res.render('signup');
});

module.exports = router;