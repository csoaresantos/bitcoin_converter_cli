#!/usr//bin/env node

const program = require('commander');
const pkg = require('../package.json');
const convertBTC = require('./ConvertBTC');

program
    .version(pkg.version)
    .description('Convert Bitcoint to any corrency defined')
    .option('-C, currency <currency>', 'Currency to be converted. (Default USD)')
    .option('-A, amount <amout>', 'Value in Bitcoin to be converted. (Default 1)')
    .parse(process.argv);

console.log(convertBTC(program.currency, program.amount));