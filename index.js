const express = require("express");
const dotenv = require("dotenv");
const connect = require("./src/utils/database");
dotenv.config();

const server = express();
const router = express.Router();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT;
connect();

const moviesRoutes = require("./src/routes/movies.routes");
server.use("/api/movies", moviesRoutes);

const cinemaRoutes = require("./src/routes/cinemas.routes");
server.use("/api/cinema", cinemaRoutes);

server.use("*", (req, res, next) => {
  const error = new Error("Route not found");
  error.status = 404;
  next(error);
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🚀`);
});
