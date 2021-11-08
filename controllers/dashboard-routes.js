// add dependencies
const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth')

// render dash for user only
router.get('/', withAuth, (req, res) => {
    // find all user posts
    Post.findAll({
      where: {
        user_id: req.session.user_id
      },
      attributes: [
        'id',
        'title',
        'post_body',
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
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// edit post
router.get('/edit/:id', withAuth, (req, res) => {
  // find post by id
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
      // if post does not exist, return error
      if (!dbPostData) {
        res.status(404).json({ message: 'No post has been found with this id!' });
        return;
      }
      // serialize the data
      const post = dbPostData.get({ plain: true });
      res.render('edit-post', { post, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// edit user
router.get('/edituser', withAuth, (req, res) => {
  // find by session user_id
  User.findOne({
    // do not return password data for display
    attributes: { exclude: ['password'] },
    where: {
      id: req.session.user_id
    }
  })
    .then(dbUserData => {
      if (!dbUserData) {
        // return error if user is not found by that id
        res.status(404).json({ message: 'Uh oh! No matching user data has been found.' });
        return;
      }
      // if found, return user data
      const user = dbUserData.get({ plain: true });
      res.render('edit-user', {user, loggedIn: true});
    })
    //catch server errors and end function
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    })
  });

module.exports = router;