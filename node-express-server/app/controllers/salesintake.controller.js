const db = require("../models");

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
exports.exportSalesIntake = (req,res) => {
  const { sanctionloadinkw, age } = req.body;
  //const workbook = new Excel.Workbook();
  res.send({status:"Post Excel Success"});
  // await workbook.xlsx.readFile('../excel-templates/salesTemplate.xlsx');
  // const worksheet = workbook.getWorksheet(1);

  // // Find the row with the matching name to update
  // let targetRow = null;
  // worksheet.eachRow((row, rowNumber) => {
  //   if (row.getCell(1).value === name) { // Assuming 'Name' is in column 1
  //     targetRow = rowNumber;
  //   }
  // });

  // if (targetRow) {
  //   // Update the age in the found row, assuming 'Age' is in column 2
  //   worksheet.getRow(targetRow).getCell(2).value = age;
  //   await workbook.xlsx.writeFile('updatedResult.xlsx');
  //   res.send({ message: 'Updated successfully' });
  // } else {
  //   // Handle case where the name is not found
  //   res.status(404).send({ message: 'Name not found in the spreadsheet' });
  // }
};

