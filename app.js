const express=require('express')
const app=express()

const bodyParser=require('body-parser')
app.use("/style",express.static(__dirname + "/style"));
app.use("/images",express.static(__dirname + "/images"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",(req,res)=>{

    res.sendFile(__dirname+"/index.html");

})
app.post("/",(req,res)=>{

    var firstName=req.body.firstname
    var lastName=req.body.lastname
    var email=req.body.email

console.log(firstName+" "+lastName+" email:"+email)
console.log(req.body)
})


app.listen(3000,()=>{


    console.log('Running on port 3000')
})