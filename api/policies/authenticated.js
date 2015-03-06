/**
 * Created by root on 3/6/15.
 */
module.exports = function(req, res, ok){
  if (req.session.authenticated) {
    return ok();
  }
  else {
    var requireLoginError = [{name: 'requiredLogin', message: 'You must be signed in.'}]
    req.session.flash = {
      err: requireLoginError
    }
    res.redirect('/session/new');
  }
};
