const router = require('express').Router();
const { User } = require('../../models');

// Hitting the route successfully. Console log works well.
router.post('/login', async (req, res) => {
  try {
    console.log('Login route OK')
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.logged_in = true;

      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// This works 100%
router.post(`/signup`, async (req, res) => {
  try {
    console.log('Signup route OK')
    const signupData = await User.create(req.body);

    req.session.save(() => {
      req.session.user_id = signupData.id;
      req.session.logged_in = true;

      res.json({ user: signupData, message: 'You are now logged in!' });
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Hitting the console.log
router.post('/logout', (req, res) => {
  console.log("Logout route OK")
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
