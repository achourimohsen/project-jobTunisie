const express = require("express")
const app = express()
const morgan = require("morgan")
const bodyParser = require("body-parser")
require("dotenv").config()
var cors = require('cors')


// import routes
const authRoutes = require('./routes/authRoutes')
const userRoutes = require('./routes/userRoutes')
const jobTypeRoute = require('./routes/jobTypeRoutes')
const jobRoute = require('./routes/jobRoutes')


const errorHandler = require("./middleware/error")
const db = require("./config/db")

// database connection
db()

// middleware
app.use(morgan('dev'))
app.use(bodyParser.json({ limit: "5mb" }))
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true
}))

app.use(cors())


// routes middleware
app.use('/api', authRoutes)
app.use('/api', userRoutes)
app.use('/api', jobTypeRoute)
app.use('/api', jobRoute)

// error middleware
app.use(errorHandler)

// port
const port = process.env.PORT || 4444

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})

