const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');


// Returns All Comments
router.get('/', async (req, res) => {
  try {
    const allCommentsData = await Comment.findAll();

    if (!allCommentsData) {
      res.status(404).json({ message: 'No posts found!' });
      return;
    }

    res.status(200).json(allCommentsData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// Returns a spefific comment.
router.get('/:id', async (req, res) => {
  try {
    const oneCommentData = await Comment.findOne({
      where: {
        id: req.params.id
      }
    });

    if (!oneCommentData) {
      res.status(404).json({ message: 'No comments found!' });
      return;
    }

    res.status(200).json(oneCommentData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// Returns all comments from a specific user.
router.get('/fromuser/:comments_from_user_id', async (req, res) => {
  try {
    const commentsFromOneUserData = await Comment.findAll({
      where: {
        comment_by_user_id: req.params.comments_from_user_id
      }
    });

    if (!commentsFromOneUserData) {
      res.status(404).json({ message: 'No comments found!' });
      return;
    }

    res.status(200).json(commentsFromOneUserData);
  } catch (err) {
    res.status(500).json(err);
  }
})

// Returns all the comments for one post.
router.get('/foronepost/:comments_for_one_post', async (req, res) => {
  try {
    const commentsFromOnePost = await Comment.findAll({
      where: {
        on_post_id: req.params.comments_for_one_post
      },
      order: [['date_created', 'DESC']],
      include: [
        {
          model: Post,
          attributes: ['id', 'headline', 'body', 'posted_by_user_id'],
          include: {
            model: User,
            attributes: ['id', 'name', 'email']
          }
        }]
    });

    if (!commentsFromOnePost) {
      res.status(404).json({ message: 'No comments found!' });
      return;
    }

    res.status(200).json(commentsFromOnePost);
  } catch (err) {
    res.status(500).json(err);
  }
})

// Adds a new comment.
router.post('/', async (req, res) => {
  console.log("logged in user id is:");
  console.log(req.session.user_id);

  console.log(req.body);
  console.log(req.body.body);
  console.log(req.body.on_post_id);
  
  try {
    const newComment = await Comment.create({
      body: req.body.body,
      on_post_id: req.body.on_post_id,
      comment_by_user_id: req.session.user_id
    });

    res.status(200).json(newComment);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Deletes a specific comment.
router.delete('/:id', async (req, res) => {
  
  try {
    const commentData = await Comment.destroy({
      where: {
        id: req.params.id,
        comment_by_user_id: req.session.user_id
      },
    });

    if (!commentData) {
      res.status(404).json({ message: 'No comment found with this id!' });
      return;
    }

    res.status(200).json(commentData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
