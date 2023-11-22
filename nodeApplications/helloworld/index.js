const express = require('express')
const app = express()
const port = 3000

app.get('/', (request, response) => {
  response.send('Her kommer det SQL data istedenfor denne teksten')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})