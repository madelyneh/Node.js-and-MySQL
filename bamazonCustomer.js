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
  inventory.getInfo();
});

// let getInfo = function() {
//   connection.query("SELECT * FROM products", function(error, response){

//     if(error) throw error;
//     console.log("------- Bamazon Inventory -------");

//     for(let i = 0; i < response.length; i ++){
//       console.log(response[i].item_id + ": " + response[i].product_name + " - " + response[i].department_name + " | Price: " + response[i].price + " | Quantity: " + response[i].stock_quantity);
//     };

//     console.log("\n");7
//     userChoice(response);
//   });
// };

let userChoice = function(response){

  inquirer.prompt([{
    type: "input",
    name: "choice",
    message: "What product would you like to buy? (input the item's number)"
  }]).then(function(answer){

    let match = false;
    for(let i = 0; i<response.length; i ++){
      if(answer.choice == response[i].item_id){
        match = true;
        let selectedProduct = response[i];

        console.log("\n ** " + selectedProduct.item_id + ": " + selectedProduct.product_name + " - " + selectedProduct.department_name + " | Price: " + selectedProduct.price + " | Quantity: " + selectedProduct.stock_quantity + " ** \n");

        inquirer.prompt([{
          type: "input",
          name: "choice",
          message: 'How many would you like?'
        }]).then(function(answer){

          let quantity = answer.choice;
          if(answer.choice <= selectedProduct.stock_quantity){
            return inventory.purchase(selectedProduct, quantity);
          } 
          return inventory.insufficient(selectedProduct, quantity);
        });
      };
    };
  });
};

let inventory = {

  getInfo: function() {
    connection.query("SELECT * FROM products", function(error, response){
  
      if(error) throw error;
      console.log("------- Bamazon Inventory -------");
  
      for(let i = 0; i < response.length; i ++){
        console.log(response[i].item_id + ": " + response[i].product_name + " - " + response[i].department_name + " | Price: " + response[i].price + " | Quantity: " + response[i].stock_quantity);
      };
  
      console.log("\n");7
      userChoice(response);
    });
  },
  
  purchase: function(selectedProduct, quantity){
    console.log("purchase")

  },

  insufficient: function(selectedProduct, quantity){
    console.log("insufficient")


  },

};