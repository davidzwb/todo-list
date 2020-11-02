const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const routes = require('./controller/routes');
const port = 3000;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/todolist', { useNewUrlParser: true }, () => {
    console.log("Connected to db!");
    app.listen(port, () => {
        console.log(`Todo list app listening at http://localhost:${port}`)
    });
});

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

routes(app);




