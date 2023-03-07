const ErrorHandler = require('../utils/errorHandler');


module.exports = (err, req, res, next)=>{
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    // Wrong Mongodb ID error
    if(err.name === 'CastError'){
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHandler(message, 400)
    }

    // mongoose duplicate keys error
    if(err.code === 11000){
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHandler(message, 400)
    }

    // wrong json web token
    if(err.name === "JsonWebTokenError"){
        const message = `Json web token is invalid, Try again`;
        err = new ErrorHandler(message, 400)
    }

    // JWT expire error
    if(err.name === "JsonExpiredError"){
        const message = `Json web token is expire, Try again`;
        err = new ErrorHandler(message, 400)
    }
    

    res.status(err.statusCode).json({
        success: false,
        message: err.message, 
    });
};