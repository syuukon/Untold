/* eslint-disable no-process-env */
require('dotenv').config();
const UntoldClient = require('./Structures/UntoldClient');
const config = require('../config.json');

const client = new UntoldClient(config);
client.start();
