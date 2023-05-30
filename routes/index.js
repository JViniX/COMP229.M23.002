var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
      { 
      title: 'Home',
      userName: 'Joanna'
    });
});


/* GET home page. */
router.get('/about', function(req, res, next) {
  res.render('index', 
    { 
      title: 'About',
      userName: 'John'
    });
});

module.exports = router;
