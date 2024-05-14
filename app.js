const express = require('express');
const app = express();
const dotenv = require("dotenv").config();
const PORT = process.env.PORT;

app.get('/', (req, res) => {
  res.send('Ecommerce')
})

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})
