const express = require("express");
const router = express.Router();
const driverController = require("../controllers/driverController");
const { ensureAuthenticated, checkRole } = require("../middleware/auth");

// GET /v1/drivers
router.get(
  "/",
  ensureAuthenticated,
  checkRole(["sponsor", "developer", "admin"]),
  driverController.getAllDrivers
);

// POST /v1/driver (Create a new driver)
router.post(
  "/",
  ensureAuthenticated,
  checkRole(["driver", "developer", "admin"]),
  driverController.createDriver
);

// DELETE /v1/driver (Delete all drivers)
router.delete(
  "/",
  ensureAuthenticated,
  checkRole(["developer", "admin"]),
  driverController.deleteAllDrivers
);

// GET /v1/driver/:driver_id
router.get(
  "/:driver_id",
  ensureAuthenticated,
  checkRole(["driver", "sponsor", "developer", "admin"]),
  driverController.getDriverById
);

// PUT /v1/driver/:driver_id (Update a single driver's information by id)
router.put(
  "/:driver_id",
  ensureAuthenticated,
  checkRole(["driver", "developer", "admin"]),
  driverController.updateDriverById
);

// DELETE /v1/driver/:driver_id (Delete a single driver by id)
router.delete(
  "/:driver_id",
  ensureAuthenticated,
  checkRole(["driver", "developer", "admin"]),
  driverController.deleteDriverById
);

module.exports = router;
