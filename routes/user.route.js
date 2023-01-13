import express from "express"
import { createUser, generateHashPassword } from "../services/user.service.js";
const router = express.Router();
import { getUserByName } from "../services/user.service.js";
import jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
router.use(express.json())
import bcrypt from "bcrypt"
// Get method is used for read the data .

// signup is used for if the user is same not allowed and user is new generate the hashpassword and token
router.post("/signup", async (request, response) => {
  const {username,password} = request.body;
  // console.log(data);
  // const movie = await postMovies(data);
  const userFromDB=await getUserByName(username);
  console.log(userFromDB);
  if(userFromDB){
    response.send({message:"username already exits"})
  }
  else if(password.length<8){
response.send({message:"password must be at 8 character"})
  }
  else{
    const hashpassword=await generateHashPassword(password);
    const result=await createUser({
      username:username,
      password:hashpassword,
  // default all user roleId set by one
      roleId:1,
    })
     response.send(result);
  }
  
})
//login is use for particular data form user and check the password and password is wrong 
//retry and password is right to give the data to the user
router.post("/login", async (request, response) => {
  const {username,password} = request.body;
  // console.log(data);
  // const movie = await postMovies(data);
  const userFromDB=await getUserByName(username);
  console.log(userFromDB);
  if(!userFromDB){
    response.status(401).send({message:"Invalid data"})
  }
  else{
    const storedDBPassword=userFromDB.password;
    const isPasswordCheck=await bcrypt.compare(password,storedDBPassword)
    console.log(isPasswordCheck);
  
  if(isPasswordCheck){
    const token=jwt.sign({id:userFromDB._id},process.env.SECRET_KEY);
    console.log(token);
    response.send({message:"SucessFul login",token:token,roleId:userFromDB.roleId});
  }
  else{
    response.status(401).send({message:"invalid data"});
  }
}
  
})


export default router;


