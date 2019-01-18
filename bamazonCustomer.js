const mysql = require("mysql");

let connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(error) {

  if (error) throw error;
  console.log("connected as id " + connection.threadId);
  getInfo();
});

let getInfo = function() {

  connection.query("SELECT * FROM products")

};