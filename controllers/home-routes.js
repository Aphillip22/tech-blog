//add dependencies
const router = require('express').Router();
const sequelize = require('../config/connection');
//import models
const { Post, User, Comment } = require('../models');

// Render the home page
router.get('/', (req, res) => {
    Post.findAll({
        // find all posts by all users, no authorization required
        attributes: [
            'id',
            'post_body',
            'title',
            'created_at',
          ],
        // Order most recent at top
        order: [[ 'created_at', 'DESC']],
        // include username and comment body with user name and created date/time stamp
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
    // render the posts
    .then(dbPostData => {
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('homepage', {
        posts,
        loggedIn: req.session.loggedIn
      });
    })
    // catch server errors and exit function
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// Render single post
router.get('/post/:id', (req, res) => {
    //find post by id
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'post_body',
        'title',
        'created_at',
      ],
      //return posting username and all comments with usernames and date/time stamps
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
        // return error if no post with that id exists
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        // serialize the data
        const post = dbPostData.get({ plain: true });
        res.render('single-post', {
            post,
            loggedIn: req.session.loggedIn
          });
      })
      .catch(err => {
        // catch server errors and exit function
        console.log(err);
        res.status(500).json(err);
      });
  });

// render login page or redirect to home page if user is logged in
router.get('/login', (req, res) => {
    // validate if user is logged in
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    //render login page if not logged in
    res.render('login');
  });

// Render the registration page or redirect to home if user is logged in
router.get('/signup', (req, res) => {
    //validate if user is logged in
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  //render registration page if not logged in
  res.render('signup');
});

module.exports = router;