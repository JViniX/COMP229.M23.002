// Do not expose your credentials in your code.
let atlasDB = "mongodb+srv://dbadmin:CURP3HVIc22vm9bu@clustercomp229.0pybih5.mongodb.net/inventory";

// Database setup
const { default : mongoose } = require('mongoose');

module.exports = function(){

    mongoose.connect(atlasDB).then(() => console.log("====> Connected to MongoDB."));;

    let mongodb = mongoose.connection;

    mongodb.on('error', console.error.bind(console, 'Connection Error: '));
    // mongodb.once('open', ()=>{
    //     console.log("====> Connected to MongoDB.");
    // })

    // console.log("====> Connected to MongoDB.");
    // return mongodb;

}