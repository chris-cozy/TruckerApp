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
    static get_instance() {
        return instance ? instance : new dbService();
    }

    //-----GET QUERIES-----//

    async getAllDrivers() {
        try {
            // Create a promise to handle the query. Using a resolve, reject. if query successful, it will resolve. If not, it will reject and transfer to the catch.
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
        Grabs all of the sponsors from the database table
        If there is an error, logs it to the console, otherwise returns the result.
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

    async getAllMyDrivers(sponsorID) {
        try {
            // Grabs information on drivers for a specific sponsor
            const response = await new Promise((resolve, reject) => {
                if (sponsorID == NULL) {
                    alert("Invalid Sponsor.");
                }
                const query = "SELECT Driver_Username FROM Points_Management Where sponsorID = ?;";
                connection.query(query, [sponsorID], (err, results) => {
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

    // Finds the driver with the given username and displays their information
    async searchDriverByUsername(username) {
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

    // Finds a driver with the exact ID, in order to link to their account in the database
    async search_by_id(driverID) {
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

            //console.log(response);
            return response;

        } catch (error) {
            console.log(error);
        }
    }

    // Finds a driver with the exact ID, in order to link to their account in the database
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

            //console.log(response);
            return response;

        } catch (error) {
            console.log(error);
        }
    }

    // Display all info related to point changes, for use in reporting
    async pointChangeReport(driverID) {
        if (driverID == NULL) {
            alert("Invalid Driver.");
        }
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * From Points_Management Where driverID = ?";
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

    // Shows all point management actions by a given sponsor, for drivers to view their points history
    async displayPointDistribution(sponsorID) {
        if (sponsorID == NULL) {
            alert("Invalid Sponsor.");
        }
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * From Points_Management Where sponsorID = ?";
                /*
                 May need to only display the driver being managed and the point distribution to that driver:
                    const query1 = "SELECT Driver_Username From Points_Management Where sponsorID = ?"; 
                    const query2 = "SELECT points From Points_Management Where sponsorID = ?";

                    connection.query(query1, [sponsorID], (err, result) =>{...});
                    connection.query(query2, [sponsorID], (err, result) =>{...});
                */
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
    @desc: Send query to create a new application
    @params: driverID, object containing application information
    @return: an int denoting success(1) or failure(0)
    */
    async send_application(applicationInfo) {
        try {
            console.log(applicationInfo);
            const dateAdded = new Date();
            const response = await new Promise((resolve, reject) => {

                const query = "INSERT INTO Applications (driverID, sponsorID, reason, status, dateCreated) VALUES (?, ?, ?, ?, ?);";

                connection.query(query, [applicationInfo.driverID, applicationInfo.sponsorID, applicationInfo.reason, applicationInfo.initialStatus, dateAdded], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                });
            });

            // Return the ID, name, and date_added to the front-end
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
        This function sends a query to enter new user into the database table
        --                       Still in progress                         --
    
    async insertNewUser(username) {
        try {
            const dateAdded = new Date();
            const insertId = await new Promise((resolve, reject) => {
                // Parameterized the values to protect against SQL injection
                const query = "INSERT INTO mock_table (username, date_added) VALUES (?, ?);";

                connection.query(query, [username, dateAdded], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertId);
                });
            });
            // Return the ID, name, and date_added to the front-end
            return {
                id: insertId,
                name: username,
                dateAdded: dateAdded
            };

        } catch (error) {
            console.log(error);
        }
    }
    */


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

    // Saves the values of the driver's current points and the alloted point change amount to update the driver's points
    async updatePoints(driverID) {
        if (driverID == NULL) {
            alert("Invalid Driver.");
        }
        // May need to use searchByID here to specify the driverID or add a query to get the ID, not sure
        const pointChangeAmount = "SELECT Change_Amount FROM Points_Management WHERE driverID = ?";
        const currentPoints = "SELECT points FROM Driver_Account WHERE driverID = ?";


        try {
            const response = await new Promise((resolve, reject) => {
                const query = "UPDATE Driver_Account SET points = ? WHERE driverID = ?";
                connection.query(query, [(currentPoints + pointChangeAmount), driverID], (err, result) => {
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
        This method sends the update query for a driver to update their username
    */
    async updateUsernameById(id, username) {
        id = parseInt(id, 10);
        try {
            const response = await new Promise((resolve, reject) => {

                // Parameterized the values to protect against SQL injection
                const query = "UPDATE Driver_Account SET username = ? WHERE id = ?;";

                connection.query(query, [username, id], (err, result) => {
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


    // Possible point refresh method. Need a designated button to call this
    async pointRefresh(driverID) {
        if (driverID == NULL) {
            alert("Invalid Driver.");
        }
        try {
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT points From Driver_Account Where driverID = ?";
                connection.query(query, [driverID], (err, result) => {
                    if (err) reject(new Error(err.message));
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
        This method sends the delete query
    */
    async deleteDriverById(id) {
        id = parseInt(id, 10);
        try {
            const response = await new Promise((resolve, reject) => {

                // Parameterized the values to protect against SQL injection
                const query = "DELETE FROM Driver_Account WHERE id = ?;";

                connection.query(query, [id], (err, result) => {
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