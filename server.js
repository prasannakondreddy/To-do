const express=require("express");
const app=express();
app.set('view engine', 'ejs');
app.use(express.urlencoded({extended:true}));
app.use(express.static("public"));

var tasks=[];

app.get("/",function(req,res){
    var today=new Date();
    var day="";
    if(today.getDay==6||today.getDay==0 ){
        day="weekend";
    }
    else{
        day="weekday";
    } 

    res.render("list",{knowtheDay:day,tasks:tasks});
});

app.post("/",function(req,res){
    var task=req.body.task;
    tasks.push(task);
    res.redirect("/");
});

app.listen(3000,function(){

});