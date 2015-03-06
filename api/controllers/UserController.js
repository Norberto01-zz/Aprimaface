/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  'new': function(req, res){
    res.locals.flash = _.clone(req.session.flash);
    res.view();
    req.session.flash = {};
  },

  create: function(req, res, next){
    User.create(req.params.all(), function userCreated(err, user){
      if (err){
        console.log(err);
        req.session.flash = {
          err: err
        };
        //req.render('new', {err: err});
        return res.redirect('/user/new');
      }
      //res.json(user);
      return res.redirect('/user/show/'+user.id);
    });
  },

  show: function(req, res, next){
    User.findOne(req.param('id'), function foundUser(err, user){
      if(err){
        console.log(err);
        return next(err);
      }
      if(!user) return next();
      res.view({
        user: user
      });
    });
  },

  index: function(req, res, next){
    console.log(new Date());
    console.log(req.session.authenticated);
    User.find(function foundUser(err, users){
      if (err) return next(err);
      res.view({
        users: users
      });
    });
  },

  edit: function(req, res, next){
    User.findOne(req.param('id'), function foundUser(err, user){
      if (err) return next(err);
      if (!user) return next(err);
      res.view({
        user: user
      });
    });
  },

  update: function(req, res, next){
    User.update(req.param('id'), req.params.all(), function userUpdate(err){
      if(err){
        return res.redirect('/user/edit/'+req.param('id'));
      }
      return res.redirect('/user/show/'+req.param('id'));
    });
  },

  destroy: function(req, res, next){
    User.findOne(req.param('id'), function foundUser(err, user){
      if (err) return next(err);
      if (!user) return next('User doesn\'t exist.');
      User.destroy(req.param('id'), function userDestroy(err){
        if (err) return next(err);
      });
      return res.redirect('/user');
    });
  }

};

