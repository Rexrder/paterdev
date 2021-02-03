const userCtrl = {};

userCtrl.renderUserProfile = (req, res,next) => {
  res.render('profile/profile');
}

module.exports = userCtrl;