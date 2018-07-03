const express = require('express')
const bodyParser = require('body-parser')
const gJ = require('./controllers/jokes_controllers')

const app = express()
app.use(bodyParser.json())

const PORT = 4000

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`))

app.post('/api/jokes', gJ.create)

app.get('/api/jokes', gJ.read)

app.delete('/api/jokes/', gJ.delete)

app.put('/api/jokes', gJ.update)