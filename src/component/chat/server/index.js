const http =require("http");
const express= require("express")
const cors= require("cors")
const socketio = require("socket.io")
const app = express()
const server = http.createServer(app);
const io = socketio(server)
app.use(cors)
const port = 3000 || process.env.PORT;
app.get("/",(req,res)=>{
    res.send("ajay kushwah ")
})
io.on("connection",()=>{
    console.log("new connection")
})
server.listen(port,()=>{
    console.log(`server is working on http://localhost:${port}`)
})