// const [,,num]=process.argv;
// const fs=require('fs');
// for(let i=1;i<=num;i++){
//     fs.writeFile(`./hello${i}.html`,"this is prakash",(err)=>{
//         console.log(`complete writing hello${i}.html`)
//     })
// }
// const letter="WELCOME TO MY PAGE";
// const fs=require('fs');
// fs.readFile('./cool.txt','utf-8',(err,data)=>{
//     if(err){
//         console.log(err);
//     }
//     else{
//         console.log(data);
//     }
// })
// fs.appendFile("./cool.txt",'\n',"prakash",(err)=>{
//     console.log("complete appending!!");
// })
// const express=require('express')
import express from "express"
import { Db, MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import moviesRouter from "./routes/movies.route.js"
import userRouter from "./routes/user.route.js"
dotenv.config();
const app=express();

const PORT = process.env.PORT;
// const MONGO_URL="mongodb://127.0.0.1"
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);//dail
//top level await(if outside the function also used its new feature)
await client.connect();//call
console.log("mongo is connected");
app.use(express.json())

app.get("/", function (request,response) {
  response.send("🙋👩‍💻👩‍💻❤️😍!!");
});
app.use("/movies",moviesRouter)
app.use("/user",userRouter)
app.listen(PORT, () => console.log(`the server started in:${PORT}`));
  
export{client};