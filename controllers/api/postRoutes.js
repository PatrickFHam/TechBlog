const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      posted_by_user_id: req.session.user_id,
    });

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/all', async (req, res) => {
  try {
    const allPosts = await Post.findAll();

    if (!allPosts) {
      res.status(404).json({ message: 'No posts found!' });
      return;
    }

    res.status(200).json(allPosts);
  } catch (err) {
    res.status(500).json(err);
  }
})

router.get('/:id', async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', withAuth, async (req, res) => {
  
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        posted_by_user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
