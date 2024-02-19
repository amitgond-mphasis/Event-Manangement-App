const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
var jwtlib = require('jsonwebtoken');

const app = express();
app.use(express.static("public"))
dotenv.config({ path: "./config/config.env" });

app.use(cors());
//botkit connection with local server jwt
app.get('/sts', (req, res) => {
    res.set( {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin":"*",
    "Access-Control-Allow-Headers":"*",
    "Access-Control-Allow-methods":"*"});
    const jwt = generateJWTForOTTBot();
    data = {
    jwt:jwt
    };
    res.send(JSON.stringify(data));
   })
   ////
   function generateJWTForOTTBot(){
     const payload = {
       "iat": (new Date().getTime())/1000,
       "exp": (new Date().getTime())/1000+86400,
         "aud": "https://idproxy.kore.ai/authorize",
         "iss": "cs-e6c6745f-876d-50ac-99c4-f4940bd1f8cb",  //change
       "sub": "amit@gmail.com" //change
     }
     const secret = "NBr+q2nibz2kO7OiiPWBRTXdIhKhc+tKRkNpo4+Ypd8=";  //change
     var token = jwtlib.sign(payload, secret);
     return token;
   }
app.listen(8080,()=>{
    console.log("Port listening in 8080....");
})