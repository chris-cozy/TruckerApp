//-----MODULE INITIATION AND SETUP-----//
const mysql = require('mysql');
const dotenv = require('dotenv');
const { application } = require('express');
dotenv.config();


//-----CONNECTION SETUP-----//
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

//-----GLOBALS-----//
let instance = null;

//-----DATABASE CLASS-----//
class dbService {

    /*
        @desc: Grabs instance of class. Keeps multiple instances from being made. The return statment checks if instance is not null. If it is, creates new instance.
        @params: None
        @return: Database class instance
    */
    static get_instance() {
        return instance ? instance : new dbService();
    }

    //-----GET QUERIES-----//

    /*
        @desc: Grabs all driver accounts
        @params: None
        @return: object with all driver account information
    */
    async get_all_drivers() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Driver_Account;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    /*
        @desc: Grabs all sponsor accounts
        @params: None
        @return: object with all sponsor account information
    */
    async get_all_sponsors() {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Sponsor_Account;";

                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    /*
        @desc: Grabs specific driver information based on username
        @params: desired driver's username
        @return: object with driver account information
    */
    async get_driver_by_username(username) {
        if (username == null) {
            alert("Invalid Driver.");
        }
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Driver_Account WHERE username = ?;";

                connection.query(query, [username], (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    /*
        @desc: Grabs specific driver information based on driverID
        @params: desired driver's driverID
        @return: object with driver account information
    */
    async get_driver(driverID) {
        if (driverID == null) {
            alert("Invalid Driver.");
        }
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * From Driver_Account Where driverID = ?";

                connection.query(query, [driverID], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    /*
        @desc: Grabs specific sponsor information based on sponsorID
        @params: desired sponsor's sponsorID
        @return: object with sponsor account information
    */
    async get_sponsor(sponsorID) {
        if (sponsorID == null) {
            alert("Invalid Driver.");
        }
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * From Sponsor_Account Where sponsorID = ?";

                connection.query(query, [sponsorID], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    /*
        @desc: Grabs all of the specified driver's applications
        @params: desired driver's driverID
        @return: object with application information
    */
    async get_driver_apps(driverID) {
        if (driverID == null) {
            alert("Invalid Driver.");
        }
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * From Applications Where driverID = ?";

                connection.query(query, [driverID], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    /*
        @desc: Grabs all of the specified sponsor's applications
        @params: desired sponsor's sponsorID
        @return: object with application information
    */
    async get_sponsor_apps(sponsorID) {
        if (sponsorID == null) {
            alert("Invalid Sponsor.");
        }
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * From Applications Where sponsorID = ?";

                connection.query(query, [sponsorID], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    /*
        @desc: Grabs all of the sponsor's drivers
        @params: sponsor's sponsorID
        @return: object with driver information
    */
    async get_drivers_by_sponsor(sponsorID) {
        const approved = 1;
        if (sponsorID == null) {
            alert("Invalid Sponsor.");
        }
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM Applications INNER JOIN Driver_Account ON Applications.driverID=Driver_Account.driverID WHERE Applications.sponsorID = ? AND Applications.status = ?;";

                connection.query(query, [sponsorID, approved], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    /*
        @desc: Display all info related to point changes for a driver, for use in reporting
        @params: desired driver's driverID
        @return: object with point log information
    */
    async driver_point_report(driverID) {
        if (driverID == null) {
            alert("Invalid Driver.");
        }
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * From Points_Log Where driverID = ?";

                connection.query(query, [driverID], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            console.log(response);
            return response;
        } catch (error) {
            console.log(error);
        }
    }

    /*
        @desc: Display all info related to point management actions for a sponsor, for use in reporting
        @params: desired driver's sponsorID
        @return: object with point log information
    */
    async sponsor_point_report(sponsorID) {
        if (sponsorID == NULL) {
            alert("Invalid Sponsor.");
        }
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * From Points_Log Where sponsorID = ?";

                connection.query(query, [sponsorID], (err, result) => {
                    if (err) reject(new Error(err.message));
                });
            });
            console.log(response);
            return (response);
        } catch (error) {
            console.log(error);
        }
    }


    //-----CREATE QUERIES-----//
    /*
        @desc: Creates a new application entry
        @params: object containing application information
        @return: object with the application entry information
    */
    async send_application(applicationInfo) {
        try {
            const dateAdded = new Date();
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO Applications (driverID, sponsorID, reason, status, dateCreated) VALUES (?, ?, ?, ?, ?);";

                connection.query(query, [applicationInfo.driverID, applicationInfo.sponsorID, applicationInfo.reason, applicationInfo.initialStatus, dateAdded], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                });
            });
            console.log(response);
            return {
                appId: response,
                driverID: applicationInfo.driverID,
                sponsorID: applicationInfo.sponsorID,
                reason: applicationInfo.reason,
                dateAdded: dateAdded
            };
        } catch (error) {
            console.log(error);
        }
    }

    /*
        @desc: Creates a new point event
        @params: object containing point event information
        @return: object with point log entry information
    */
    async send_points(pointInfo) {
        try {
            const dateChanged = new Date();
            const response = await new Promise((resolve, reject) => {
                const query = "INSERT INTO Points_Log (driverID, sponsorID, pointAmount, reason, dateChanged) VALUES (?, ?, ?, ?, ?);";

                connection.query(query, [pointInfo.driverID, pointInfo.sponsorID, pointInfo.pointAmount, pointInfo.reason, dateChanged], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                });
            });
            console.log(response);
            return {
                changeId: response,
                driverID: pointInfo.driverID,
                sponsorID: pointInfo.sponsorID,
                pointAmount: pointInfo.pointAmount,
                reason: pointInfo.reason,
                dateAdded: dateChanged
            };
        } catch (error) {
            console.log(error);
        }
    }


    //-----EDIT QUERIES-----//
    /*
        @desc: Updates driver account information
        @params: driverID, object containing profile information
        @return: an int denoting success(1) or failure(0)
    */
    async update_driver_info(driverID, profileInfo) {
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

    /*
        @desc: Updates sponsor account information
        @params: sponsorID, object containing profile information
        @return: an int denoting success(1) or failure(0)
    */
    async update_sponsor_info(sponsorID, profileInfo) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE Sponsor_Account SET firstName = ?, lastName = ?, email = ?, phoneNum = ?, bio = ? WHERE sponsorID = ?;";

                connection.query(query, [profileInfo.firstName, profileInfo.lastName, profileInfo.email, profileInfo.phoneNum, profileInfo.bio, sponsorID], (err, result) => {
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

    /*
        @desc: Updates application with new status
        @params: appID, new status value
        @return: an int denoting success(1) or failure(0)
    */
    async update_application(key, value) {
        key = parseInt(key, 10);
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE Applications SET status = ? WHERE appID = ?;";

                connection.query(query, [value, key], (err, result) => {
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

    /*
        @desc: Saves the values of the driver's current points and updates driver's total points after new change
        @params: driver's driverID
        @return: N/A
    */
    async update_points(driverID) {
        if (driverID == null) {
            alert("Invalid Driver.");
        }
        try {
            const pointTotal = await new Promise((resolve, reject) => {
                const pointTotalQuery = "SELECT SUM(pointAmount) FROM Points_Log WHERE driverID = ?;";

                connection.query(pointTotalQuery, [driverID], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            console.log(pointTotal[0]);

            try {
                const response = await new Promise((resolve, reject) => {
                    const query = "UPDATE Driver_Account SET points = ? WHERE driverID = ?";

                    connection.query(query, [pointTotal[0]['SUM(pointAmount'], driverID], (err, result) => {
                        if (err) reject(new Error(err.message));
                        resolve(result.affectedRows);
                    });
                });
                console.log(response);
                return response === 1 ? true : false;
            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }

    }

    /*
        NOTE: Doesn't affect cognito username
        @desc: Updates driver username
        @params: driver's driverID, new username
        @return: an int denoting success(1) or failure(0)
    */
    async update_driver_username(driverID, username) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE Driver_Account SET username = ? WHERE driverID = ?;";

                connection.query(query, [username, driverID], (err, result) => {
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

    /*
        @desc: Grabs driver's point count
        @params: driver's driverID
        @return: object containing point information
    */
    async grab_points(driverID) {
        if (driverID == NULL) {
            alert("Invalid Driver.");
        }
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT points From Driver_Account Where driverID = ?";

                connection.query(query, [driverID], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result);
                });
            });
            console.log(response);
            return (response);
        } catch (error) {
            console.log(error);
        }
    }

    //-----DELETE QUERIES-----//
    /*
        @desc: Deletes an application
        @params: appID
        @return: an int denoting success(1) or failure(0)
    */
    async delete_app_by_key(key) {
        key = parseInt(key, 10);
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM Applications WHERE appID = ?;";

                connection.query(query, [key], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                });
            });
            console.log(response);
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }

    /*
        @desc: Deletes a driver
        @params: driver's driverID
        @return: an int denoting success(1) or failure(0)
    */
    async delete_driver(driverID) {
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "DELETE FROM Driver_Account WHERE driverID = ?;";

                connection.query(query, [driverID], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.affectedRows);
                });
            });
            console.log(response);
            return response === 1 ? true : false;
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

//-----MODULE EXPORT-----//
module.exports = dbService;