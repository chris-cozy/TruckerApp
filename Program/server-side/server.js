//-----MODULE INITIATION & SETUP-----//
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbService = require('./dbService');

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


//-----CREATE ROUTES-----//
app.post('/addUser', (request, response) => {

});

//-----GET ROUTES-----//
app.get('/getAllDrivers', (request, response) => {

});

app.get('/getAllSponsors', (request, response) => {

});

app.get('/getDrivers/:sponsorId', (request, response) => {

});

app.get('/search/:name', (request, response) => {

});

// UPDATE
app.patch('/updateName', (request, response) => {


});

app.patch('/updatePass', (request, response) => {


});

// DELETE
app.delete('/delete/:driverId', (request, response) => {

});

app.delete('/delete/:sponsorId', (request, response) => {

});

//-----SERVER STARTUP-----//
app.listen(process.env.PORT, () => {
    console.log("The app is online.");
});