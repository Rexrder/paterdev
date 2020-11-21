const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const pool = require("../database");
const helpers = require("./helpers");

passport.use(
  "local.signin",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const rows = await pool.query("SELECT * FROM user WHERE username = ?", [
        username
      ]);
      if (rows.length > 0) {
        const user = rows[0];
        const validPassword = await helpers.matchPassword(
          password,
          user.password
        );
        user.admin = (user.admin == 1) ? true:false;

        if (validPassword) {
          done(null, user, req.flash("success", "Welcome " + user.username));
        } else {
          done(null, false, req.flash("message", "Incorrect Password"), console.log("Incorrect Password"));          
        }
      } else {
        return done(
          null,
          false,
          req.flash("message", "The Username does not exists")
        );
      }
    }
  )
);

passport.use(
  "local.signup",
  new LocalStrategy(
    {
      usernameField: "username",
      passwordField: "password",
      passReqToCallback: true
    },
    async (req, username, password, done) => {
      const logcodes = {teacher: 8943532, student: 7459725};

      const { usercode, confirmpassword } = req.body;

      if (confirmpassword != password) {
        return done(
          null,
          false,
          req.flash("message", "Password doesn't match"),
          req.toastr.error("Password doesn't match")
        );
      }

      if (usercode != logcodes.teacher && usercode != logcodes.student) {
        return done(
          null,
          false,
          req.flash("message", "Invalid Usercode")
        );
      }

      const admin = (usercode == logcodes.teacher) ? true:false;

        let newUser = {
        username,
        password,
        admin
      };

      newUser.password = await helpers.encryptPassword(password);
      // Saving in the Database
      const result = await pool.query("INSERT INTO user SET ? ", newUser);
      newUser.id = result.insertId;
      return done(null, newUser);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  const rows = await pool.query("SELECT * FROM user WHERE id = ?", [id]);
  rows[0].admin = (rows[0].admin == 1) ? true:false;
  done(null, rows[0]);
});
