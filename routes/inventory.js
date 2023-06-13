var express = require('express');
var router = express.Router();

let inventoryController = require('../controllers/inventory');

/* GET home page. */
router.get('/list', inventoryController.invetoryList);

router.get('/add', inventoryController.displayAddPage);

router.get('/edit/:id', inventoryController.displayEditPage);
router.post('/edit/:id', inventoryController.processEditPage);



module.exports = router;
