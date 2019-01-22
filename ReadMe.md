# Node.js & MySQL (Bamazon)

### Table of Contents 
- [Description](#Description)
- [Getting Started](#Getting-started)
- [Technologies](#Technologies)
- [Contributor](#contributor)

<br>

## Bamazon Demo

#### Customer side:
<br>
![Demo](/images/customerDemo.gif)

#### Manager side:
<br>
![Demo](/images/managerDemo.gif)


## Description

Bamazon is a node application that is similar to amazon. 

* Customer side:
  1. Customers are able to see all products that are in inventory.
  2. Customers are able to purchase items, which will update the quantity in inventory

* Manager side:
  1. View all products in inventory 
  2. View products with low inventory
  3. Add quantity of an existing item to inventory
  4. Add a new product to inventory
  5. Exit the application


## Getting Started

### Prerequsites

1. Node.js must be installed (https://nodejs.org/en/download/)
1. MySQL must be installed. (https://www.mysql.com/downloads/) 
1. A MySQL developer tool such as Sequel Pro (https://sequelpro.com/download) or MySQL Workbench (https://dev.mysql.com/downloads/workbench/) is needed to create and interact with the database.

### Installation

1. Clone repository Node.js-and-MySQL using the code: `git clone https://github.com/madelyneh/Node.js-and-MySQL.git`
2. Open a command line(terminal or CLI) session and navigate to where you cloned the repository.
1. run `npm install` to install the dependencies
1. Use the *mysql.sql* file to create the databases in MySQL


## Technologies

- JavaScript
- Node.js (https://www.npmjs.com/package/node)
- mysql (https://www.npmjs.com/package/node-mysql)
- Inquirer (https://www.npmjs.com/package/inquirer)

## Contributor

Made by Madelyn Helton. 2019.