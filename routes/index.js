const express = require("express");
const router = express.Router();
const patient = require("./patient.route");
const prescription = require("./prescription.route");
const user = require("./user.route");
router.use("/patient", patient);
router.use("/prescription", prescription);
router.use("/user", user);
module.exports = router;
