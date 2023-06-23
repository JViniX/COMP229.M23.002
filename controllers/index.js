module.exports.home = function (req, res, next) {
    // console.log('====> From indexController home');
    // res.render('index',
    //     {
    //         title: 'Home',
    //         userName: req.user ? req.user.username : ''
    //     });
    res.redirect('/inventory/list');
};

// module.exports.about = function (req, res, next) {
//     res.render('index',
//         {
//             title: 'About',
//             userName: req.user ? req.user.username : ''
//         });
// };