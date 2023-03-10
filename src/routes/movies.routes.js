const express = require("express");
const router = express.Router();
const Movie = require("../models/movie.model");

router.get("/", async (req, res, next) => {
  try {
    const movies = await Movie.find();
    return res.status(200).json(movies);
  } catch (error) {
    return next(error);
  }
});

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movie = await Movie.findById(id);
    return res.status(200).json(movie);
  } catch (error) {
    return next(error);
  }
});

router.get("/title/:title", async (req, res, next) => {
  const { title } = req.params;
  try {
    const movie = await Movie.find({ title: title });
    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.status(404).json("No movie found");
    }
  } catch (error) {
    return next(error);
  }
});

router.get("/genre/:genre", async (req, res, next) => {
  const { genre } = req.params;
  try {
    const movie = await Movie.find({ genre: genre });
    if (movie) {
      return res.status(200).json(movie);
    } else {
      return res.setMaxListeners(404).json("No movie found");
    }
  } catch (error) {
    return next(error);
  }
});

router.get("/greaterThanEqual/:year", async (req, res, next) => {
  const { year } = req.params;
  try {
    const movie = await Movie.find({ year: { $gte: year } });
    return res.status(200).json(movie);
  } catch (error) {
    return next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const newMovie = new Movie(req.body);
    const createdMovie = await newMovie.save();
    return res.status(200).json(createdMovie);
  } catch (error) {
    return next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Movie.findByIdAndDelete(id);
    return res.status(200).json("Movie deleted 🗑️");
  } catch (error) {
    return next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const movieModified = new Movie(req.body);
    movieModified._id = id;
    const movieUpdate = await Movie.findByIdAndUpdate(id, movieModified);
    return res.status(200).json(movieUpdate);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
