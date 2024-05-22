import mysql from "mysql2/promise"

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  port: "3306",
  password: "Negracalabaza@07",
  database: "sigo_dai",
});

export default pool
