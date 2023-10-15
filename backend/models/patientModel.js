const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./new_database.db');

const Patient = {
  create: function (patient, callback) {
    db.run(
      'INSERT INTO patients (name, body_temperature, heart_rate, frequent_sickness) VALUES (?, ?, ?, ?)',
      [patient.name, patient.body_temperature, patient.heart_rate, patient.frequent_sickness],
      (err) => {
        if (err) {
          console.error(err);
          callback(err);
        } else {
          callback(null);
        }
      }
    );
  },
  getAll: function (callback) {
    db.all('SELECT * FROM patients', (err, rows) => {
      if (err) {
        console.error(err);
        callback(err, null);
      } else {
        callback(null, rows);
      }
    });
  },
};

module.exports = Patient;
