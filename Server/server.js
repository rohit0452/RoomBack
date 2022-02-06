const express = require("express");
const env = require("dotenv")
const bodyparser = require("body-Parser");
const app = express();
const cors = require("cors")
env.config({path : "./config.env"})
const PORT = process.env.PORT ; 
const cookieParser = require("cookie-parser")


// ROUTES
require("./db/connection")
app.use(bodyparser.urlencoded({extended : true}))
const corsOption = {
    origin : "http://localhost:3000",
    credentials: true,
    header : 'Access-Control-Allow-Credentials' 
}
app.use(cors(corsOption))
app.use(cookieParser())
app.use(express.json());
app.use(require("./Routes/userroute"));
app.use(require("./Routes/ownerroute"));

app.get("/",(req,res)=>{
    res.send("Hello Duniya");
});


app.listen(PORT , ()=>{
    console.log("Server Started on port : " + PORT);
})