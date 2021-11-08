//define helper middleware to redirect users to authorization page
const withAuth = (req, res, next) => {
    //if no current session, redirect to login
    if (!req.session.user_id) {
      res.redirect('/login');
    } else {
        //if current session, call next() function
      next();
    }
  };
  //export module
  module.exports = withAuth;