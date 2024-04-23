const db = require("../models");
const XlsxPopulate = require('xlsx-populate');
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

  // Save Salesintake in the database
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

// Retrieve all customer details from the database.
exports.findAll = (req, res) => {
  const {sanctionloadinkw,phaseatpremesis} = req.body;
  var condition = {
    sanctionloadinkw :"0",
    phaseatpremesis :"Single Phase"
  }
  SalesIntake.find(condition)
    .then(data => {
      res.send({status:"FindAll Success"});
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Customer sales details."
      });
    });
};
async function readWorksheetCells(filePath,saleDetails) {
  const destPath = 'EcoSoch_updatedResult_test.xlsx';
  fs.copyFile(filePath,destPath,(err) => {
    if (err) {
      console.log('Error copying xlsx Found:', err);
      
    }
    console.log('Excel File copied successfully');
  });

  // const destPath = './EcoSoch_updatedResult.xlsx';
  // try {
  //   const { sanctionloadinkw, phaseatpremesis } = saleDetails;
  //   console.log('data: ', sanctionloadinkw,phaseatpremesis);
  //   console.log('file path: ', filePath);
  //   const sanctionloadinkwTag = "Sanctioned Load (in kW)";
  //   const phaseatpremesisTag = "Phase at Premises?";
  //   //const workbook = new Excel.Workbook();
  //   const sheetName = "Final Worksheet";
  //   XlsxPopulate.fromFileAsync(filePath).then(workbook => {
  //         // Modify the workbook.
  //       let value = workbook.sheet(sheetName).cell("C9").value();

  //       // Log the value.
  //       console.log(value);
  //       const worksheet = workbook.sheet(sheetName);  // or use workbook.getWorksheet('SheetName');
  //       if (!worksheet) {
  //         console.error('Worksheet not found!');
  //         return;
  //       }
  //       //workbook.sheet(sheetName).definedName("SANC_LOAD",sanctionloadinkw);
  //       //workbook.definedName("SANC_LOAD").value(sanctionloadinkw);
  //       workbook.toFileAsync(destPath);
  //     });
  // } catch(error) {
  //   console.error('Failed to update the excel file',error);
  // }

}

async function origial_readWorksheetCells(filePath,saleDetails) {
  // const destPath = 'EcoSoch_updatedResult_test.xlsx';
  // fs.copyFile(filePath,destPath,(err) => {
  //   if (err) {
  //     console.log('Error copying xlsx Found:', err);
      
  //   }
  //   console.log('Excel File copied successfully');
  // });
  // convert excel sheet 0 to a pdf

  const workbook = new Excel.Workbook();
  try {
    const { sanctionloadinkw, phaseatpremesis } = saleDetails;
    console.log('data: ', sanctionloadinkw,phaseatpremesis);
    console.log('file path: ', filePath);
    const sanctionloadinkwTag = "Sanctioned Load (in kW)";
    const phaseatpremesisTag = "Phase at Premises?";

    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet("Final Worksheet");  // or use workbook.getWorksheet('SheetName');
    //const worksheet = workbook.getWorksheet(1);  // or use workbook.getWorksheet('SheetName');
    if (!worksheet) {
      console.error('Worksheet not found!');
      return;
    }
    let emptyRowHit = false;
    let validRows = 0;
    worksheet.eachRow({ includeEmpty: true }, (row, rowNumber) => {
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        if (cell.value !== null && cell.value !== undefined) {
          validRows++;
        }
      });
    });
    console.log("validROws: ",validRows)
    for(let rowNumber = 1; rowNumber < validRows; rowNumber++) {
      const row = worksheet.getRow(rowNumber);
      row.eachCell({ includeEmpty: true }, (cell, colNumber) => {
        // Getting the cell reference from the cell object
        const cellRef = cell.address;
        const cellValue = cell?.value;
        if (cellValue !== null && cellValue !== undefined) {
            console.log(`Row ${rowNumber} Col ${colNumber} = ${cellValue}`);
            if(cell.value === sanctionloadinkwTag) {
              worksheet.getRow(rowNumber).getCell(colNumber+1).value = sanctionloadinkw;
              console.log(`After Row ${rowNumber} Col ${colNumber+1} = ${worksheet.getRow(rowNumber).getCell(colNumber+1).value}`);
            }
            else if(cell.value === phaseatpremesisTag) {
              worksheet.getRow(rowNumber).getCell(colNumber+1).value = phaseatpremesis;
              console.log(`After Row ${rowNumber} Col ${colNumber+1} = ${worksheet.getRow(rowNumber).getCell(colNumber+1).value}`);
            } 
        } 
      });
    }
    //await workbook.xlsx.writeFile('updatedResult.xlsx');
    const newFile = 'EcoSoch_updatedResult.xlsx';
    let done = false;
    fs.open(newFile,'w',(err,file) => {
      if (err) throw err;
      console.log('File permissions modified to writable.');
      done = true;
    })
    if(done) {
      await workbook.xlsx.writeFile(newFile);
    }

    console.log('completed excel update')
  } catch(error) {
    console.error('Failed to update the excel file',error);
  }
}

//
exports.exportSalesIntake = async (req,res) => {
  const fullpath = fs.realpathSync("EcoSoch_10kWp.xlsx");
  //const fullpath = fs.realpathSync("salesTemplate.xlsx");
  // Replace 'path/to/your/file.xlsx' with the path to the Excel file you want to read
  readWorksheetCells(fullpath,req.body).catch(err => console.error(err));
  
  // Find the row with the matching name to update
  let targetRow = true;
    console.log("after looking at the contents of the worksheet");
  if (1) {
    res.send({ message: 'Updated successfully' });
  } else {
    // Handle case where the name is not found
    res.status(404).send({ message: 'Name not found in the spreadsheet' });
  }
};

