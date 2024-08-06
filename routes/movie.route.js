const express = require("express");
const movieRouter = express.Router();
const MovieApiModel = require("../models/movie.model");
 
// create a new movie
movieRouter.post("/create-movie",async(req,res)=>{
    const {title,description,rating, genre,releaseYear} = req.body;
    try {
        const movie = new MovieApiModel({
            title,
            description,
            genre,
            releaseYear,
            rating  
        });
        await movie.save();
        res.status(201).send("movie created successfully");
    } catch (error) {
        res.status(404).send(`error in creating movie : ${error}`);
    }
});
// Read all movies with filtering, sorting, and pagination

movieRouter.get("/get-movies",async(req,res)=>{
    const {q,title,rating,sortBy,page=1,limit=10} = req.query;
    const query = {};
    if(q) query.title = {$regex:q,$options:'i'};
    if(title) query.title = title;
    if(rating) query.rating = rating;

    const options = {
        sort:{},
        skip : (page-1)*limit,
        limit : parseInt(limit)

    };
    if(sortBy){
        const portion = sortBy.split(":");
        options.sort[portion[0]] = portion[1] === 'desc' ? -1 : 1;
    }
    try {
        const movies = await MovieApiModel.find(query,null,options);
        res.status(200).send(movies);
    } catch (error) {
        res.status(500).send(error);
    }
});
// read a movie by id
movieRouter.get("/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        const movie =await MovieApiModel.findById(id);
        if(!movie) return res.status(404).send("something went wrong");
            
        res.status(200).send(movie);
        
    } catch (error) {
        res.status(500).send(error);
    }
})
//updade movie by ID
movieRouter.patch("/update-movie/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        const movie =await MovieApiModel.findByIdAndUpdate(id,req.body);
        if(!movie) return res.status(404).send("something went wrong");
            
        res.status(200).send(movie);
        
    } catch (error) {
        res.status(500).send(error);
    }
});
// delete a movie by ID
movieRouter.delete("/delete-movie/:id",async(req,res)=>{
    const {id} = req.params;
    try {
        const movie =await MovieApiModel.findByIdAndUpdate(id);
        if(!movie) return res.status(404).send("something went wrong");
            
        res.status(200).send("movie deleted successfully");
        
    } catch (error) {
        res.status(500).send(error);
    }
});




module.exports = movieRouter;