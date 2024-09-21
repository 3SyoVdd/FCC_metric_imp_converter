const chaiHttp = require('chai-http');
const chai = require('chai');
let assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', function() {

  this.timeout(5000);

  test('convert a valid input', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=10gal')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text,
                    '{"initNum":10,"initUnit":"gal","returnNum":37.8541,"returnUnit":"L","string":"10 gallons converts to 37.8541 liters"}');
        done();
      });
  });

  test('convert invalid input unit', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=16kilotons')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, '"invalid unit"');
        done();
      });
  });

  test('convert invalid input number', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=15.2/7/8lbs')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, '"invalid number"');
        done();
      });
  });

  test('convert invalid number and unit', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=17/2.2/9kilometerliter')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, '"invalid number and unit"');
        done();
      });
  });

  test('convert with no number', function(done) {
    chai
      .request(server)
      .keepOpen()
      .get('/api/convert?input=lbs')
      .end(function(err, res) {
        assert.equal(res.status, 200);
        assert.equal(res.text, '{"initNum":1,"initUnit":"lbs","returnNum":0.45359,"returnUnit":"kg","string":"1 pounds converts to 0.45359 kilograms"}');
        done();
      });
  });
});
