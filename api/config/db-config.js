const FileSync = require('lowdb/adapters/FileSync');
const low = require('lowdb');

const adapter = new FileSync('data/users.json');

const DB = low(adapter);

module.exports = {DB};