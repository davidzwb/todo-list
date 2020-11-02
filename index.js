const express = require("express");
const app = express();
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const Entry = require("./model/entry");

let userID = 1;
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


let renderHomePage = function (req, res) {
    Entry.find({userID: req.cookies.todoID}, (err, entries) => {
        let data = ejs.renderFile("./view/home.html", { entries: entries });
        data.then((data) => {
            res.write(data);
            res.end();
        }).catch((error) => {
            console.log("error in rendering home page: " + error);
        });
    });
};

app.get("/", (req, res) => {
    if (req.cookies.todoID === undefined) {
        res.cookie("todoID", userID);
        console.log("new user added with id " + userID);
        userID++;
    }

    renderHomePage(req, res);
});

app.post("/todo", async (req, res) => {
    console.log(req.body);

    let userPlan = req.body["plan"];
    const entry = new Entry({userID: req.cookies.todoID, entry: userPlan});

    try {
        await entry.save();
        renderHomePage(req, res);
    }
    catch (err) {
        renderHomePage(req, res);
    }
});




