const express = require("express");
const dotenv = require("dotenv");
const connect = require("./src/utils/database");
dotenv.config();

const server = express();

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT;
connect();

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT} 🚀`);
});
