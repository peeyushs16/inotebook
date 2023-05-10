const connectToMongo = require('./db');
const express = require('express')

connectToMongo();

const app = express()
const port = 5000

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World, welcome to inotebook!')
})

app.use('/api/createUser', require('./routes/auth.js'))
// app.use('/api/notes', require('./routes/notes.js'))

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})