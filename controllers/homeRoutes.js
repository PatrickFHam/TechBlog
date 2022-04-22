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
    const PostData = await Post.findAll({
      order: [['date_created', 'DESC']],
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

    const posts = PostData.map((posts) => posts.get({ plain: true }));

    res.render('theblog', {
      posts,
      logged_in: req.session.logged_in,
      logged_in_user_id: req.session.user_id
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/blogpost/:id', async (req, res) => {
  try {
    let postData = await Post.findByPk(req.params.id, {
      include: [
        {
          model: Comment,
          attributes: ['id', 'body', 'comment_by_user_id', 'date_created'],
          order: [['date_created', 'DESC']],
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

    res.render('post', { 
      post,
      logged_in_user_id: req.session.user_id,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
  
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

router.get('/about', async (req, res) => {
  try {
    
    res.render('about', {
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;
