const { getDB } = require('../config/dbConnection'); 

exports.createUsersTable = async () => {
  const db = getDB();
  const query = `
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      token TEXT
    );
  `;
  await db.execute(query);
};

exports.getUserByEmail = async (email) => {
  const db = getDB();
  const [rows] = await db.execute('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0]; 
};

exports.createUser = async ({ name, email, password, token = null }) => {
  const db = getDB();
  const [result] = await db.execute(
    'INSERT INTO users (name, email, password, token) VALUES (?, ?, ?, ?)',
    [name, email, password, token]
  );
  return result.insertId;
};
