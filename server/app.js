const express = require("express");
const session = require("express-session");
const uniqueIdentifier = require("./services/uniqueIdentifier");
const passport = require("passport");
const app = express();
app.use(express.json());

require("dotenv").config();

// Initialize Passport.js and session middleware
app.use(
  session({
    secret: uniqueIdentifier.generateSecretKey(32),
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Include the Passport local configuration
// require("./middleware/passport-local");

// Import route files
//const applicationRoutes = require("./routes/application");
//const authRoutes = require("./routes/auth");
// const driverRoutes = require("./routes/driver");
//const ebayRoutes = require("./routes/ebay");
//const pointRoutes = require("./routes/point");
//const productRoutes = require("./routes/product");
//const sponsorRoutes = require("./routes/sponsor");

// Mount routers onto specific paths
//app.use("/v1/applications", applicationRoutes);
//app.use("/v1/auth", authRoutes);
// app.use("/v1/drivers", driverRoutes);
//app.use("/v1/ebay", ebayRoutes);
//app.use("/v1/points", pointRoutes);
//app.use("/v1/products", productRoutes);
//app.use("/v1/sponsors", sponsorRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
const HOST = process.env.HOST;
app.listen(PORT, HOST, () => {
  console.log(`Server is running on port ${PORT}`);
});
