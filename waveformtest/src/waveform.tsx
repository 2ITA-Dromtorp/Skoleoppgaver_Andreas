const fs = require('fs');
const { computeSSIM } = require('image-ssim');

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

