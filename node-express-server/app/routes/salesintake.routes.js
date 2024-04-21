module.exports = app => {
    const salesintake = require("../controllers/salesintake.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve all Tutorials
    router.get("/", salesintake.findAll);
  
  
    app.use("/api/salesintake", router);
  };
  