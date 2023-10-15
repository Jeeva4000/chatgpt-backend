const express = require("express");
const morgan = require("morgan")
const cors = require('cors')
const bodyParser = require("body-parser")
const colors = require('colors')
const dotenv = require("dotenv");
const connectDB = require("./config/db");

//routes path
const authRoutes = require("./routes/authRoutes");
const errorHandler = require("./middlewares/errorMiddleware");


//configure
dotenv.config();
//rest object
const app = express();

//connect db
connectDB();

//middlewares
app.use(cors());
app.use(express())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(morgan('dev'))
app.use(errorHandler)


const PORT = process.env.PORT || 7070


//api routes
app.use("/auth", authRoutes)





//server listen
app.listen(PORT, () => {
    console.log(`server running in localhost:${PORT}`);
})