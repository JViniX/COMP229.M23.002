let InventoryModel = require('../models/inventory');

module.exports.invetoryList = async function (req, res, next) {

    try {
        let list = await InventoryModel.find({});
        // console.log(list);
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

// Render the Add page using add_edit template
module.exports.displayAddPage = async function (req, res, next) {
    let newProduct = InventoryModel();

    res.render('inventory/add_edit',
        {
            title: 'Add a new Item',
            product: newProduct
        });

}

// Render the Edit page using add_edit template
module.exports.displayEditPage = async function (req, res, next) {

    try {
        let id = req.params.id;

        let productToEdit = await InventoryModel.findById(id).exec();
        
        res.render('inventory/add_edit',
            {
                title: 'Edit a new Item',
                product: productToEdit
            });
    } catch (error) {
        console.log(error);
    }
}

module.exports.processEditPage = async function(req, res, next){
    try {
        
        console.log( req.body);
        let updatedProduct = InventoryModel({
            _id: req.body.id,
            item: req.body.item,
            qty: req.body.qty,
            status: req.body.status,
            size : {
                h: req.body.size_h,
                w: req.body.size_w,
                uom: req.body.size_uom,
            },
            tags: req.body.tags.split(",").map(word => word.trim())
        });

        InventoryModel.updateOne({_id: req.params.id}, updatedProduct, (err) => {
            if(err)
            {
                console.log(err);
                res.end(err);
            }
            else
            {
                // console.log(req.body);
                // refresh the book list
                res.redirect('/inventory/list');
            }
        });

        // res.redirect('/inventory/list');

    } catch (error) {
        console.log(error);
    }
}