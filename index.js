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

// this task  i think not need to connect the mongodb but i just testing.
import express, { request, response } from "express"
import { MongoClient } from "mongodb";
import * as dotenv from "dotenv";
import moviesRouter from "./routes/movies.route.js"
import userRouter from "./routes/user.route.js";
import { ObjectId } from "mongodb";
import cors from "cors"
import { auth } from "./middlewar/auth.js";
dotenv.config();
const app=express();

const PORT = process.env.PORT;
// const MONGO_URL="mongodb://127.0.0.1"
const MONGO_URL = process.env.MONGO_URL;
const client = new MongoClient(MONGO_URL);//dail
//top level await(if outside the function also used its new feature)
await client.connect();//call
console.log("mongo is connected");
app.use(express.json());
app.use(cors());
const mobiles= [
  {
    model: "OnePlus 9 5G",
    img: "https://m.media-amazon.com/images/I/61fy+u9uqPL._SX679_.jpg",
    company: "Oneplus"
  },
  {
    model: "Iphone 13 mini",
    img:
      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/iphone-13-mini-blue-select-2021?wid=470&hei=556&fmt=jpeg&qlt=95&.v=1645572315986",
    company: "Apple"
  },
  {
    model: "Samsung s21 ultra",
    img: "https://m.media-amazon.com/images/I/81kfA-GtWwL._SY606_.jpg",
    company: "Samsung"
  },
  {
    model: "Xiomi mi 11",
    img: "https://m.media-amazon.com/images/I/51K4vNxMAhS._AC_SX522_.jpg",
    company: "Xiomi"
  }
];
app.get("/", function (request,response) {
  response.send("🙋👩‍💻👩‍💻❤️😍!!");
});
//find give curser toArray() is use to find all datas
app.get("/mobiles",async(request,response)=>{
  const mobiles=await client.db("test").collection("mobiles").find({}).toArray();
  response.send(mobiles)
})
const ROLE_ID={
  ADMIN:"0",
  NORMAL_USER:"1",
};
app.delete("/mobiles/:id",auth,async(request,response)=>{
  const id=request.params;
  const {roleId}=request;
  // console.log(roleId)
  if(roleId==ROLE_ID.ADMIN){
  const mobiles=await client.db("test").collection("mobiles").deleteOne({_id:ObjectId(id)});
  mobiles.deletedCount> 0 ?response.send({message:"Mobile deleted sucessfully"}):response.send({message:"Mobile not found"});
  } 
  else{
     
    response.status(401).send({message:`Unauthorized`})
    
  }
})



app.post("/mobiles",async(request,response)=>{
  const data=request.body;
  const result=await client.db("test").collection("mobiles").insertMany(data)
  response.send(result)
})
app.use("/movies",moviesRouter)
app.use("/user",userRouter)
app.listen(PORT, () => console.log(`the server started in:${PORT}`));
  
export{client};