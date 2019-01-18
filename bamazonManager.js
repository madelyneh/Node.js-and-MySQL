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
      type: "list",
      name: "choice",
      message: "- Inventory Managment Menu -",
      choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product", "Exit"]
    }]).then(answer => {

      switch (answer.choice){

        case "View Products for Sale":
          inventory.view();
          break;

        case "View Low Inventory":
          inventory.lowQuantity()
          break;
        
        case "Add to Inventory":
          inventory.addQuantity();
          break;
        
        case "Add New Product":
          inventory.addProduct();
          break;

        case "Exit":
          connection.end();
          break;

      }
    });
  },

  view: function(){
    connection.query("SELECT * FROM products", function(error, response){
  
      if(error) throw error;
      console.log("\n------- Bamazon Inventory -------");
  
      for(let i = 0; i < response.length; i ++){
        console.log(response[i].item_id + ": " + response[i].product_name + " - " + response[i].department_name + " | Price: " + response[i].price + " | Quantity: " + response[i].stock_quantity);
      };
  
      console.log("\n");
      inventory.menu();
    });
  },

  lowQuantity: function(){
    connection.query('SELECT * FROM products WHERE stock_quantity <= 5' , function(error, response){
      
      if(response.length == 0){
        console.log("\n*No products are running low at this time.*\n");
        return inventory.menu();
      };

      for(let i = 0; i < response.length; i ++){
        console.log(response[i].item_id + ": " + response[i].product_name + " - " + response[i].department_name + " | Price: " + response[i].price + " | Quantity: " + response[i].stock_quantity);
      };
      return inventory.menu();
    });
  },

  addQuantity: function(){
    

  },

  addProduct: function(){

  },

}
