const express = require("express");

const {serverConfig, Logger } = require("./config");
const app = express();

const apiRoutes = require('./routes');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api' , apiRoutes)


app.listen(serverConfig.PORT , () => {
    console.log(`Server is running on port ${serverConfig.PORT}`);
    Logger.info("succesfully started the server ", "root", {})
}); 
 
