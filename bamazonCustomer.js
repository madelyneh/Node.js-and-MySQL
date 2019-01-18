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
          return inventory.insufficient();
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
  
      console.log("\n");
      userChoice(response);
    });
  },
  
  purchase: function(selectedProduct, quantity){

    connection.query("UPDATE products SET stock_quantity='" + (selectedProduct.stock_quantity - quantity) +"' WHERE product_name='" + selectedProduct.product_name + "'", function(error, response){

      if(error) throw error;
      console.log(`\nTransaction Total = $${(quantity * selectedProduct.price)} + tax\n`);
      
      // connection.query('SELECT * FROM products WHERE ?', { item_id: selectedProduct.item_id } , function(error, response){
      //   console.log("")
      // });

      connection.end();
    });
  },

  insufficient: function(){

    console.log("\n The quantity that you entered is more than the amount in our inventory. Please try again. \n");
    connection.end();
  },
};