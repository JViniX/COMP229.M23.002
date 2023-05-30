var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('responds from root of the Users router');
});

router.get('/signin', function(req, res, next) {
  res.send('responds from signin of the Users router');
});

router.get('/signup', function(req, res, next) {
  res.send('responds from signup of the Users router');
});

router.get('/signout', function(req, res, next) {
  res.send('responds from signout of the Users router');
});

router.get('/errormessage', function(req, res, next) {
  res.render('error', 
    { 
      message: 'Pay attention',
      error: {
        status: '503',
        stack: 'lots of error messages'
      }
    });
});

module.exports = router;
