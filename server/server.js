const app = require('./app');

const dotenv = require('dotenv');
const connectDatabase = require("./config/database")

// Handle Uncaught Exception
process.on('uncaughtException', (err) =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`)
    process.exit(1);
});


// Config
dotenv.config({path: './config/config.env'});

// connecting to database
connectDatabase();


const server = app.listen(process.env.PORT, ()=>{
    console.log(`server is running on http://localhost:${process.env.PORT}`);
});


// Unhandled Promise Rejections 
process.on('unhandledRejection', err =>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down server due to Unhandled Promise Rejection`);
    server.close(() =>{
        process.exit(1);
    })
});