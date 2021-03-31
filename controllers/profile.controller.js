const userCtrl = {};

const pool = require('../database');

userCtrl.renderUserProfile = (req, res,next) => {
  res.render('profile/profile');
}

userCtrl.deleteUserProfile = async (req, res, next) => {
  const id = req.user.id;
  req.logOut();

  await pool.query('DELETE FROM user WHERE id = ?', [id]);
  req.flash('success', 'User Removed Successfully');
  res.redirect('/');
}

userCtrl.editAccount = async (req, res,next) => {
  const {username} = req.body;

  await pool.query('UPDATE user set username = ? WHERE id = ?', [username, req.user.id]);
  req.flash('success', 'Your name has been succesfully changed');
  res.redirect('/profile');
}

module.exports = userCtrl;