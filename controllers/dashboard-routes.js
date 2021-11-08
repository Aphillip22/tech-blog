// add dependencies
const router = require('express').Router();
const sequelize = require('../config/connection');
// import models
const { Post, User, Comment } = require('../models');
// auth middleware to redirect users to login page
const withAuth = require('../utils/auth')

// render dashboard only for logged in users using withAuth proclaimed above
router.get('/', withAuth, (req, res) => {
    // find all posts
    Post.findAll({
      where: {
        // session ID
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'post_body',
        'title',
        'created_at',
      ],
      include: [
        {
          model: Comment,
          attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username']
        }
      ]
    })
      .then(dbPostData => {
        // serialize the data
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', { posts, loggedIn: true });
      })
        // catch errors
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// edit post route using withAuth
router.get('/edit/:id', withAuth, (req, res) => {
  // find one post by id
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
    include: [
      {
        model: Comment,
        attributes: ['id', 'comment_body', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      // return error if post does not exist
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }
      // serialize the data
      const post = dbPostData.get({ plain: true });
      res.render('edit-post', { post, loggedIn: true });
    })
     //catch errors and exit function
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// route to edit user using withAuth
router.get('/edituser', withAuth, (req, res) => {
  // find user by id
  User.findOne({
    // do not include password in retrieved data
    attributes: { exclude: ['password'] },
    where: {
      // use session id
      id: req.session.user_id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        // if no user is found, return an error
        res.status(404).json({ message: 'No user found with this id' });
        return;
      }
      // otherwise, return the data for the requested user
      const user = dbUserData.get({ plain: true });
      res.render('edit-user', {user, loggedIn: true});
    })
    .catch(err => {
      // catch server errors
      console.log(err);
      res.status(500).json(err);
    })
  });

module.exports = router;