require("dotenv").config()
const express = require("express")
require('./src/config/db')

const cors = require('cors')
const app = express()

app.use(cors())
app.use(express.json())

const port = process.env.APP_PORT | 7000

const bookRoute = require("./src/routes/book.routes")
const userRoute = require("./src/routes/user.routes")


app.use('/api/v1/book',bookRoute)
app.use('/api/v1/user',userRoute)

 app.listen(port, ()=> {
    console.log(`server is running on ${port}`);
 })