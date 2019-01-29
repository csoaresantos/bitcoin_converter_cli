const chalk = require('chalk');
const request = require('request-promise-native');
const ora = require('ora');

const spinner = ora({
    text: 'Rretrieving data...',
    color: 'yellow'
});

function convertBTC(currency = 'USD', amount = '1') {
    const url = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;
    
    spinner.start();

    return request(url)
        .then((body) => {
            spinner.stop();
            return body;
        })
        .then((body) => {
            const apiResp = JSON.parse(body);
            console.info(`${chalk.red(amount)} BTC to ${chalk.cyan(currency)} = ${chalk.yellow(apiResp.price)}`);
        })
        .catch((err) => {
            spinner.stop();
            console.info(chalk.red('Somethig went wrong in the API. Try in a few minutes.'));
            return err;
        });
}

module.exports = convertBTC;