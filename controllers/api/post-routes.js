//include dependencies
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
const withAuth = require('../../utils/auth');

// all posts
router.get('/', (req, res) => {
    Post.findAll({
        // find all posts
        attributes: [
            'id',
            'post_body',
            'title',
            'created_at',
          ],
        // descending order of posts from most recent
        order: [[ 'created_at', 'DESC']],
        // include username, comment details
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
    //return post data
    .then(dbPostData => res.json(dbPostData))
    // catch server error and exit function
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// find post by id
router.get('/:id', (req, res) => {
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
        // return error if post does not exist
        if (!dbPostData) {
          res.status(404).json({ message: 'The post you are requesting does not exist' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        // catch server errors and exit function
        console.log(err);
        res.status(500).json(err);
      });
  });

// create post
router.post('/', withAuth, (req, res) => {
    
    Post.create({
        title: req.body.title,
        post_body: req.body.post_body,
        user_id: req.session.user_id
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//update post
router.put('/:id', withAuth, (req, res) => {
    Post.update({
      title: req.body.title,
      post_body: req.body.post_body,
      user_id: req.session.user_id
  },
        {
            where: {
                id: req.params.id
            }
        }
    )
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'The post requested does not exist.' });
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// delete post
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'It looks like no posts exist with that id.' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;