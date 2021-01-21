const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const https = require("https");

const app=express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname+ "/signup.html");
});
app.post("/",function(req,res){

  const firstName=req.body.fname;
const lastName= req.body.lname;
  const email=req.body.email;
console.log(firstName,lastName,email);
const data = {
  members: [
    {
      email_address: email,
      status: "subscribed",
      merge_fields: {
        FNAME: firstName,
        LNAME: lastName
      }
    }
  ]
};
const jsonData = JSON.stringify(data);
const url="https://us7.api.mailchimp.com/3.0/lists/4db07546a9";
const options = {
  method: "POST",
  auth: "kalraprince:008b0fe94f2ef7da3eef335324a10b9c-us7"
}
const request=https.request(url,options,function(response){

  if(response.statusCode==200)
  {
  res.sendFile(__dirname + "/success.html")
  }
  else {
  res.sendFile(__dirname + "/failure.html")
  }
  response.on("data",function(data){
    console.log(JSON.parse(data));
  })
})
request.write(jsonData);
request.end();

});
app.post("/failure",function(req , res){
  res.redirect("/")
})

app.listen(process.env.PORT || 3000,function(){
  console.log("Server is running on port 3000");
});
// 8f0968bb94
// a0e1368b9e897979cef87149c0a5205c-us7
