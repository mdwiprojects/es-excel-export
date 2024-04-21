module.exports = app => {
  const salesintake = require("../controllers/salesintake.controller.js");
  const Excel = require('exceljs');
  var router = require("express").Router();

  // Retrieve all Tutorials
  router.get("/", salesintake.findAll);

  router.post("/excel",salesintake.exportSalesIntake);
 
  app.use("/api/salesintake", router);
};
  