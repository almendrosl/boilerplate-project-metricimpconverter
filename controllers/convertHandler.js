/*
 *
 *
 *       Complete the handler logic below
 *
 *
 */
const NUM_DECIMALS = 5;
const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;
const REGEX = /[^\d./-]/;
const ValidUnits = {
  l: {
    name: "liters",
    convertUnit: "gal",
    convertComplete: "gallons",
    conversion: initNum => initNum / galToL
  },
  gal: {
    name: "gallons",
    convertUnit: "l",
    convertComplete: "liters",
    conversion: initNum => initNum * galToL
  },
  lbs: {
    name: "pounds",
    convertUnit: "kg",
    convertComplete: "kilograms",
    conversion: initNum => initNum * lbsToKg
  },
  kg: {
    name: "kilograms",
    convertUnit: "lbs",
    convertComplete: "pounds",
    conversion: initNum => initNum / lbsToKg
  },
  mi: {
    name: "miles",
    convertUnit: "km",
    convertComplete: "kilometers",
    conversion: initNum => initNum * miToKm
  },
  km: {
    name: "kilometers",
    convertUnit: "mi",
    convertComplete: "miles",
    conversion: initNum => initNum / miToKm
  }
};
function ConvertHandler() {
  this.getNum = function(input) {
    const numIndex = input.search(REGEX);

    const stringNumber = input.slice(0, numIndex);

    const numArr = stringNumber.split("/");

    let result = 0;

    if ( numArr.length > 1) {
      result = parseFloat(numArr[0], 10) / parseFloat(numArr[1], 10);
    } else {
      result = parseFloat(numArr[0]);
    }

    if (result === "") result = 1;

    if (!result || result <= 0) result = "invalid number";

    return result;
  };

  this.getUnit = function(input) {
    const numIndex = input.search(REGEX);

    var result = input.slice(numIndex).toLowerCase();

    if (!ValidUnits[result]) result = "invalid unit";

    return result;
  };

  this.getReturnUnit = function(initUnit) {
    var result = ValidUnits[initUnit].convertUnit;

    return result;
  };

  this.spellOutUnit = function(unit) {
    var result = ValidUnits[unit].name;

    return result;
  };

  this.convert = function(initNum, initUnit) {
    let result = ValidUnits[initUnit].conversion(initNum);

    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    var result = {
      initNum: initNum,
      initUnit: initUnit,
      returnNum: returnNum,
      returnUnit: returnUnit,
      string: `${initNum} ${this.spellOutUnit(
        initUnit
      )} converts to ${returnNum.toFixed(NUM_DECIMALS)} ${this.spellOutUnit(returnUnit)}`
    };

    return result;
  };
}

module.exports = ConvertHandler;
