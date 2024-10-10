import express from 'express'
const app=express()
const port=3000
app.use(express.json())

let teaData=[]
let nextid=1
// add a new tea
app.post('/tea',(req,res)=>{
    const {name,price,quantity}=req.body
    const newTea={id:nextid++,name,price,quantity}
    teaData.push(newTea)
    res.status(200).send(newTea)

})

// get all tea
app.get("/tea",(req,res)=>{
    res.status(200).send(teaData)

})

// get a tea with id

app.get("/tea/:id",(req,res)=>{
    const tea=teaData.find(t=>t.id === parseInt (req.params.id))
    if(!tea){
        res.status(404).send("Bad request ! Data not found")
       
    }
   
    return res.status(200).send(tea)
    })



//update tea
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


//delete tea

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