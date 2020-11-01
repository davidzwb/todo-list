const express = require("express");
const app = express();
const ejs = require("ejs");
const port = 3000;

app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    let data = ejs.renderFile("./view/home.html");
    data.then((data) => {
        res.write(data);
        res.end();
    }).catch(() => {
        console.log("error in rendering home page");
    });
});

app.post("/todo", (req, res) => {
    console.log(req.body);
    let data = ejs.renderFile("./view/home.html");
    data.then((data) => {
        res.write(data);
        res.end();
    }).catch(() => {
        console.log("error in rendering home page");
    });
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  });