module.exports.home = function (req, res, next) {
    console.log('====> From indexController home');
    res.render('index',
        {
            title: 'Home',
            userName: 'Joanna'
        });
};

module.exports.about = function (req, res, next) {
    res.render('index',
        {
            title: 'About',
            userName: 'John'
        });
};