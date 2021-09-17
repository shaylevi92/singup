const express = require("express");
const https = require("https");
const request = require("request");
const bodyParser = require("body-parser");
const { response } = require("express");

const app = express(); // שימוש בספריית האקספרס
app.use('/public', express.static("public")); // css שליפה של קובץ
app.use(express.urlencoded({ extended: true })); // שימוש בספריה שתאפשר שליפת הקלט מצד המשתמש


app.get("/", function(req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.userEmail;

    
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
    const url = "https://us5.api.mailchimp.com/3.0/lists/0dfcda48c0";

    const options  = {
        method:"POST",
        auth:"levi shay:d8d2c9b7fc27840b77b05d01595fc06b-us5"

    }
   
    const request=  https.request(url, options,
        function(response){
            response.on("data", function(data){
                console.log(JSON.parse(data));
            })
        })

        if (response.statusCode === 2000) {
            res.sendFile(__dirname + "/success.html")
        }
        else{
            res.sendFile(__dirname + "/failure.html")
        }
    request.write(jsonData);
    request.end();
});



app.post("/failure" , function(req , res){
    res.redirect("/");
})


//api 
// d8d2c9b7fc27840b77b05d01595fc06b-us5

//id
// 0dfcda48c0
app.listen(process.env.PORT || 3000  , function() { // האזנה לפורט דינמי שהשרת יקצה בזמן ריצה או לפורט 3000
    console.log("Server is runnung on port 3000");
})
