const mongoose = require("mongoose");
const movieApiSchema = mongoose.Schema({
    title: { type: String, required: true },
    rating: { type: Number, required: true },
    genre: { type: String, required: true },
    releaseYear: { type: Number, required: true },
    description: { type: String },
  });
    

const MovieApiModel= mongoose.model("Movie",movieApiSchema);
module.exports = MovieApiModel;