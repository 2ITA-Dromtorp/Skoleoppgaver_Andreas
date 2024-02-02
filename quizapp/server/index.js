const express = require('express')
const app = express()
const port = process.env.PORT || 6969
app.use(express.static("build"));

console.log("server is running")
console.log("hello from server");

app.listen(port, () => console.log(`Server started on port ${port}`))

