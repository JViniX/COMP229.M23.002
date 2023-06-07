// Do not expose your credentials in your code.
let atlasDB = "mongodb+srv://dbadmin:CURP3HVIc22vm9bu@clustercomp229.0pybih5.mongodb.net/products";

// Database setup
const { default : mongoose } = require('mongoose');

module.exports = function(){

    mongoose.connect(atlasDB);

    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error: '));
    mongodb.once('open', ()=>{
        console.log("====> Connected to MongoDB.");
    })

    return mongodb;

}