// const quiz = require('./quiz.json');
const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT || 4200;
app.use(express.static("build"));
app.use(cors());
console.log("server is running");
console.log("hello from server");
// console.log(quiz)

const fs = require('fs');
// const { computeSSIM } = require('image-ssim');

//Bare at istedenfior å reade png-er tar du heller å comparer spektrogrammene laget av wavesurfer.js
const img1 = fs.readFileSync('spectrogram1.png');
const img2 = fs.readFileSync('spectrogram2.png');

computeSSIM(img1, img2, (err, score) => {
  if (err) {
    console.error('Error computing SSIM:', err);
    return;
  }

  console.log('SSIM:', score);

  const threshold = 0.9; //Hvor anderledes de er fra hverandre, Andreas
  if (score >= threshold) {
    console.log('Spectrograms are alike.');
  } else {
    console.log('Spectrograms are different.');
  }
});

const wavesurfer = WaveSurfer.create({
    container: '#waveform',
    waveColor: '#4F4A85',
    progressColor: '#383351',
    url: '/audio.mp3',
  })



app.listen(port, () => console.log(`Server started on port ${port}`));


