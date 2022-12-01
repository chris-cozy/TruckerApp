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
app.post('/getTest', (request, response) => {

});

app.post('/sendApplication', (request, response) => {
    const driverID = request.body.id;
    const applicationInfo = request.body.body;
    const db = dbService.get_instance();

    const result = db.send_application(driverID, applicationInfo);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});

//-----TEST ROUTE-----//
app.get('/getAllAccounts', (request, response) => {
    console.log('YES');
});

//-----GET ROUTES-----//
app.get('/getAllAccounts', (request, response) => {
    console.log('YES');
});

app.get('/getAllDrivers', (request, response) => {

});

app.get('/getAllSponsors', (request, response) => {
    const db = dbService.get_instance();

    const result = db.get_all_sponsors();

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

app.get('/getDrivers/:sponsorId', (request, response) => {

});

app.get('/search/:name', (request, response) => {

});

// UPDATE
app.patch('/updateProfileInfo', (request, response) => {
    const driverID = request.body.id;
    const profileInfo = request.body.body;
    const db = dbService.get_instance();

    const result = db.update_profile_info(driverID, profileInfo);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));

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