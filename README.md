# WeMeet 
App for make decision for food.

# Pre-work
Before to startup the app, you should :
1. Install Redis
2. Turn on the redis server
3. Set the PostgreSQL database for both development and test environment

# Getting Started
1. Clone the repository
2. Run 'npm install' install the dependences
3. Install Sequelize-CLI by "sudo npm install -g sequelize-cli"
4. Copy the ".example.env" file and modify the configuration such as yelp api_key, database configuration for it, save the file as ".env"
5. Copy the "config.example.json" file and modify the configuration for PostgreSQL and Sequelize, save the file as "config.json"
6. Run 'sequelize db:migrate' to create the tables of the project
7. Run 'npm start' to start the project

Enjoy!

# Build and Test
1. Modify the configuration for PostgreSQL and Sequelize for testing environment, save the file as "config.json"
2. Before running the testcase, run 'NODE_ENV=test sequelize db:migrate' to create the tables of the project
3. Run 'npm test'