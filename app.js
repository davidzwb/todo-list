const express = require("express");
const app = express();
require('dotenv').config();
const cookieParser = require("cookie-parser");
const routes = require('./controller/routes');
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect(`mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`, { useNewUrlParser: true }, () => {
    console.log("connected to db");
    app.listen(port, () => {
        console.log(`todo list app listening at http://localhost:${port}`)
    });
});

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

routes(app);




