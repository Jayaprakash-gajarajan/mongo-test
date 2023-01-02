import { client } from "../index.js";

export async function deleteMovieById(id) {
    return await client
        .db("test")
        .collection("movie")
        .deleteOne({ id: id });
}
export async function getMovieById(id, data) {
    return await client
        .db("test")
        .collection("movie")
        .updateOne({ id: id }, { $set: data });
}
export async function postMovies(data) {
    return await client.db("test").collection('movie').insertMany(data);
}
export async function getMovies(request) {
    return await client.db("test").collection("movie").find(request.query).toArray();
}
