const errorResponse = require("../utils/errResponse")


const errorHandler = (err, req, res, next) => {
    let error = { ...err }
    error.message = error.message || 'Server Error';

    //mongoose cast ERROR
    if (error.name === 'castError') {
        const message = "Resource not found"
        error = new errorResponse(message, 404)
    }
    //duplicate key error
    if (error.code === 11000) {
        const message = 'Duplicate field value enterd'
        error = new errorResponse(message, 400)
    }
    //mongoose validation
    if (error.name === 'validationError') {
        const message = Object.values(err.errors).map(val => val.message)
        error = new errorResponse(message, 400)
        res.status(err.statusCode || 500).json({
            succes: false,
            error: error.message || 'Server Error'
        })
    }
}


module.exports = errorHandler;