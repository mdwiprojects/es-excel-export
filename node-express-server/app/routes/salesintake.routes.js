module.exports = app => {
  const salesintake = require("../controllers/salesintake.controller.js");

  var router = require("express").Router();

  // Retrieve all salesIntake urls
  // http://localhost/8081/ ==> goes to salesintake.findall command
  router.get("/", salesintake.findAll);

  // http://localhost/8081/excel ==> goes to salesintake.exportSalesIntake command
  router.post("/excel",salesintake.exportSalesIntake);
 
  app.use("/api/salesintake", router);
};
  