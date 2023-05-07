const express = require('express')
const dotenv = require('dotenv').config()
const cors = require('cors')
const { errorHandler } = require('./middleware/errorMiddleware')
const connectDB = require('./middleware/db')
const PORT = process.env.PORT

connectDB()

const app = express()
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: false }))

// Routes

app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/jobs', require('./routes/jobRoutes'))

app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`)
})
