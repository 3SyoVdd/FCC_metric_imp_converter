const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  test('whole number input', function() {
    console.log ("ich bin der unit Test");
    assert.equal(convertHandler.getNum("1"), 1);
    assert.equal(convertHandler.getNum(10), 10);
  });
  test('decimal number input', function() {
    assert.equal(convertHandler.getNum(1.5), 1.5);
    assert.equal(convertHandler.getNum(12.34), 12.34);
  });
  test('fractional input', function() {
    assert.equal(convertHandler.getNum(1/2), 0.5);
    assert.equal(convertHandler.getNum(4/2), 2);
  });
  test('fractional input with a decimal', function() {
    assert.equal(convertHandler.getNum(6.8/2), 3.4);
    assert.equal(convertHandler.getNum(10/2.5), 4);
  });
  test('double-fraction', function() {
    assert.equal(convertHandler.getNum('1/2/3'), 'invalid number');
    assert.equal(convertHandler.getNum('1.2/3.4/5.6'), 'invalid number');
  });
  test('default numerical input 1', function() {
    assert.equal(convertHandler.getNum('km'), 1);
    assert.equal(convertHandler.getNum('l'), 1);
    assert.equal(convertHandler.getNum('kg'), 1);
    assert.equal(convertHandler.getNum('gal'), 1);
    assert.equal(convertHandler.getNum('mi'), 1);
    assert.equal(convertHandler.getNum('lbs'), 1);
    assert.equal(convertHandler.getNum('L'), 1);
    
  });
  test('read each valid input unit', function() {

    assert.equal(convertHandler.getUnit('l'), 'L');
    assert.equal(convertHandler.getUnit('L'), 'L');
    assert.equal(convertHandler.getUnit('kg'), 'kg');
    assert.equal(convertHandler.getUnit('km'), 'km');
    assert.equal(convertHandler.getUnit('mi'), 'mi');
    assert.equal(convertHandler.getUnit('lbs'), 'lbs');
    assert.equal(convertHandler.getUnit('gal'), 'gal');
    
  });
  test('invalid input unit', function() {
    assert.equal(convertHandler.getUnit('abc'), 'invalid unit');
    assert.equal(convertHandler.getUnit('def'), 'invalid unit');
  });
  test('return unit for each valid input unit', function() {
    assert.equal(convertHandler.getReturnUnit('gal'), 'L');
    assert.equal(convertHandler.getReturnUnit('L'), 'gal');
    assert.equal(convertHandler.getReturnUnit('mi'), 'km');
    assert.equal(convertHandler.getReturnUnit('km'), 'mi');
    assert.equal(convertHandler.getReturnUnit('lbs'), 'kg');
    assert.equal(convertHandler.getReturnUnit('kg'), 'lbs');
  });
  test('spelled-out string unit', function() {
    assert.equal(convertHandler.spellOutUnit('lbs'), 'pounds');
    assert.equal(convertHandler.spellOutUnit('km'), 'kilometers');
    assert.equal(convertHandler.spellOutUnit('mi'), 'miles');
    assert.equal(convertHandler.spellOutUnit('kg'), 'kilograms');
    assert.equal(convertHandler.spellOutUnit('gal'), 'gallons');
    assert.equal(convertHandler.spellOutUnit('L'), 'liters');
  });
  test('Convert gal to L', function() {
    assert.equal(convertHandler.convert(15, 'gal'), 56.78115);
    assert.equal(convertHandler.convert(2, 'gal'), 7.57082);
  
  });
  test('Convert L to gal', function() {
    assert.equal(convertHandler.convert(5/7, 'l'), 0.18869);
    assert.equal(convertHandler.convert(30, 'l'),  7.92517);
  
  });
  test('Convert mi to km', function() {
    assert.equal(convertHandler.convert(20, 'mi'), 32.1868);
    assert.equal(convertHandler.convert(12.3, 'mi'), 19.79488);
  
  });
  test('Convert km to mi', function() {
    assert.equal(convertHandler.convert(12.3, 'km'), 7.64288);
    assert.equal(convertHandler.convert(8, 'km'), 4.97098);
  
  });
  test('Convert lbs to kg', function() {
    assert.equal(convertHandler.convert(2, 'lbs'), 0.90718);
    assert.equal(convertHandler.convert(171/2, 'lbs'), 38.78212);
  
  });
  test('Convert kg to lbs', function() {
    assert.equal(convertHandler.convert(100, 'kg'), 220.46244);
    assert.equal(convertHandler.convert(101.01, 'kg'),  222.68911);
  
  });
});
/*
after(function() {
  chai.request(server)
    .get('/')
});*/