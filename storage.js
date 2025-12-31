
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.join(__dirname, '..', 'data', 'events.db');

const db = new sqlite3.Database(dbPath);

// Initialize table
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS events (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      workflow TEXT NOT NULL,
      status TEXT NOT NULL,
      message TEXT,
      severity TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

function saveEvent(event) {
  return new Promise((resolve, reject) => {
    const { workflow, status, message = '', severity = null } = event;
    db.run(
      `INSERT INTO events (workflow, status, message, severity) VALUES (?, ?, ?, ?)`,
      [workflow, status, message, severity],
      function (err) {
        if (err) return reject(err);
        resolve(this.lastID);
      }
    );
  });
}

function getRecentEvents(limit = 50) {
  return new Promise((resolve, reject) => {
    db.all(
      `SELECT id, workflow, status, message, severity, created_at
       FROM events
       ORDER BY created_at DESC
       LIMIT ?`,
      [limit],
      (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      }
    );
  });
}

module.exports = {
  saveEvent,
  getRecentEvents,
};
