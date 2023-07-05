let User = require('../models/user');
let passport = require('passport');
let jwt = require('jsonwebtoken');

let config = require('../config/config');

function getErrorMessage(err) {
    console.log("===> Erro: " + err);
    let message = '';
  
    if (err.code) {
      switch (err.code) {
        case 11000:
        case 11001:
          message = 'Username already exists';
          break;
        default:
          message = 'Something went wrong';
      }
    } else {
      for (var errName in err.errors) {
        if (err.errors[errName].message) message = err.errors[errName].message;
      }
    }
  
    return message;
  };

// module.exports.renderSignin = function (req, res, next) {
//     if (!req.user) {
//         res.render('auth/signin', {
//             title: 'Sign-in Form',
//             messages: req.flash('error') || req.flash('info')
//         });
//     } else {
//         console.log(req.user);
//         return res.redirect('/');
//     }
// };


module.exports.signin = function (req, res, next) {
    passport.authenticate(
      'local', 
      // {
      // successRedirect: req.session.url || '/',
      // failureRedirect: '/users/signin',
      // failureFlash: true
      // }
      (err, user, info) => {
        try {
          if (err || !user) {
            return res.status(400).json(
              {
                success: false,
                message: err || info.message
              }
            );
          }

          req.login(user, {session: false}, (error)=>{
            // In case of a error is thrown
            if (error) {
              return next(error);
            }

            // Issue the token
            const payload = { id: user._id, username: user.username };
            const token = jwt.sign(
              payload, 
              config.SECRETKEY, 
              {
                algorithm: 'HS512',
                expiresIn: "20min"
              }
            );

            // Send the token to the client
            return res.json(
              {
                success: true,
                token: token
              }
            );
          });
        } catch (error) {
          console.log(error);
          return next(error);
        }
      }
    )(req, res, next);

    // delete req.session.url;
  }

// module.exports.renderSignup = function (req, res, next) {
//     if (!req.user) {

//         // creates a empty new user object.
//         let newUser = User();

//         res.render('auth/signup', {
//             title: 'Sign-up Form',
//             messages: req.flash('error'),
//             user: newUser
//         });

//     } else {
//         return res.redirect('/');
//     }
// };


module.exports.signup = async (req, res, next) => {
    console.log(req.body);
    // if (!req.user && req.body.password === req.body.password_confirm) {
  
      let user = new User(req.body);
  
      try {
        let result = await user.save();
        console.log(result);
        // req.login(user, (err) => {
        //   if (err) return next(err);
          
        //   return res.redirect('/');
        // });
        return res.json(
          {
            success: true,
            message: 'User created successfully!'
          }
        );
      } catch (error) {
        let message = getErrorMessage(error);
  
        // req.flash('error', message);
        // // return res.redirect('/users/signup');
        // return res.render('auth/signup', {
        //   title: 'Sign-up Form',
        //   messages: req.flash('error'),
        //   user: user
        // });
        return res.status(400).json(
          {
            success: false,
            message: message
          }
        );
  
      }
  
    // } else {
    //   return res.redirect('/');
    // }
  };

  // module.exports.signout = function (req, res, next) {
    
  //   // Version 0.6.0
  //   req.logout(function (err) {
  //     if (err) {
  //       return next(err);
  //     }
  //     res.redirect('/');
  //   });
  // };