'use strict';

var chalk = require('chalk');
var request = require('request-promise-native');
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

    return request(url).then(function (body) {
        spinner.stop();
        return body;
    }).then(function (body) {
        var apiResp = JSON.parse(body);
        console.info(chalk.red(amount) + ' BTC to ' + chalk.cyan(currency) + ' = ' + chalk.yellow(apiResp.price));
    }).catch(function (err) {
        spinner.stop();
        console.info(chalk.red('Somethig went wrong in the API. Try in a few minutes.'));
        return err;
    });
}

module.exports = convertBTC;