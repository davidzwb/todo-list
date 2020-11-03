const ejs = require("ejs");
const Entry = require("../model/entry");

let userID = 1;

let renderHomePage = function (req, res) {
    Entry.find({userID: req.cookies.todoID}, (err, entries) => {
        let data = ejs.renderFile("./view/home.html", { entries: entries });
        data.then((data) => {
            res.write(data);
            res.end();e
        }).catch((error) => {
            console.log("error in rendering home page: " + error);
        });
    });
};

module.exports = function(app) {
    
    app.get("/", (req, res) => {
        if (req.cookies.todoID === undefined) {
            res.cookie("todoID", userID);
            console.log("new user added with id " + userID);
            userID++;
        }
    
        renderHomePage(req, res);
    });
    
    app.post("/todo", async (req, res) => {
    
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

    app.get("/remove/:entry", (req, res) => {
        console.log("to remove entry: " + req.params.entry);
        Entry.remove({entry:req.params.entry}, (err) => {
            renderHomePage(req, res);
        });
        
    });
};