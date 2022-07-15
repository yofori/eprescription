const db = require("../models/index");

//get all the drugs
const getall = async (req, res) => {
  await db.Drugs.find().then((drugs) => {
    if (drugs.length === 0) {
      res.status(400).json({ message: "drug list is empty" });
    } else {
      res.status(200).json({ message: "Success", Drugs: drugs });
    }
  });
};

module.exports = {
  getall,
};
