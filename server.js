const express = require("express");
const app = express();
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://admin-Prasanna:Prasanna@cluster0.pimux.mongodb.net/todolistdb", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    
});

app.set('view engine', 'ejs');
app.use(express.urlencoded({
    extended: true
}));
app.use(express.static("public"));

const itemsSchema = new mongoose.Schema({
    name: String
});

const Item = mongoose.model("Item", itemsSchema);

const task1 = new Item({
    name: "Hydrate"
});
const task2 = new Item({
    name: "Explore"
});
const task3 = new Item({
    name:"Keep Learning"
});



/* var tasks=[];
var works=[]; */

app.get("/", function (req, res) {
    Item.find({}, function (err, result) {
        if (result.length === 0) {
            Item.insertMany([task1, task2 ,task3], function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("success!")
                }
            });
            res.redirect("/");
        } else {
            res.render("list", {
                title: "Today",
                newItems: result
            });
        }
    });
});

app.post("/", function (req, res) {
    const task = req.body.task;

    const item = new Item({name:task});
    item.save();
    res.redirect("/");
    
});

app.post("/delete",function(req,res){
    const delitem=req.body.delItem;
    
    Item.findByIdAndRemove(delitem,function(err){
        if(err)console.log(err);
        else {
            console.log("deleted");
            res.redirect("/");
        }
    });
});


app.get("/work", function (req, res) {
    res.render("list", {
        title: "Work",
        newItems: works
    });
});

app.listen(3000, function () {

});