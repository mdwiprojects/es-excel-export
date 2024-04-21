const db = require("../models");
const SalesIntake = db.salesintake;

// Create and Save a new salesintake
exports.create = (req, res) => {
  // Validate request
  if (!req.body.sanctionloadinkw || !req.body.phaseatpremesis) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  // Create a sales
  const salesintake = new SalesIntake({
    sanctionloadinkw: req.body.sanctionloadinkw,
    phaseatpremesis: req.body.phaseatpremesis
  });

  // Save Tutorial in the database
  salesintake
    .save(salesintake)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Sales Intake."
      });
    });
};

// Retrieve all Tutorials from the database.
exports.findAll = (req, res) => {
  const sanctionloadinkw = req.query.sanctionloadinkw;
  var condition = {}
  salesintake.find(condition)
    .then(data => {
      res.send({});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};

