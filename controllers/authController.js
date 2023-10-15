const errorHandler = require('../middlewares/errorMiddleware');
const userModel = require('../models/userModel');
const errorResponse = require('../utils/errResponse');
const bcrypt = require('bcryptjs'); // Import the bcrypt library

// jwt token
exports.sendToken = (user, statusCode, res) => {
    const token = user.getSignedToken(res);
    res.status(statusCode).json({
        success: true,
        token,
    });
};

// REGISTER
exports.registerController = async (req, res, next) => {
    console.log(req.body.username + "----------")
    console.log(req.body.email + "++++++++++++++")
    console.log(req.body.password + "############")
    try {

        const { username, email, password } = req.body;

        // Check if the email is already registered
        const existingEmail = await userModel.findOne({ email });
        if (existingEmail) {
            return next(new errorResponse('Email is already registered', 400));
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user with the hashed password
        const user = await userModel.create({ username, email, password: hashedPassword });
        this.sendToken(user, 201, res);
    } catch (error) {
        console.error(error);
        next(error);
    }
};


//LOGIN
exports.loginController = async (req, res, next) => {
    try {
        const { email, password } = req.body
        //validation
        if (!email || !password) {
            return next(new errorResponse('Please provide email or password'))
        }
        const user = await userModel.findOne({ email })
        if (!user) {
            return next(new errorResponse("Invaild Crenditials", 401))
        }
        const isMatch = await userModel.matchPassword(password)
        if (!isMatch) {
            return next(new errorHandler("Invalid Crenditial"))
        }
        //response
        this.sendToken(user, 201, res);
    } catch (error) {
        console.log(error)
        next(error)
    }
}


//LOGOUT
exports.logoutController = async (req, res) => {
    res.clearCookie('refreshToken')
    return res.status(200).json({
        success: true,
        message: 'Logout Successfully',
    })
}