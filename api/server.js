const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require('express-session')
const knexSessionConnect = require('connect-session-knex')
const knexSessionStore = knexSessionConnect(session)
// or const knexSessionConnect = require('connect-session-knex')(session)

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

  // changes when we connected our session on the db
  store: new knexSessionStore({
    knex: require('../database/connection'), 
    tablename: 'sessions',
    sidfieldname: 'sid',
    createtable: true,
    clearInterval: 100*100*100
  })
}

const usersRouter = require("../users/users-router.js");
const authRouter = require('../auth/auth-router')

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig))

server.use("/api/users", usersRouter);
server.use('/api/auth', authRouter)

server.get("/", (req, res) => {
  res.json({ api: "up" });
});

module.exports = server;
