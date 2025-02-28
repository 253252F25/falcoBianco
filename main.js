const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
  res.end("<input type='password'>")
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
