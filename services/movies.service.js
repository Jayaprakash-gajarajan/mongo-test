import { client } from "../index.js";
import { ObjectId } from "mongodb";
export async function deleteMovieById(id) {
    return await client
        .db("test")
        .collection("movie")
        .deleteOne({ id: id });
}
export async function updateMovieById(id, data) {
    return await client
        .db("test")
        .collection("movie")
        .updateOne({ id:id }, { $set: data });
}

export async function getMovieById(id) {
    console.log(id);
    return await client
      .db("test")
      .collection("movie")
      .findOne({ _id:ObjectId(id)});
  }
  
export async function postMovies(data) {
    return await client.db("test").collection('movie').insertMany(data);
}
export async function getMovies(request) {
    return await client.db("test").collection("movie").find(request.query).toArray();
}
