#!/usr/bin/env node

const chalk = require('chalk');
const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'excuses.json');
const data = fs.readFileSync(file, 'utf-8');
const excuses = JSON.parse(data);

const random = Math.floor(Math.random() * excuses.length);
const excuse = excuses[random];

console.log('\n' + chalk.yellow('🎭 Your Excuse:'));
console.log(chalk.white(`   "${excuse}"\n`));
