//-----MODULE INITIATION-----//
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

//-----MODULE SETUP-----//
const app = express();
dotenv.config();
// Allows API usage
app.use(cors());
// Allows sending data in json format
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//-----MYSQL ROUTES-----//
// CREATE route
app.post('/insert', (request, response) => {

});

// READ route
app.get('/getAll', (request, response) => {
    // Send a success response
    response.json({
        success: true
    });
});

// UPDATE route

// DELETE route

//-----SERVER STARTUP-----//
app.listen(process.env.PORT, () => {
    console.log("The app is online.");
});