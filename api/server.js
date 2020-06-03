const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const sessions = require('express-sessions')

const sessionConfig = {
  name: 'session',
  secret: 'secret',
  cookie: {
    maxAge: 100 * 100 * 100,
    secure: false,
    httpOnly: true
  }, 
  resave: false,
  saveUninitialized: false,

}

const usersRouter = require("../users/users-router.js");
const authRouter = require('../auth/auth-router')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server/this.use(sessions(sessionConfig))

server.use("/api/users", usersRouter);
server.use('/api/auth', authRouter)

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
