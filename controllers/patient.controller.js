const db = require("../models/index");

//register new patient
const register = async (req, res) => {
  patient = req.body;
  await db.Patients.create(patient)
    .then((patient) => {
      console.log("Patient created");
      res
        .status(201)
        .json({ message: "Patient created successfully", patient });
    })
    .catch((error) =>
      res.status(400).json({
        message: "Patient not successfully created",
        error: error.message,
      })
    );
};

module.exports = {
  register,
};
