let InventoryModel = require('../models/inventory');

module.exports.invetoryList = async function (req, res, next) {

    try {
        let list = await InventoryModel.find({});
        // console.log(list);
        // res.send(list);
        // res.render('inventory/list',
        //     {
        //         title: 'Inventory List',
        //         InventoryList: list,
        //         userName: req.user ? req.user.username : ''
        //     });
        res.json(list);
    } catch (error) {
        console.log(error);
        next(error);
    }

}

// Render the Add page using add_edit template
// module.exports.displayAddPage = async function (req, res, next) {
//     let blankProduct = InventoryModel();

//     res.render('inventory/add_edit',
//         {
//             title: 'Add a new Item',
//             product: blankProduct,
//             userName: req.user ? req.user.username : ''
//         });

// }

module.exports.processAddPage = async (req, res, next) => {
    try {

        let newProduct = InventoryModel({
            _id: req.body.id,
            item: req.body.item,
            qty: req.body.qty,
            status: req.body.status,
            size: {
                h: req.body.size.h,
                w: req.body.size.w,
                uom: req.body.size.uom
            },
            tags: req.body.tags.split(",").map(word => word.trim())
        });

        let result = await InventoryModel.create(newProduct)

        // refresh the book list
        console.log(result);
        // res.redirect('/inventory/list');
        res.json(result);

    } catch (error) {
        console.log(error);
        next(error);
    }
}

// Render the Edit page using add_edit template
// module.exports.displayEditPage = async (req, res, next) => {

//     try {
//         let id = req.params.id;

//         let productToEdit = await InventoryModel.findById(id);

//         res.render('inventory/add_edit',
//             {
//                 title: 'Edit a new Item',
//                 product: productToEdit,
//                 userName: req.user ? req.user.username : ''
//             });
//     } catch (error) {
//         console.log(error);
//         next(error);
//     }
// }


module.exports.processEditPage = async (req, res, next) => {
    try {

        let id = req.params.id;

        // Builds updatedProduct from the values of the body of the request.
        let updatedProduct = InventoryModel({
            _id: req.params.id,
            item: req.body.item,
            qty: req.body.qty,
            status: req.body.status,
            size: {
                h: req.body.size.h,
                w: req.body.size.w,
                uom: req.body.size.uom
            },
            tags: req.body.tags.split(",").map(word => word.trim())
        });

        // Submits updatedProduct to the DB and waits for a result.
        let result = await InventoryModel.updateOne({ _id: id }, updatedProduct);
        console.log(result);

        // If the product is updated redirects to the list
        if (result.modifiedCount > 0) {
            // res.redirect('/inventory/list');
            res.json(
                {
                    success: true,
                    message: "Item updated sucessfully."
                }
            );
        }
        else {
            // Express will catch this on its own.
            throw new Error('Item not udated. Are you sure it exists?')
        }

    } catch (error) {
        next(error)
    }
}


module.exports.performDelete = async (req, res, next) => {

    try {

        let id = req.params.id;

        let result = await InventoryModel.deleteOne({ _id: id });

        console.log("====> Result: ", result);
        if (result.deletedCount > 0) {
            // refresh the book list
            // res.redirect('/inventory/list');
            res.json(
                {
                    success: true,
                    message: "Item deleted sucessfully."
                }
            )
        }
        else {
            // Express will catch this on its own.
            throw new Error('Item not deleted. Are you sure it exists?')
        }

    } catch (error) {
        console.log(error);
        next(error);
    }
}
