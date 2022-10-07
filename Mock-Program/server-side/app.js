//-----MODULE INITIATION-----//
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
// Database service
const dbService = require('./dbService');


//-----MODULE SETUP-----//
const app = express();
dotenv.config();
// Allows API connection between front and back end
app.use(cors());
// Allows sending data in json format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//-----MYSQL ROUTES-----//
// CREATE
app.post('/insert', (request, response) => {
    // Object destructuring
    const { name } = request.body;

    const db = dbService.getInstance();

    const result = db.insertNewName(name);
    result
        .then(data => response.json({ success: true }))
        .catch(err => console.log(err));

});

// READ
app.get('/getAll', (request, response) => {
    // Grab instance of db
    const db = dbService.getInstance();

    const result = db.getAllData();

    console.log(result);
    // Return the promise to the fetch in a json for the api
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

// UPDATE

// DELETE


//-----SERVER STARTUP-----//
app.listen(process.env.PORT, () => {
    console.log("The app is online.");
});