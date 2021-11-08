//include dependencies
const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const sequelize = require('../../config/connection');
// Authorization Helper
const withAuth = require('../../utils/auth');

// find all posts
router.get('/', (req, res) => {
    Post.findAll({
        attributes: [
            'id',
            'post_body',
            'title',
            'created_at',
          ],
        // Order the posts from most recent to oldest
        order: [[ 'created_at', 'DESC']],
        //include username and all comments associated to post id
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
    // return all posts
    .then(dbPostData => res.json(dbPostData))
    // catch server errors and exit function
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//find post by id
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
        // return error if no post exists with id defined
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        //return json data requested
        res.json(dbPostData);
      })
      //catch server errors and exit function
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// create new posts
router.post('/', withAuth, (req, res) => {
    // define fieldnames required
    Post.create({
        title: req.body.title,
        post_text: req.body.post_body,
        user_id: req.session.user_id
    })
    //push data to database
    .then(dbPostData => res.json(dbPostData))
    //catch server errors and exit function
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

//update post body or title by id
router.put('/:id', withAuth, (req, res) => {
    Post.update(req.body,
        {
            where: {
                id: req.params.id
            }
        }
    )
    // return error if no post exists with id requested
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }
        //return post data if id exists
        res.json(dbPostData);
    })
    //catch server errors and exit function
    .catch(err => {
        console.log(err);
        res.status(500).json(err)
    });
});

// delete post by id
router.delete('/:id', withAuth, (req, res) => {
    Post.destroy({
      where: {
        id: req.params.id
      }
    })
    // return error if no post exists with id requested
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        //return data if id does exist
        res.json(dbPostData);
      })
      //catch server errors and exit function
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

module.exports = router;