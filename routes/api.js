/*
 *
 *
 *       Complete the API routing below
 *
 *
 */

"use strict";

var expect = require("chai").expect;
var ConvertHandler = require("../controllers/convertHandler.js");

module.exports = function(app) {
  var convertHandler = new ConvertHandler();

  app.route("/api/convert").get(function(req, res) {
    try {
      var input = req.query.input;
      var initNum = convertHandler.getNum(input);
      var initUnit = convertHandler.getUnit(input);
      checkUnitorNumberInvalid(initNum, initUnit);
      var returnNum = convertHandler.convert(initNum, initUnit);
      var returnUnit = convertHandler.getReturnUnit(initUnit);
      var toString = convertHandler.getString(
        initNum,
        initUnit,
        returnNum,
        returnUnit
      );

      res.json(toString);
    } catch (err) {
      res.status(400).send(err.message);
    }
  });
};

function checkUnitorNumberInvalid(initNum, initUnit) {
  if (initNum === "invalid number" && initUnit === "invalid unit")
    throw new Error("invalid number and unit");
  if (initNum === "invalid number") throw new Error("invalid number");
  if (initUnit === "invalid unit") throw new Error("invalid unit");
}
