const express = require('express');
require('dotenv').config();
const mongoose = require('mongoose');

const app = express();
const Port = process.env.PORT;

app.get('/', (req, res) => {
    res.send("Hello World");
});

app.listen(Port, () => {
    console.log(`Server Started on Port ${Port}`);
});

mongoose.connect(process.env.DB)
    .then(() => {
        console.log("Database Connected");
    })
    .catch((error) => {
        console.log("DB Connection Failed:", error);
    });
