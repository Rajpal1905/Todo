const { getDB } = require('../config/dbConnection');

// Create tasks table if it doesn't exist
exports.createTasksTable = async () => {
  const db = getDB();
  const sql = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      status ENUM('To Do', 'In Progress', 'Done') DEFAULT 'To Do',
      userId INT NOT NULL,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
      updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
      FOREIGN KEY (userId) REFERENCES users(id) ON DELETE CASCADE
    );
  `;

  try {
    await db.execute(sql);
    console.log('Tasks table created.');
  } catch (error) {
    console.error('Error creating tasks table:', error);
    throw error;
  }
};

exports.createTask = async ({ title, description, status, userId }) => {
  const db = getDB();
  const [result] = await db.execute(
    'INSERT INTO tasks (title, description, status, userId) VALUES (?, ?, ?, ?)',
    [title, description || null, status, userId]
  );
  const [task] = await db.execute('SELECT * FROM tasks WHERE id = ?', [result.insertId]);
  return task[0];
};

exports.getTasksByUserId = async (userId) => {
  const db = getDB();
  const [rows] = await db.execute('SELECT * FROM tasks WHERE userId = ?', [userId]);
  return rows;
};

exports.getTaskById = async (taskId, userId) => {
  const db = getDB();
  const [rows] = await db.execute('SELECT * FROM tasks WHERE id = ? AND userId = ?', [taskId, userId]);
  return rows[0];
};

exports.deleteTask = async (taskId, userId) => {
  const db = getDB();
  const [result] = await db.execute('DELETE FROM tasks WHERE id = ? AND userId = ?', [taskId, userId]);
  return result.affectedRows;
};

exports.updateTaskStatus = async (taskId, status, userId) => {
  const db = getDB();
  await db.execute(
    'UPDATE tasks SET status = ?, updatedAt = CURRENT_TIMESTAMP WHERE id = ? AND userId = ?',
    [status, taskId, userId]
  );
  const [rows] = await db.execute('SELECT * FROM tasks WHERE id = ?', [taskId]);
  return rows[0];
};

exports.updateTask = async (taskId, userId, data) => {
  const db = getDB();
  const fields = [];
  const values = [];

  if (data.title) {
    fields.push('title = ?');
    values.push(data.title);
  }

  if (data.description) {
    fields.push('description = ?');
    values.push(data.description);
  }

  if (data.status) {
    fields.push('status = ?');
    values.push(data.status);
  }

  if (fields.length === 0) return null;

  values.push(taskId, userId);

  await db.execute(
    `UPDATE tasks SET ${fields.join(', ')}, updatedAt = CURRENT_TIMESTAMP WHERE id = ? AND userId = ?`,
    values
  );

  const [rows] = await db.execute('SELECT * FROM tasks WHERE id = ?', [taskId]);
  return rows[0];
};