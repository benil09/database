import express from 'express'
import logger from "./logger.js";
import morgan from "morgan";



const app=express()
const port=3000
app.use(express.json())   // express.json() is a middleware to parse JSON
  
const morganFormat = ":method :url :status :response-time ms";

app.use(
    morgan(morganFormat, {
      stream: {     // The stream option allows you to override the default logging behavior by providing a custom function for handling log output.
        write: (message) => {
          const logObject = { 
            method: message.split(" ")[0],           //:method: Logs the HTTP method of the request (e.g., GET, POST, PUT, DELETE).
            url: message.split(" ")[1],            //	:url: Logs the URL of the request (e.g., /users, /api/items).
            status: message.split(" ")[2],         // :status: Logs the HTTP status code of the response (e.g., 200 for success, 404 for not found).
            responseTime: message.split(" ")[3],    // :response-time: Logs the time taken to respond to the request, in milliseconds.
                                                     // ms: A literal string to denote that the response time is measured in milliseconds.
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );

let teaData=[]
let nextid=1
// add a new tea item
app.post('/tea',(req,res)=>{
    const {name,price,quantity}=req.body  //req.body client jo bhi data bjejega usko hold krega 
    const newTea={id:nextid++,name,price,quantity}
    teaData.push(newTea)
    res.status(200).send(newTea)

})

// get all tea item
app.get("/tea",(req,res)=>{
    res.status(200).send(teaData)

})

// get a tea item with id 

app.get("/tea/:id",(req,res)=>{
    const tea=teaData.find(t=>t.id === parseInt (req.params.id))
    if(!tea){
        res.status(404).send("Bad request ! Data not found")
       
    }
   
    return res.status(200).send(tea)
    })



//update tea item
app.put("/tea/:id",(req,res)=>{
  const updateID = req.params.id
  const tea = teaData.find(t => t.id === parseInt(updateID))
  if (tea) {
    const { name, price, quantity } = req.body
    tea.name = name
    tea.price = price
    tea.quantity = quantity
    res.status(200).send(tea)
  }
})


//delete tea item

app.delete("/tea/:id",(req,res)=>{
   const index =  teaData.findIndex(t =>t.id === parseInt(req.params.id) )

   if(index===-1){
  return   res.send("key not found")
   }
   teaData.splice(index,1)
   return res.status(200).send("deleted")
   

})


app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})