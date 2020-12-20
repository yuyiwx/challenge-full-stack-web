const mysql = require(`mysql`);
const pool = mysql.createPool({
  connectionLimit: 5,
  password: "12345678",
  user: "root",
  database: "chirps",
  host: "localhost",
  port: "3306",
});

let chirprdb = {};

chirprdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM chirprs`, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

chirprdb.one = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM chirprs WHERE id = ?`, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results[0]);
    });
  });
};

chirprdb.insert = (name) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO chirprs (name) VALUES (?)`,
      [name],
      (err, results) => {
        if (err) {
          return reject(err);
        }
        resolve(results);
      }
    );
  });
};
chirprdb.delete = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`DELETE FROM chirprs WHERE id = ?`, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results[0]);
    });
  });
};

module.exports = chirprdb;
