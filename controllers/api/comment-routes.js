//include dependencies
const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Get comments
router.get('/', (req, res) => {
    
    Comment.findAll()
  
      .then(dbCommentData => res.json(dbCommentData))
      // catch any server errors
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

// Post new comment
router.post('/', withAuth, (req, res) => {
  // check the session, and if it exists, create a comment
  if (req.session) {
    Comment.create({
      comment_text: req.body.comment_text,
      post_id: req.body.post_id,
      // use the user id from the session
      user_id: req.session.user_id
    })
      .then(dbCommentData => res.json(dbCommentData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// Delete comment
router.delete('/:id', withAuth, (req, res) => {
    Comment.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbCommentData => {
          if (!dbCommentData) {
            res.status(404).json({ message: 'It looks like there are no comments matching your query.' });
            return;
          }
          res.json(dbCommentData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    });

module.exports = router;