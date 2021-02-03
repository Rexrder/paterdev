const authCtrl = {};

const passport = require('passport');

authCtrl.mainp = async (req,res) =>{
    res.render('index');
};

authCtrl.renderSignUp = (req, res) => {
    res.render('auth/signup');
};

authCtrl.signUp = passport.authenticate('local.signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash: true
});

authCtrl.renderSignIn = (req, res, next) => {
    res.render('auth/signin');
};

authCtrl.signIn = passport.authenticate('local.signin', {
    successRedirect: '/',
    failureRedirect: '/signin',
    failureFlash: true
});

authCtrl.logout = (req, res, next) => {
    req.logOut();
    res.redirect('/');
    res.redirect('/');
};

module.exports = authCtrl;