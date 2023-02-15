const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config({path: "./config.env"})

const port = process.env.PORT || 5000;


// Use middleware
app.use(cors());
app.use(express.json());

// Use routes
app.use(require('./routes/route'));

// mongodb connection
const connection = require('./db/connection.js');

connection.then(db => {
    if(!db) return process.exit(1);

    //listen to the http server
    app.listen(port, ()=> {
        console.log(`Server is running on port: http://localhost:${port}`);
    });

    app.on('error', err => console.log(`Failed to connect with HTTP Server: ${err}`));
    // error in mongodb connection
})
.catch(error =>{
    console.log(`Connection Failed: ${error}`);
})

