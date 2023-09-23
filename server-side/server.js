//-----MODULE INITIATION & SETUP-----//
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const dbService = require('./dbService');
const ebayService = require('./ebayService');
const userService = require('./userService');
const fetch = require('node-fetch');
const app = express();
dotenv.config();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//-----GLOBALS-----//
let user = null;

//-----GET ROUTES-----//
/*
    UNFINISHED
    @desc: Grabs basic info for the current driver user
    @params: driver user pool access token
    @return: an object containing basic driver user info (sub, email, username)
*/
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

/*
    UNFINISHED
    @desc: Grabs basic info for the current sponsor user
    @params: sponsor user pool access token
    @return: an object containing basic sponsor user info (sub, email, username)
*/
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

/*
    @desc: Grabs all info for the current driver user
    @params: None
    @return: an object containing all driver user info
*/
app.get('/getCurrentDriverUser', (request, response) => {
    const db = dbService.get_instance();
    const result = db.get_driver(user.sub);
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

/*
    @desc: Grabs all info for the current sponsor user
    @params: None
    @return: an object containing all sponsor user info
*/
app.get('/getCurrentSponsorUser', (request, response) => {
    const db = dbService.get_instance();
    const result = db.get_sponsor(user.sub);
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

/*
    @desc: Resets the current user info
    @params: None
    @return: None
*/
app.get('/resetUser', (request, response) => {

    const result = userService.delete_instance();
    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});

/*
    @desc: Grabs product info from ebay API using a keyword search
    @params: Search keyword
    @return: an object containing all product info
*/
app.get('/ebaySearch/:keyword', (request, response) => {
    const { keyword } = request.params;
    const ebay = ebayService.get_instance();
    const result = ebay.search(keyword);
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

/*
    @desc: Grabs all applications for the specified driver
    @params: driverID of the desired driver
    @return: an object containing all related applications
*/
app.get('/getAppsByDriver/:driverID', (request, response) => {
    const { driverID } = request.params;
    const db = dbService.get_instance();
    const result = db.get_driver_apps(driverID);
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

/*
    @desc: Grabs all applications for the specified sponsor
    @params: sponsorID of the desired sponsor
    @return: an object containing all related applications
*/
app.get('/getAppsBySponsor/:sponsorID', (request, response) => {
    const { sponsorID } = request.params;
    const db = dbService.get_instance();
    const result = db.get_sponsor_apps(sponsorID);
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

/*
    OBSOLETE
    @desc: Grabs driver info using their username
    @params: username of the desired driver
    @return: an object containing driver info
*/
app.get('/getDriver/:username', (request, response) => {
    const { username } = request.params;
    const db = dbService.get_instance();
    const result = db.searchDriverByUsername(username);
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

/*
    @desc: Grabs all driver accounts and information
    @params: None
    @return: an object containing all driver account info
*/
app.get('/getAllDrivers', (request, response) => {

});

/*
    @desc: Grabs all sponsor accounts and information
    @params: None
    @return: an object containing all sponsor account info
*/
app.get('/getAllSponsors', (request, response) => {
    const db = dbService.get_instance();
    const result = db.get_all_sponsors();
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

/*
    @desc: Grabs all driver accounts approved by the sponsor
    @params: sponsorID of the desired sponsor
    @return: an object containing all driver account info for the sponsor
*/
app.get('/getDrivers/:sponsorID', (request, response) => {
    const { sponsorID } = request.params;
    const db = dbService.get_instance();
    const result = db.get_drivers_by_sponsor(sponsorID);
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

/*
    @desc: Grabs all sponsor accounts for a driver
    @params: driverID of the desired driver
    @return: an object containing all sponsor account info for the driver
*/
app.get('/getSponsors/:driverID', (request, response) => {
    const { driverID } = request.params;
    const db = dbService.get_instance();
    const result = db.get_sponsors_by_driver(driverID);
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

/*
    @desc: Grabs the point history of the driver
    @params: driver's driverID
    @return: an object containing the point history
*/
app.get('/getDriverPointHistory/:driverID', (request, response) => {
    const { driverID } = request.params;
    const db = dbService.get_instance();
    const result = db.driver_point_report(driverID);
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

/*
    @desc: Grabs the point history of the sponsor
    @params: sponsor's sponsorID
    @return: an object containing the point history
*/
app.get('/getSponsorPointHistory/:sponsorID', (request, response) => {
    const { sponsorID } = request.params;
    const db = dbService.get_instance();
    const result = db.sponsor_point_report(sponsorID);
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

/*
    @desc: Grabs the products available to the driver
    @params: driver's driverID
    @return: an object containing the product information
*/
app.get('/getAvailableProducts/:driverID', (request, response) => {
    const { driverID } = request.params;
    const db = dbService.get_instance();
    const result = db.get_available_products(driverID);
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

/*
    @desc: Grabs the products in sponsor's catalog
    @params: sponsor's sponsorID
    @return: an object containing the product information
*/
app.get('/getSponsorProducts/:sponsorID', (request, response) => {
    const { sponsorID } = request.params;
    const db = dbService.get_instance();
    const result = db.get_sponsor_products(sponsorID);
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});


//-----CREATE ROUTES-----//
/*
    @desc: Creates a new application
    @params: object containing application information
    @return: an object with application entry information
*/
app.post('/sendApp', (request, response) => {
    const applicationInfo = request.body;
    const db = dbService.get_instance();
    const result = db.send_application(applicationInfo);
    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

/*
    @desc: Creates a new points log entry
    @params: object containing point log information
    @return: an object with point log entry information
*/
app.post('/sendPoints', (request, response) => {
    const pointInfo = request.body;
    const db = dbService.get_instance();
    const result = db.send_points(pointInfo);
    db.update_points(pointInfo.driverID);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

/*
    @desc: Adds an item to a sponsor's catalog
    @params: object containing item information
    @return: an object with point log entry information
*/
app.post('/addToCatalog', (request, response) => {
    const itemInfo = request.body;
    const db = dbService.get_instance();
    const result = db.add_to_catalog(itemInfo);

    result
        .then(data => response.json({ data: data }))
        .catch(err => console.log(err));
});

/*
    @desc: Sets information for the current user
    @params: object containing basic user information (email, sub, username)
    @return: None
*/
app.post('/setCurrentUser', (request, response) => {
    const currentUserInfo = request.body;
    user = userService.get_instance(currentUserInfo);
});

//-----UPDATE ROUTES-----//
/*
    @desc: Updates specified driver account information
    @params: Object containing the driverID and a subobject with the updated information
    @return: an int denoting success or failure
*/
app.patch('/updateDriverInfo', (request, response) => {
    const driverID = request.body.id;
    const profileInfo = request.body.body;
    const db = dbService.get_instance();
    const result = db.update_driver_info(driverID, profileInfo);
    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});

/*
    @desc: Updates specified sponsor account information
    @params: Object containing the sponsorID and a subobject with the updated information
    @return: an int denoting success or failure
*/
app.patch('/updateSponsorInfo', (request, response) => {
    const sponsorID = request.body.id;
    const profileInfo = request.body.body;
    const db = dbService.get_instance();
    const result = db.update_sponsor_info(sponsorID, profileInfo);
    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});

/*
    @desc: Updates application with accept or reject status
    @params: Object containing the appID and new status
    @return: an int denoting success or failure
*/
app.patch('/appDecision', (request, response) => {
    const { key, value } = request.body;
    const db = dbService.get_instance();
    const result = db.update_application(key, value);
    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});

/*
    UNFINISHED
    @desc: Updates specified password
    @params: N/A
    @return: N/A
*/
app.patch('/updatePass', (request, response) => {


});

//-----DELETE ROUTES-----//
/*
    @desc: Deletes the specified application, effectively removing the sponsor
    @params: Key which is the appID
    @return: an int denoting success or failure
*/
app.delete('/deleteApplication/:key', (request, response) => {
    const { key } = request.params;
    const db = dbService.get_instance();
    const result = db.delete_app_by_key(key);
    result
        .then(data => response.json({ success: data }))
        .catch(err => console.log(err));
});

/*
    UNFINISHED
    @desc: Deletes the specified driver account
    @params: N/A
    @return: N/A
*/
app.delete('/delete/:driverId', (request, response) => {

});

/*
    UNFINISHED
    @desc: Deletes the specified sponsor account
    @params: N/A
    @return: N/A
*/
app.delete('/delete/:sponsorId', (request, response) => {

});

//-----SERVER STARTUP-----//
app.listen(process.env.PORT, () => {
    console.log("The app is online on Port #: " + process.env.PORT);
});