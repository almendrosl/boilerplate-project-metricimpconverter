/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

var chai = require('chai');
var assert = chai.assert;
var ConvertHandler = require('../controllers/convertHandler.js');

var convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      var input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      const input = '34.66km'
      assert.equal(convertHandler.getNum(input), 34.66);
      done();
    });
    
    test('Fractional Input', function(done) {
      const input = '66/32km'
      assert.approximately(convertHandler.getNum(input), 2, 0.1);
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      const input = '66.56/32km'
      assert.approximately(convertHandler.getNum(input), 2, 0.1);
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      const input = '66.56//32km'
      assert.equal(convertHandler.getNum(input), "invalid number");
      done();
    });
    
    test('No Numerical Input', function(done) {
      const input = '-56km'
      assert.equal(convertHandler.getNum(input), "invalid number");
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(ele) {
        assert.notEqual(convertHandler.getUnit(ele), "invalid unit");
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
      const input = "bla"
      assert.equal(convertHandler.getUnit(input), "invalid unit");
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      var input = ['gal','l','mi','km','lbs','kg'];
      var expect = ['gallons','liters','miles','kilometers','pounds','kilograms'];
      input.forEach(function(ele, i) {
        assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
      });
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      var input = [5, 'gal'];
      var expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('L to Gal', function(done) {
      var input = [123, 'l'];
      var expected = 32.493;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Mi to Km', function(done) {
      var input = [123, 'mi'];
      var expected = 197.949;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Km to Mi', function(done) {
      var input = [123, 'km'];
      var expected = 76.4287;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Lbs to Kg', function(done) {
      var input = [123, 'lbs'];
      var expected = 55.7919;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
    test('Kg to Lbs', function(done) {
      var input = [123, 'kg'];
      var expected = 271.169;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); //0.1 tolerance
      done();
    });
    
  });

});