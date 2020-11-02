const express = require("express");
const app = express();
const ejs = require("ejs");
const cookieParser = require("cookie-parser");
const dataStore = require("./data-store");

let userID = 1;
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());


let renderHomePage = function (req, res) {
    entries = dataStore.getEntries(req.cookies.todoID);

    let data = ejs.renderFile("./view/home.html", { entries: entries });
    data.then((data) => {
        res.write(data);
        res.end();
    }).catch((error) => {
        console.log("error in rendering home page: " + error);
    });
};

app.get("/", (req, res) => {
    let entries = null;
    
    if (req.cookies.todoID === undefined) {
        res.cookie("todoID", userID);
        userID++;
    }
    else {
        console.log("has cookie: " + req.cookies.todoID);
        entries = dataStore.getEntries(req.cookies.todoID);

        if (entries !== null) {
            entries.forEach(element => {
                console.log("entries: " + element);
            });
        }
        else {
            console.log("entries empty");
        }
    }

    renderHomePage(req, res);
});

app.post("/todo", (req, res) => {
    console.log(req.body);

    dataStore.addEntry(req.cookies.todoID, req.body["plan"]);

    renderHomePage(req, res);
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
});


