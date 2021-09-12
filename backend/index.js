const connectToMongo = require('./db')
const express = require('express')
const app = express()
const port = 5000
var cors = require('cors')


app.use(cors())
connectToMongo();

app.use(express.json())
// Available Routes
app.use('/api/auth', require('./routes/auth')) 
app.use('/api/notes', require('./routes/notes'))

app.listen(port, () => {
    console.log(`INotebook backend listening at http://localhost:${port}`)
}) 