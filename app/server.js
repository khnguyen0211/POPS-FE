require('dotenv').config()
const express = require('express')
const router = require('./routers')
const app = express()
const port = process.env.PORT || 3001
const path = require('path')
const bodyParser = require("body-parser");
const cors = require('cors')
const cookieParser = require('cookie-parser')

app.use(cors())

app.use(cookieParser())

app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({ extended: true }));

app.use(bodyParser.json());

app.set('view engine', 'pug')

app.set('views', path.join(__dirname, '../public'))

router(app);

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`)
})