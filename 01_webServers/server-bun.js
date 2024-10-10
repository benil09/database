import {serve} from 'bun'
serve({
    fetch(request){
        const url = new URL (request.url) 
        console.log(url);
         
       
        if(url.pathname === '/'){
            return new Response ("hey how are you",{status:200})

        }else if(url.pathname==="/login"){
        return new  Response("welcome to login page",{status:200})
        }else if (url.pathname === "/register"){
            return new Response("welcome to register page",{status:200})
        }
        
        
        else{
            return new Response("404 error",{status:404})

        }

   
},
port:3000,
hostname:"127.0.0.1"


   
    
})