var express = require('express');
var router = express.Router();

let inventoryController = require('../controllers/inventory');

/* GET home page. */
router.get('/list', inventoryController.invetoryList);



module.exports = router;
