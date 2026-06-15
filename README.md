This is  a base js project template , which anyone can use as it has been prepared by keeping some of the most importaant code principles and project management recommendation . feel free to change anything .

'src' => Inside the src folder all the actual source code regarding the project will reside , thi s will not include any kind if  test 


  lets take look inside 'scr' folder 

  - 'config' -> In this folder anything and everything regarding any configuration or setup of a library of module will be done . For example setting up .ennv so that we can use the environment variable anywhere in clearner fashion , this is done in the 'server-config-js' .

  - 'routes' => In the routes folder we register a route and the corresponding midddleware and controller to it 

  - 'middleware' => They are just going to intercep the incoming request where we can write our validator and  authenticator etc.

  - 'controller' => they are kind of last middleware as post them you call you business layer to. execute the business logic . IN controller we just receive the incoming request and data and then pass it to business layer , and once business layer return an output , we structur the api response in controller and send the output .

  - 'repositories' => This folder contain all the logic using we interact the DB by writing queries , all the raw queries or ORM queries will go here .

  - 'service' => contains the business logic and innteract with repositories for data from the database 

  - 'utils' => contains helper method , error classes etc

  ### SETUP THE PROJECT

  - Download this template from github and open it in your text editor .
  - In the root directory creste a '.env' file and add the following env variable 

  PORT = <port number of your choice >

  - Go inside the 'src' folder and execute the following command :
 .....
  npx sequelize init 
.....

  - BY executing the above command you will get migration and seeder folder along with config .json inside config folder 

- If you are setting up your development environment , then write the username of your DB , password and dialect mention whatever db you are using for exam ple : mysql, mariab etc