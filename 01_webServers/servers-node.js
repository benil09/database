const http=require("http")
const hostname="127.0.0.1"
const port =3000

const server = http.createServer((req,res)=>{
    if(req.url === '/'){
    res.statusCode=200
    res.setHeader('Content-Type','text/plain')
    res.end("hello its really hoy in india")
    } else if (req.url=== '/login'){
        res.statusCode=200
    res.setHeader('Content-Type','text/plain')
    res.end("hello its really cold in pakistan")
    }else{
        res.statusCode=404 
        res.setHeader('Content-Type','text/plain')
        res.end("404 error not found")

    }
})

server.listen(port,hostname,()=>{
    console.log("hello world server is listening ");
    

})