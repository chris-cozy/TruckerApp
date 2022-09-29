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
        return instance ? instance : new deService();
    }

    /*
        Grabs all of the data
        If there is an error, logs it to the console
    */
    async getAllData() {
        try {
            // Create a promise to handle the query. Using a resolve, reject. if query successful, it will resolve. If not, it will reject and transfer to the catch.
            const response = await new Promise((resolve, reject) => {
                const query = "SELECT * FROM mock_table";
                connection.query(query, (err, results) => {
                    if (err) reject(new Error(err.message));
                    resolve(results);
                });
            });

            console.log(response);

        } catch (error) {
            console.log(error);
        }

    }
}

//-----MODULE EXPORT-----//
module.exports = dbService;
