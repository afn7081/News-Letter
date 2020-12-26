const express=require('express')
const app=express()
const request =require('request')

const bodyParser=require('body-parser')
app.use(express.static("public"));
//app.use("/images",express.static(__dirname + "/images"));
app.use(bodyParser.urlencoded({extended: true}));
app.get("/",(req,res)=>{

    res.sendFile(__dirname+"/public/index.html");

})
app.post("/",(req,res)=>{

    var firstName=req.body.firstname
    var lastName=req.body.lastname
    var email=req.body.email

// console.log(firstName+" "+lastName+" email:"+email)
// console.log(req.body)
    var data={
        members:[
            {email_address:email,
                merge_fields:{
                    FNAME:firstName,
                    LNAME:lastName

                },
               status:"subscribed"}
    ], update_existing: false };
    
    var jsonData=JSON.stringify(data);
    var options={
        url:'https://us7.api.mailchimp.com/3.0/lists/5362453d35',
        method:'POST',
        headers:{
            "Authorization":"afnan1 eaee6ed167db6c1d3b7398b0767d4c27-us7"
            
        },
     body:jsonData
    }

    request(options,(err,response,body)=>{

        if(err){
            console.log(err)
            res.send(err.title)
        }
        else if(response.statusCode==200){

            res.sendFile(__dirname+"/public/success.html")
            console.log(response.statusCode)
        }
        else{
            res.sendFile(__dirname+"/public/failure.html")
        }
    })



})

app.post("/failure",(req,res)=>{
    res.redirect("/");
})

app.listen(process.env.PORT||3000,()=>{


    console.log('Running on port 3000')
})



// eaee6ed167db6c1d3b7398b0767d4c27-us7

// list id
// 5362453d35