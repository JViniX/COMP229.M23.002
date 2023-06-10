var express = require('express');
var router = express.Router();
let indexController = require('../controllers/index');

/* GET home page. */
router.get('/', indexController.home);


/* GET home page. */
router.get('/about', indexController.about );

module.exports = router;
