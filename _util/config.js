require("dotenv").config();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  connectionLimit: 10
});
connection.connect(error=>{
    if(error) throw error;
    console.log("successfl connected");
})

module.exports = connection;