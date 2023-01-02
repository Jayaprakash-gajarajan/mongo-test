import { client } from "../index.js";
import bcrypt from "bcrypt";
export async function generateHashPassword(password){
    const NO_ROUND=10;
     const salt= await bcrypt.genSalt(NO_ROUND);
     const hashpassword= await bcrypt.hash(password,salt);
     console.log(salt);
     console.log(hashpassword);
  return hashpassword;
  }
  
export async function createUser(data) {
    return await client.db("test").collection('users').insertOne(data);
}
export async function getUserByName(username) {
    return await client.db("test").collection("users").findOne({username:username});
}

