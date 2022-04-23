const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// Return all posts.
router.get('/', async (req, res) => {
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

// Returns a specific post.
router.get('/:id', async (req, res) => {
  try {
    let postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          
          order: [['date_created', 'DESC']],
          attributes: ['body', 'comment_by_user_id', 'date_created'],
          include: [{
            model: User,
            attributes: ['name', 'email']
          }]
        },
        {
          model: User,
          attributes: ['name', 'email']
        }
      ],
    });

    let post = postData.get({ plain: true });
    console.log(post);

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Adds a new post.
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

// Deletes a specific post.
router.delete('/:id', async (req, res) => {
  
  console.log(req.params.id);
  console.log(req.session.user_id);

  try {
    let postData = await Post.destroy({
      where: {
        id: req.params.id
        // posted_by_user_id: req.session.user_id,
      },
    });

    console.log(postData);

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
