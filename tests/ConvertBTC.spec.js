const nock = require('nock');
const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const expect = chai.expect;
const chalk = require('chalk');

chai.use(sinonChai);

const convertBTC = require('../src/ConvertBTC');

const responseMock = {
    "price": 3445.57,
    "time": "2019-01-29 00:55:00",
    "success": true
};

let consoleStub;

describe('ConvertBTC', () => {
    beforeEach(() => {
        consoleStub = sinon.stub(console, 'info');
    });

    afterEach(() => {
        consoleStub.restore();
    });

    it('should use USD as currency default and 1 as amount default', async () => {
        nock('https://apiv2.bitcoinaverage.com')
        .get('/convert/global')
        .query({ from: 'BTC', to: 'USD', amount: '1' })
        .reply(200, responseMock);

        await convertBTC('USD', 1);

        expect(consoleStub).to.have.been.calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(3445.57)}`);
    });

    it('should use USD as currency default and 10 as amount', async () => {
        nock('https://apiv2.bitcoinaverage.com')
        .get('/convert/global')
        .query({ from: 'BTC', to: 'USD', amount: '10' })
        .reply(200, responseMock);

        await convertBTC('USD', 10);

        expect(consoleStub).to.have.been.calledWith(`${chalk.red(10)} BTC to ${chalk.cyan('USD')} = ${chalk.yellow(3445.57)}`);
    });

    it('should use BRL as currency and 1 as amount default', async () => {
        nock('https://apiv2.bitcoinaverage.com')
        .get('/convert/global')
        .query({ from: 'BTC', to: 'BRL', amount: '1' })
        .reply(200, responseMock);

        await convertBTC('BRL', 1);
        expect(consoleStub).to.have.been.calledWith(`${chalk.red(1)} BTC to ${chalk.cyan('BRL')} = ${chalk.yellow(3445.57)}`)
    });

    it('should notice the user when api reply with error', async () => {
        nock('https://apiv2.bitcoinaverage.com')
        .get('/convert/global')
        .query({ from: 'BTC', to: 'BRL', amount: '1' })
        .replyWithError('Error');

        await convertBTC('BRL', 1);

        expect(consoleStub).to.have.been.calledWith(chalk.red('Somethig went wrong in the API. Try in a few minutes.'));
    });
});