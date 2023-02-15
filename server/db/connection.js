const mongoose = require('mongoose');

const connection = mongoose.connect(process.env.ATLAS_URL)
    .then(db => { // success
        console.log("Database Connected");
        return db;
    })
    .catch(err => {  // fail
        console.log("Connection Failed");
    })

module.exports = connection;    