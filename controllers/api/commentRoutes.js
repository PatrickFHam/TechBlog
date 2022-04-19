const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const allCommentsData = await Comment.findAll();

    if (!allCommentsData) {
      res.status(404).json({ message: 'No comments found!' });
      return;
    }

    res.status(200).json(allCommentsData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', withAuth, async (req, res) => {
  try {
    const commentData = await Comment.findByPk(req.params.id);

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

/* router.post('/', withAuth, async (req, res) => {
  try {

    const newComment = await Comment.create({
      body: req.body.commentBody,
      
      posted_by_user_id: req.session.user_id,
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
}); */



router.delete('/:id', withAuth, async (req, res) => {
  console.log("Parameter ID is:");
  console.log(req.params.id);
  
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
