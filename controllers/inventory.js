let Inventory = require('../models/inventory');

module.exports.invetoryList = async function(req, res, next){

    try {
        let list = await Inventory.find({});
        console.log(list);
        // res.send(list);
        res.render('inventory/list',
        {
            title: 'Inventory List',
            InventoryList: list
        });
    } catch (error) {
        console.log(error);           
    }
    
}