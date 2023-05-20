const express = require("express");
const cors = require ("cors");
const app = express();
const cookieParser= require("cookie-parser")

require("./config/mongoose.config");
require('dotenv').config();

app.use(express.json(), express.urlencoded({ extended: true }));
app.use(cors({credentials:true, origin:"http://localhost:3000"}));
app.use(cookieParser());

require('./config/mongoose.config');
require('./routes/userRoutes')(app);

const BreakRoutes = require("./routes/breakRoutes");
BreakRoutes(app);

app.listen(8080, () => console.log("The server is all fired up on port 8080"));
