//-----MODULE INITIATION-----//
const mysql = require('mysql');
const dotenv = require('dotenv');

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
    static get_instance() {
        return instance ? instance : new dbService();
    }

    //-----GET QUERIES-----//


    //-----CREATE QUERIES-----//


    //-----EDIT QUERIES-----//
    /*
    @desc: Send query to update driver account information
    @params: driverID, object containing profile information
    @return: an int denoting success(1) or failure(0)
    */
    async update_profile_info(driverID, profileInfo) {
        try {
            const response = await new Promise((resolve, reject) => {

                const query = "UPDATE Driver_Account SET firstName = ?, lastName = ?, email = ?, phoneNum = ?, shippingStreet = ?, shippingCity = ?, shippingState = ?, shippingZip = ? WHERE driverID = ?;";

                connection.query(query, [profileInfo.firstName, profileInfo.lastName, profileInfo.email, profileInfo.phoneNum, profileInfo.shippingAddress.shippingStreet, profileInfo.shippingAddress.shippingCity, profileInfo.shippingAddress.shippingState, profileInfo.shippingAddress.shippingZip, driverID], (err, result) => {
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

    //-----DELETE QUERIES-----//


}

//-----MODULE EXPORT-----//
module.exports = dbService;