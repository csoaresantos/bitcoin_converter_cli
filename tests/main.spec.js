const expect = require('chai').expect;
const btcConverter = './src/main.js';
const exec = require('child_process').exec;
const pkg = require('../package.json');


describe('Main CLI', () => {
    it('should return version', (done) => {
        exec(`${btcConverter} --version`, (err, stdout, stderr) =>{
            if(err) throw err;
            expect(stdout.replace('\n', '')).to.be.equal(pkg.version);
            done();
        });
    });

    it('should return the description when btc-converter --help', (done) => {
        exec(`${btcConverter} --help`, (err, stdout, stderr) =>{
            if(err) throw err;
            expect(stdout.includes('Convert Bitcoint to any corrency defined')).to.be.true;
            done();
        });
    });

    it('should return the currency when btc-converter --currency', (done) => {
        exec(`${btcConverter} --help`, (err, stdout, stderr) =>{
            if(err) throw err;
            expect(stdout.includes('currency')).to.be.true;
            done();
        });
    });

    it('should return the amout when btc-converter --currency', (done) => {
        exec(`${btcConverter} --help`, (err, stdout, stderr) =>{
            if(err) throw err;
            expect(stdout.includes('amount')).to.be.true;
            done();
        });
    });
});