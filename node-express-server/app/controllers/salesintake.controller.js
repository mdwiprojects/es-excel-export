const db = require("../models");
const Excel = require('exceljs');
const fs = require('fs');

const SalesIntake = db.salesintake;
console.log("salesintake model",SalesIntake);
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
  const {sanctionloadinkw,phaseatpremesis} = req.body;
  var condition = {
    sanctionloadinkw :"0",
    phaseatpremesis :"single"
  }
  SalesIntake.find(condition)
    .then(data => {
      res.send({status:"FindAll Success"});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};
exports.exportSalesIntake = async (req,res) => {
  const { sanctionloadinkw, phaseatpremesis } = req.body;
  console.log('data: ',sanctionloadinkw,phaseatpremesis);

  const workbook = new Excel.Workbook();
  //res.send({status:"Post Excel Success"});
  const fullpath = fs.realpathSync("salesTemplate.xlsx");
  await workbook.xlsx.readFile(fullpath);

  const worksheet = workbook.getWorksheet(1);
  console.log("1. after getting worksheet");
  // Find the row with the matching name to update
  let targetRow = true;

  worksheet.eachRow({ includeEmpty: false }, function(row, rowNumber) {
        console.log('Row ' + rowNumber + ' = ' + JSON.stringify(row.values));
  });
  console.log("after looking at the contents of the worksheet");
  if (1) {
    // Update the age in the found row, assuming 'Age' is in column 2
    // worksheet.getRow(targetRow).getCell(2).value = age;
    // workbook.xlsx.writeFile('updatedResult.xlsx');
    res.send({ message: 'Updated successfully' });
  } else {
    // Handle case where the name is not found
    res.status(404).send({ message: 'Name not found in the spreadsheet' });
  }
};

