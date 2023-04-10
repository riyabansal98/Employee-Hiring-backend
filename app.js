const express = new require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dbConfig = require('./constants/db.config')
require('dotenv').config();

mongoose.connect(dbConfig.DB_URL);
const db = mongoose.connection;
db.on("error", () => {
    console.log("error while connecting to db");
});
db.once("open", () => {
    console.log("connected to MongoDB");
});

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended: true}));

module.exports = app;