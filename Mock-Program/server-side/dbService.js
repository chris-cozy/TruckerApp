//-----MODULE INITIATION-----//
const mysql = require('mysql');
const dotenv = require('dotenv');

dotenv.config();

//-----GLOBALS-----//
let instance = null;


// Create a connection
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

//-----CLASSES-----//
// This class will be used to hold the functions for manipulating the data
class dbService {
    /*
        Grabs the instance of the class. Without it, multiple instances would be made.
        The return statment checks if instance is not null. If it is, creates a new instance.
    */
    static getInstance() {
        return instance ? instance : new dbService();
    }

    /*
        Grabs all of the data from the database table
        If there is an error, logs it to the console, otherwise returns the result.
    */
    async getAllData() {
        try {
            // Create a promise to handle the query. Using a resolve, reject. if query successful, it will resolve. If not, it will reject and transfer to the catch.
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM mock_table;";
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
        This function sends a query to enter new name into the database table
    */
    async insertNewName(name) {
        try {
            const dateAdded = new Date();
            const insertID = await new Promise((resolve, reject) => {
                // Parameterized the values to protect against SQL injection
                const query = "INSERT INTO mock_table (name, date_added) VALUES (?, ?);";

                connection.query(query, [name, dateAdded], (err, result) => {
                    if (err) reject(new Error(err.message));
                    resolve(result.insertID);
                });
            });
            // Return the ID, name, and date_added to the front-end
            return {
                id: insertID,
                name: name,
                dateAdded: dateAdded
            };

        } catch (error) {
            console.log(error);
        }
    }

    async deleteRowById(id) {
        id = parseInt(id, 10);
        try {
            const response = await new Promise((resolve, reject) => {

                // Parameterized the values to protect against SQL injection
                const query = "DELETE FROM mock_table WHERE id = ?;";

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
