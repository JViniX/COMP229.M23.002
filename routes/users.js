var express = require('express');
var router = express.Router();
let usersController = require('../controllers/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('responds from root of the Users router');
});

router.get('/signin', usersController.renderSignin);
router.post('/signin', usersController.signin);

router.get('/signup', usersController.renderSignup);
router.post('/signup', usersController.signup);

router.get('/signout', usersController.signout);

module.exports = router;
