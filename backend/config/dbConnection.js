const mysql = require('mysql2/promise');

let pool;

exports.dbConnect = async () => {
  try {
    const tempPool = await mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      waitForConnections: true,
    });

    await tempPool.execute('CREATE DATABASE IF NOT EXISTS todoapp');

    pool = await mysql.createPool({
      host: process.env.MYSQL_HOST,
      user: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASS,
      database: process.env.MYSQL_DB, 
      waitForConnections: true,
    });

    console.log('MySQL DB connection done');
  } catch (error) {
    console.error('MySQL connection failed:', error);
    process.exit(1);
  }
};

exports.getDB = () => pool;
