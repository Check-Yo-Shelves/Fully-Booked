const router = require('express').Router();
const { User, Post } = require(`../models`);
const withAuth = require(`../utils/auth`);


router.get('/', async (req, res) => {
    // Grab all posts to render through handlebars
    try {
        const postData = await Post.findAll();
        const posts = postData.map((post => post.get({ plain: true })));

        res.render('home', { posts })
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async (req, res) => {
    // Grab all posts belonging to user stored in cookie to render through handlebars. If not logged in, redirect to login page
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }

    res.render('login');
});

module.exports = router;