//include dependencies
const router = require('express').Router();
const { Comment } = require('../../models');
// include authorization helper
const withAuth = require('../../utils/auth');

// access comments
router.get('/', (req, res) => {
    // find all comments
    Comment.findAll()
      // return in JSON format
      .then(dbCommentData => res.json(dbCommentData))
      // catch server errors and exit function
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// add a comment
router.post('/', withAuth, (req, res) => {
  // validate session and create comment if session exists
  if (req.session) {
    Comment.create({
      comment_body: req.body.comment_body,
      post_id: req.body.post_id,
      user_id: req.session.user_id
    })
        //push data to comment database
      .then(dbCommentData => res.json(dbCommentData))
      //catch server errors and exit function
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// delete comments
router.delete('/:id', withAuth, (req, res) => {
    //validate session and identify comment by id
    Comment.destroy({
        where: {
          id: req.params.id
        }
      })
      // return error if no comment exists with this id
        .then(dbCommentData => {
          if (!dbCommentData) {
            res.status(404).json({ message: 'No comment found with this id' });
            return;
          }
          //push updates to database
          res.json(dbCommentData);
        })
        //catch server errors and exit function
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

module.exports = router;