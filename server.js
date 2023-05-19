const express = require("express");
const cors = require ("cors");
const app = express();

require("./config/mongoose.config");
require('dotenv').config();

app.use(express.json(), express.urlencoded({ extended: true }));

app.use(cors({origin: "http://localhost:3000"}));

require('./config/mongoose.config');
require('./routes/userRoutes')(app);

app.listen(8000, () => console.log("The server is all fired up on port 8000"));
