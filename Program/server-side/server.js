//-----MODULE INITIATION & SETUP-----//
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbService = require('./dbService');
const ebayService = require('./ebayService');
const userService = require('./userService');
const fetch = require('node-fetch');

let user = null;
let sponsorUser = null;

const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//-----TEST ROUTE-----//
app.get('/getAllAccounts', (request, response) => {
    console.log('ALL ACCOUNTS');
});

//-----CREATE ROUTES-----//
app.post('/getTest', (request, response) => {

});

app.post('/sendApp', (request, response) => {
    const applicationInfo = request.body;
    const db = dbService.get_instance();

    const result = db.send_application(applicationInfo);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

app.post('/setCurrentUser', (request, response) => {
    const currentUserInfo = request.body;
    //console.log(currentUserInfo);
    user = userService.get_instance(currentUserInfo);
    //console.log(user);
})

//-----GET ROUTES-----//
app.get('/getDriverUserInfo/:token', (request, response) => {
    const { token } = request.params;

    /*
    fetch('https://team21-good-driver-program.auth.us-east-1.amazoncognito.com/oauth2/userInfo', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(res => console.log(res))
        
        .then(json => {
            console.log(json);
            const result = json;

            result
                .then(data => response.json({ data: data }))
                .catch(err => console.log(err));
        })
        
        .catch(error => console.log(error));
    */

    const result = Promise.resolve({
        sub: "687fee21-09e3-4aeb-a5c5-dd2e003f04ac",
        email_verified: "true",
        email: "csande9@clemson.edu",
        username: "test_driver"
    });

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));

});

app.get('/getSponsorUserInfo/:token', (request, response) => {
    const { token } = request.params;

    /*
    fetch('https://team21-good-driver-program.auth.us-east-1.amazoncognito.com/oauth2/userInfo', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' + token
        }
    })
        .then(res => console.log(res))
        
        .then(json => {
            console.log(json);
            const result = json;

            result
                .then(data => response.json({ data: data }))
                .catch(err => console.log(err));
        })
        
        .catch(error => console.log(error));
    */

    const result = Promise.resolve({
        sub: "e2c9d4fd-84aa-425d-99a9-8afdc15c36d5",
        email_verified: "true",
        email: "csande9@clemson.edu",
        username: "test_sponsor"
    });

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));

});

app.get('/getCurrentDriverUser', (request, response) => {
    const db = dbService.get_instance();

    const result = db.get_driver(user.sub);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));

});

app.get('/getCurrentSponsorUser', (request, response) => {
    const db = dbService.get_instance();

    const result = db.get_sponsor(user.sub);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));

});

app.get('/ebaySearch/:keyword', (request, response) => {
    const { keyword } = request.params;
    const ebay = ebayService.get_instance();

    const result = ebay.search(keyword);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

app.get('/getAppsByDriver/:driverID', (request, response) => {
    const { driverID } = request.params;
    const db = dbService.get_instance();

    const result = db.get_driver_apps(driverID);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));

});

app.get('/getAppsBySponsor/:sponsorID', (request, response) => {
    const { sponsorID } = request.params;
    const db = dbService.get_instance();

    const result = db.get_sponsor_apps(sponsorID);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));

});

app.get('/getDriver/:username', (request, response) => {
    const { username } = request.params;
    const db = dbService.get_instance();

    const result = db.searchDriverByUsername(username);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
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

// UPDATE
app.patch('/updateDriverInfo', (request, response) => {
    const driverID = request.body.id;
    const profileInfo = request.body.body;
    const db = dbService.get_instance();

    const result = db.update_driver_info(driverID, profileInfo);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));

});

app.patch('/updateSponsorInfo', (request, response) => {
    const sponsorID = request.body.id;
    const profileInfo = request.body.body;
    const db = dbService.get_instance();

    const result = db.update_sponsor_info(sponsorID, profileInfo);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));

});

app.patch('/appDecision', (request, response) => {
    const { key, value } = request.body;

    const db = dbService.getInstance();

    const result = db.update_application(key, value);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));

});

app.patch('/updatePass', (request, response) => {


});

// DELETE
app.delete('/deleteApplication/:key', (request, response) => {
    const { key } = request.params;

    const db = dbService.get_instance();

    const result = db.delete_app_by_key(key);

    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));

});

app.delete('/delete/:driverId', (request, response) => {

});

app.delete('/delete/:sponsorId', (request, response) => {

});

//-----SERVER STARTUP-----//
app.listen(process.env.PORT, () => {
    console.log("The app is online on Port #: " + process.env.PORT);
});