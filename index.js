const express = require("express");
const movieRouter = require("./routes/movie.route");
const PORT = 8080;
const connection = require("./config/db");
const server = express();
server.use(express.json());
server.use("/movies",movieRouter);

server.get("/",(req,res)=>{
    console.log("server is running fine");
});
server.listen(PORT,async()=>{
    try {
        await connection
        console.log(`server is running on port: ${PORT} and connected to database`);
    } catch (error) {
        console.log(`error in connecting server ${error}`);
    }
    
});