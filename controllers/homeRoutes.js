const router = require('express').Router();
const { User, Post, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
  try {
    
    res.render('landingpage', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/theblog', async (req, res) => {
  try {
    // Get all movies and JOIN with user data
    const PostData = await Post.findAll({
      include: [
        {
          model: Comment,
          attributes: ['body'],
        },
        {
          model: User,
          attributes: ['name', 'email']
        }
      ],
    });

    // Serialize data so the template can read it
    const posts = PostData.map((posts) => posts.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      posts,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/post/:id', async (req, res) => {
  try {
    // Get all movies and JOIN with user data
    let postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
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

    
    // Serialize data so the template can read it
    // const posts = PostData.map((posts) => posts.get({ plain: true }));
    
    let post = postData.get({ plain: true });
    console.log(post);

    // Pass serialized data and session flag into template
    res.render('post', { 
      post,
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Post }],
    });

    const user = userData.get({ plain: true });

    const posts = await Post.findAll({
      attributes: ['id', 'headline', 'body', 'posted_by_user_id', 'date_created'],
      where: {
        posted_by_user_id: req.session.user_id
      }
    })

    res.render('profile', {
      ...user,
      ...posts,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
