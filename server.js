const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send("Hello World");
});

const Port = 8000;

app.listen(Port, () => {
    console.log(`Server Started on Port ${Port}`);
})