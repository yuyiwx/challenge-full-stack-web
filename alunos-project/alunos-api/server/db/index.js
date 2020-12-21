const mysql = require(`mysql`);
const pool = mysql.createPool({
  connectionLimit: 5,
  password: "12345678",
  user: "root",
  database: "grupoa",
  host: "localhost",
  port: "3306",
});

let chirprdb = {};

chirprdb.all = () => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM alunos`, (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results);
    });
  });
};

chirprdb.one = (id) => {
  return new Promise((resolve, reject) => {
    pool.query(`SELECT * FROM alunos WHERE id = ?`, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results[0]);
    });
  });
};

chirprdb.insert = (register, name, email, cpf) => {
  return new Promise((resolve, reject) => {
    pool.query(
      `INSERT INTO alunos (register, name, email, cpf) VALUES (?,?,?,?)`,
      [register, name, email, cpf],
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
    pool.query(`DELETE FROM alunos WHERE id = ?`, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      return resolve(results[0]);
    });
  });
};

module.exports = chirprdb;
