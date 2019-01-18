const mysql = require("mysql");
const inquirer = require("inquirer");

let connection = mysql.createConnection({
  host: "localhost",
  port: 8889,
  user: "root",
  password: "root",
  database: "bamazon"
});

connection.connect(function(error) {

  if (error) throw error;
  console.log("connection id: " + connection.threadId + "\n");
  inventory.menu();
});

let inventory = {

  menu: function(){

    inquirer.prompt([{
      type: "input",
      name: "choice",
      message: "What product would you like to buy? (input the item's number)"
    }]).then(function(answer){
      
    });

  },
}
