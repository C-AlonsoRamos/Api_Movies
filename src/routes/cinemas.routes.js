const express = require("express");
const Cinema = require("../models/cinema.model");
const router = express.Router();

// traer todos los cines:
router.get("/", async (req, res, next) => {
  try {
    const cinemas = await Cinema.find().populate("movies");
    return res.status(200).json(cinemas);
  } catch (error) {
    return next(error);
  }
});

//Crear un nuevo cine:
router.post("/add-cinema", async (req, res, next) => {
  try {
    const newCinema = new Cinema(req.body);
    const createdCinema = await newCinema.save();
    return res.status(201).json(createdCinema);
  } catch (error) {
    return next(error);
  }
});

// Empujar una nueva pelicula al cine que indique:

router.put("/push-movie", async (req, res, next) => {
  try {
    const { movieID } = req.body;
    const { cinemaID } = req.body;
    const updatedCinema = await Cinema.findByIdAndUpdate(
      cinemaID,
      { $push: { movies: movieID } },
      { new: true }
    );
    return res.status(200).json(updatedCinema);
  } catch (error) {
    return next(error);
  }
});

// Borrar el cine:
router.delete("/delete-cinema/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await Cinema.findByIdAndDelete(id);
    return res.status(200).json("Cinema deleted 🗑️");
  } catch (error) {
    return next(error);
  }
});

// Editar cines:

router.put("/updated-cinema/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const cinemaModified = new Cinema(req.body);
    cinemaModified._id = id;
    const foundCinema = await Cinema.findById(id);
    cinemaModified.movies = [...cinemaModified.movies, ...foundCinema.movies];
    const cinemaUpdated = await Cinema.findByIdAndUpdate(id, cinemaModified);
    return res.status(200).json(cinemaUpdated);
  } catch (error) {
    return next(error);
  }
});

module.exports = router;
