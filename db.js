// db.js
// const sqlite3 = require('sqlite3');
// const { open } = require('sqlite');

import { sqlite3, open } from "sqlite3";


async function openDatabase() {
  return open({
    filename: './database.db',
    driver: sqlite3.Database,
  });
}

module.exports = openDatabase;
