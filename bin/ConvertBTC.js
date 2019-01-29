'use strict';

var chalk = require('chalk');
var request = require('request');
var ora = require('ora');

var spinner = ora({
    text: 'Rretrieving data...',
    color: 'yellow'
});

function convertBTC() {
    var currency = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'USD';
    var amount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '1';

    var url = 'https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=' + currency + '&amount=' + amount;

    spinner.start();

    request(url, function (error, response, body) {
        var apiResp = void 0;

        try {
            apiResp = JSON.parse(body);
            spinner.stop();
        } catch (error) {
            console.log(chalk.red('Somethig went wrong in the API. Try in a few minutes.'));
            return error;
        }
        console.log(chalk.red(amount) + ' BTC to ' + chalk.cyan(currency) + ' = ' + chalk.yellow(apiResp.price));
    });
}

module.exports = convertBTC;