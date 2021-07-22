const express=require("express");
const app=express();
const mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/todolistdb");

app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

var tasks=[];
var works=[];

app.get("/",function(req,res){
    var today=new Date();
    var day="";
    if(today.getDay==6||today.getDay==0 ){
        day="weekend";
    }
    else{
        day="weekday";
    } 

    res.render("list",{title:day,newItems:tasks});
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