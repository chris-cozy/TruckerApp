const connection = require("../config/database");

/*
    @desc: Grabs all driver accounts
    @params: sponsor_id (optional)
    @return: list of all drivers
*/
async function getAllDrivers(req, res) {
  try {
    const drivers = await new Promise((resolve, reject) => {
      if (req.params) {
        const paramquery = "SELECT * FROM Drivers WHERE sponsor_id = ?";

        connection.query(
          paramquery,
          [req.params.sponsor_id],
          (err, results) => {
            if (err) reject(new Error(err.message));
            resolve(results);
          }
        );
      } else {
        const query = "SELECT * FROM Driver_Account;";

        connection.query(query, (err, results) => {
          if (err) reject(new Error(err.message));
          resolve(results);
        });
      }
    });

    if (drivers.length > 0) {
      res.status(200).json(drivers);
    } else {
      res.status(404).json({
        message: "Driver(s) not found.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/*
    @desc: Inserts new driver into database
    @params: driver information
    @return: confirmation
*/
async function createDriver(req, res) {
  try {
    const response = await new Promise((resolve, reject) => {
      const query =
        "INSERT INTO Drivers (id, biography, first_name, last_name, email, phone_number, street, city, state, zipcode, date_of_birth, drivers_license_number, cdl_class, years_of_experience, accident_count, violation_count, suspended_license_incident) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

      connection.query(
        query,
        [
          req.body.id,
          req.body.biography,
          req.body.firstName,
          req.body.lastName,
          req.body.email,
          req.body.phoneNumber,
          req.body.address.shippingStreet,
          req.body.address.shippingCity,
          req.body.address.shippingState,
          req.body.address.shippingZip,
          req.body.dateOfBirth,
          req.body.driversLicenseNumber,
          req.body.cdlClass,
          req.body.yearsOfExperience,
          req.body.accidentCount,
          req.body.violationCount,
          req.body.suspendedLicenseIncident,
        ],
        (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        }
      );
    });

    if (response == 1) {
      res.status(201).json({ message: "Driver created successfully." });
    } else {
      res.status(400).json({
        message: "Invalid request.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

/*
    @desc: Deletes all driver accounts
    @params: None
    @return: confirmation
*/
async function deleteAllDrivers(req, res) {
  try {
    const response = await new Promise((resolve, reject) => {
      const query = "DELETE * FROM Drivers";

      connection.query(query, (err, result) => {
        if (err) reject(new Error(err.message));
        resolve(result.affectedRows);
      });
    });

    if (response) {
      res.status(200).json({ message: "Drivers deleted successfully." });
    } else {
      res.status(400).json({ message: "Invalid request." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getDriverById(req, res) {
  try {
    const driver_id = req.params.driver_id;
    const driver = await new Promise((resolve, reject) => {
      const query = "SELECT * FROM Drivers WHERE driver_id = ?";

      connection.query(query, [driver_id], (err, result) => {
        if (err) reject(new Error(err.message));
        resolve(result);
      });
    });

    if (!driver) {
      return res.status(404).json({ message: "Driver not found" });
    }
    res.status(200).json(driver);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function updateDriver(req, res) {
  try {
    const driver_id = req.params.driver_id;
    const response = await new Promise((resolve, reject) => {
      const query =
        "UPDATE Drivers SET id = ?, biography = ?, first_name = ?, last_name = ?, email = ?, phone_number = ?, street = ?, city = ?, state = ?, zipcode = ?, date_of_birth = ?, drivers_license_number = ?, cdl_class = ?, years_of_experience = ?, accident_count = ?, violation_count = ?, suspended_license_incident = ? WHERE driver_id = ?;";

      connection.query(
        query,
        [
          req.body.id,
          req.body.biography,
          req.body.firstName,
          req.body.lastName,
          req.body.email,
          req.body.phoneNumber,
          req.body.address.shippingStreet,
          req.body.address.shippingCity,
          req.body.address.shippingState,
          req.body.address.shippingZip,
          req.body.dateOfBirth,
          req.body.driversLicenseNumber,
          req.body.cdlClass,
          req.body.yearsOfExperience,
          req.body.accidentCount,
          req.body.violationCount,
          req.body.suspendedLicenseIncident,
          driver_id,
        ],
        (err, result) => {
          if (err) reject(new Error(err.message));
          resolve(result.affectedRows);
        }
      );
    });

    if (response == 1) {
      res
        .status(200)
        .json({ message: "Successfully updated driver information." });
    } else {
      res.status(404).json({
        message: "Driver not found.",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function deleteDriverById(req, res) {
  try {
    const driver_id = req.params.driver_id;
    const response = await new Promise((resolve, reject) => {
      const query = "DELETE FROM Drivers WHERE driver_id = ?";

      connection.query(query, [driver_id], (err, result) => {
        if (err) reject(new Error(err.message));
        resolve(result.affectedRows);
      });
    });

    if (response) {
      res.status(200).json({ message: "Driver deleted successfully." });
    } else {
      res.status(400).json({ message: "Invalid request." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getAllDrivers,
  createDriver,
  deleteAllDrivers,
  getDriverById,
  updateDriver,
  deleteDriverById,
};
