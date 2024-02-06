const quiz = require('./quiz.json');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 6969;
app.use(express.static("build"));
app.use(cors());
console.log("server is running");
console.log("hello from server");
// console.log(quiz)


app.get('/select', async (req, res) => {
    try {
        res.send(quiz);
        console.log("funker");
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});

app.get('/red', async (req, res) => {
    try {
        res.send(" red");
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
});




app.listen(port, () => console.log(`Server started on port ${port}`));


