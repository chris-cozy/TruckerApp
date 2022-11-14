//-----MODULE INITIATION-----//
const mysql = require('mysql');
const dotenv = require('dotenv');
const { application } = require('express');

dotenv.config();

//-----GLOBALS-----//
let instance = null;


//-----CONNECTION-----//
const connection = mysql.createConnection({
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
});

connection.connect((err) => {
    if (err) {
        console.log(err.message);
    }
    console.log('db ' + connection.state);
});

//-----CLASS-----//
// This class will be used to hold the functions for manipulating the data
class dbService {
    /*
        Grabs the instance of the class. Without it, multiple instances would be made.
        The return statment checks if instance is not null. If it is, creates a new instance.
    */
    static getInstance() {
        return instance ? instance : new dbService();
    }

    //-----GET QUERIES-----//


    //-----CREATE QUERIES-----//
    /*
    @desc: Send query to create a new application
    @params: driverID, object containing application information
    @return: an int denoting success(1) or failure(0)
    */
    async send_application(driverID, applicationInfo) {
        try {
            const dateAdded = new Date();
            const response = await new Promise((resolve, reject) => {

                const query = "INSERT INTO Applications (driverID, sponsorID, reason, status, dateCreated) VALUES (?, ?, ?, ?, ?);";

                connection.query(query, [driverID, applicationInfo.sponsorID, applicationInfo.reason, applicationInfo.initialStatus, dateAdded], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                });
            });
            return response === 1 ? true : false;

        } catch (error) {
            console.log(error);
            return false;
        }
    }

    //-----EDIT QUERIES-----//


    //-----DELETE QUERIES-----//


}

//-----MODULE EXPORT-----//
module.exports = dbService;