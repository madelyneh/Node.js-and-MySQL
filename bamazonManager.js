const mysql = require("mysql");
const inquirer = require("inquirer");

let productList;

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
          setTimeout(inventory.menu, 200);
          break;

        case "View Low Inventory":
          inventory.lowQuantity()
          break;
        
        case "Add to Inventory":
          inventory.view();
          setTimeout(inventory.addQuantity, 200);
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
      productList = response;
    });
  },

  lowQuantity: function(){
    connection.query('SELECT * FROM products WHERE stock_quantity <= 5' , function(error, response){
      
      if(response.length == 0){
        console.log("\n*No products are running low at this time.*\n");
        return inventory.menu();
      };

      for(let i = 0; i < response.length; i ++){
        console.log("\n" + response[i].item_id + ": " + response[i].product_name + " - " + response[i].department_name + " | Price: " + response[i].price + " | Quantity: " + response[i].stock_quantity + "\n");
      };
      return inventory.menu();
    });
  },

  addQuantity: function(){

    inquirer.prompt([{
      type: "input",
      name: "choice",
      message: "Which item do you want to add to? (Input item id)",
    }]).then(answer => {

    for(let i = 0; i<productList.length; i ++){
      if(answer.choice == productList[i].item_id){
        
        let selectedProduct = productList[i];

        console.log("\n ** " + selectedProduct.item_id + ": " + selectedProduct.product_name + " - " + selectedProduct.department_name + " | Price: " + selectedProduct.price + " | Quantity: " + selectedProduct.stock_quantity + " ** \n");

        inquirer.prompt([{
          type: "input",
          name: "choice",
          message: "How many of this item would you like to add to inventory?",
        }]).then(answer => {

          let quantity = ((parseInt(answer.choice)) + selectedProduct.stock_quantity);

          connection.query("UPDATE products SET stock_quantity='" + quantity +"' WHERE item_id='" + selectedProduct.item_id + "'", function(error, response){

            if(error) throw error;
            
            console.log("\n** Inventory has been updated **\n");
            inventory.menu();
          });
        });
      };
     };
    });
  },

  addProduct: function(){

    inquirer.prompt([{
      type: "input",
      name: "choice",
      message: "What is the name of the item you would like to add?",
    }]).then(answer => {

      let name = answer.choice;

      inquirer.prompt([{
        type: "input",
        name: "choice",
        message: "Department name:",
      }]).then(answer => {

        let department = answer.choice;
        
        inquirer.prompt([{
          type: "input",
          name: "choice",
          message: "Price:",
        }]).then(answer => {
          let price = answer.choice;
          
          inquirer.prompt([{
            type: "input",
            name: "choice",
            message: "Quantity:",
          }]).then(answer => {
            let quantity = answer.choice;

            connection.query(`INSERT INTO products (product_name, department_name, price, stock_quantity)
            VALUES ("${name}", "${department}", ${price}, ${quantity})`, function(error, response){

              if (error) throw error;
              console.log("\n ** " + name + " - " + department + " | Price: " + price + " | Quantity: " + quantity + " ** \n *Has been added to inventory* \n");

              inventory.menu();
            });
          });
        });
      });
    });
  },

};
