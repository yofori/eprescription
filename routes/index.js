const express = require("express");
const router = express.Router();
const patient = require("./patient.route");
const prescription = require("./prescription.route");
const user = require("./user.route");
const drug = require("./drug.route");
router.use("/patient", patient);
router.use("/prescription", prescription);
router.use("/user", user);
router.use("/drug", drug);
module.exports = router;
