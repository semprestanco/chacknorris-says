import express from "express";
import axios from "axios";
import ejs from "ejs";
import bodyParser from "body-parser";



let app = express();
const port = 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/public/images/', express.static('./public/images'));



app.get("/", async (req,res)=>{
   //let result = await axios.get("https://api.chucknorris.io/jokes/random");
  
try{
    res.render("index.ejs",
    //{fact:result.data.value}
    );
}catch(error){
    console.error(error);
    res.status(500);
}
})
app.post("/search", async (req,res)=>{

let query = req.body.search;
    let resultQuery = await axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`);
  
    var shuffled = resultQuery.data.result.sort(function(){ return 0.5 - Math.random() });//return random objects 
    var selected = shuffled.slice(0,5);
   
    try{
        res.render("index.ejs",{fact:selected});
    }catch(error){
        console.error(error);
        res.status(500);
    }
});




app.listen(port,()=>{
    console.log("Server started on port "+port);
})