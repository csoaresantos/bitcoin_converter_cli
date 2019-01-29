const chalk = require('chalk');
const request = require('request');
const ora = require('ora');

const spinner = ora({
    text: 'Rretrieving data...',
    color: 'yellow'
});

function convertBTC(currency = 'USD', amount = '1') {
    const url = `https://apiv2.bitcoinaverage.com/convert/global?from=BTC&to=${currency}&amount=${amount}`;
    
    spinner.start();

    request(url, (error, response, body) => {
        let apiResp;

        try {
            apiResp = JSON.parse(body);
            spinner.stop();
            
        } catch (error) {
            console.log(chalk.red('Somethig went wrong in the API. Try in a few minutes.'));
            return error;
        }
        console.log(`${chalk.red(amount)} BTC to ${chalk.cyan(currency)} = ${chalk.yellow(apiResp.price)}`);
    });
}

module.exports = convertBTC;