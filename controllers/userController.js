const User = require('../models/user');
const passport = require('passport');

exports.getLogin = (req, res) => {
  res.render('login', { title: 'Login', user: req.user || null });
};

exports.getRegister = (req, res) => {
  res.render('register', { title: 'Register', user: req.user || null });
};


exports.postRegister = (req, res) => {
  const { email, password } = req.body;

  User.register(new User({ email }), password, (err, user) => {
    if (err) {
      console.log('Error registering user:', err);
      return res.render('register', { errorMessage: 'Registration failed' });
    }

    passport.authenticate('local')(req, res, () => {
      res.redirect('/');
    });
  });
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect('/login');
};
