const express=require("express");
const app=express();
const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/todolistdb",{useUnifiedTopology: true, useNewUrlParser: true ,});

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

const itemsSchema = new mongoose.Schema({
    name:String
});

const Item= mongoose.model("Item",itemsSchema);

const task1= new Item({name:"secion-27"});
const task2=new Item({name:"Binary trees"});

Item.insertMany([task1,task2],function(err){
    if(err){
        console.log(err);
    }
    else{
        console.log("success!")
    }
});



var tasks=[];
var works=[];

app.get("/",function(req,res){
    Item.find({},function(err,result){
        if(err){
            console.log(err);
        }
        else{
            res.render("list",{title:"Today",newItems:result});
        }
    });

    
});

app.post("/",function(req,res){
    var task=req.body.task;

    if(req.body.list==="Work"){
        works.push(task);
        res.redirect("/work");
    }
    else{
        tasks.push(task);
        res.redirect("/");
    }
});

app.get("/work",function(req,res){
    res.render("list",{title:"Work",newItems:works});
});



app.listen(3000,function(){

});