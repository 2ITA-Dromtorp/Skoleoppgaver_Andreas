function encrypt(event) {
  event.preventDefault()
  let text = document.querySelector(".passwordInput").value;
  console.log(text)
  console.log("fesdio")
  let myArray = text.split("");


  const replacementMap = {
    'a': 'gif2us4',
    'b': 'ygoher0u7',
    'c': 'f3r3rTn1',
    'd': 'vLk7r5',
    'e': 'pZafx9n3',
    'f': 'qR24fte1',
    'g': 'dXs1hgen2',
    'h': 'bHprw44r8',
    'i': 'mJw8j6',
    'j': 'lCn5egr9',
    'k': 't52vfh0s3',
    'l': 'nPa2htdj7',
    'm': 'aKu3ggr2',
    'n': 'oQt7u4',
    'o': 'cwEr465',
    'p': 'eWfw634s6f1',
    'q': 'zTy8r9',
    'r': 'jG6jfb1b2',
    's': 'kFgh2m6',
    't': 'hLi328',
    'u': 'xgwMo9n7',
    'v': 'uNfgd543',
    'w': 'sOywtggb4j5',
    'x': 'wVqfhtt0m2',
    'y': 'iBf6gdm9',
    'z': 'rAbcsxp74',
    'A': 'GwgryeUjy6',
    'B': 'Yrbwevh0wtk1',
    'C': 'FwsbsdTjty9',
    'D': 'Vabrw7eg3',
    'E': 'Psv9E5ws',
    'F': 'Q6g6Fge58',
    'G': 'Dvd441jy4',
    'H': 'Bjt4ger66',
    'I': 'Mrh8yre3',
    'J': 'LCc5nuh9',
    'K': 'TEmju0dr7',
    'L': 'Nru62mj5',
    'M': 'AmU3w4er1',
    'N': 'OeT77mu4',
    'O': '6Ehfrfwq4jy9',
    'P': 'eWy466e5r6',
    'Q': 'ZeY568ny2',
    'R': 'Jn4B1e4r8',
    'S': 'KkHqfw2yhf3',
    'T': 'huI3daku7',
    'U': 'XnO9Uurt',
    'V': 'uNfwwD5nuf4',
    'W': 'SOY4r5j1',
    'X': 'WVQ0hy55',
    'Y': 'IBF6h65e7',
    'Z': 'RAP7nyp5wf3',
    '0': 'vNtgsZ5gA',
    '1': 'pYbWgf5B',
    '2': 'lXcV!C',
    '3': 'oUqedRbt3wr4D',
    '4': 'eTsQgtpaE',
    '5': 'jArPbtpseF',
    '6': 'kBsOvtkovsG',
    '7': 'mCfNbtypH',
    '8': 'iDgMqwebte4I',
    '9': 'nHhkLbtkarJ',
    '?': 'aJjcvJ3srkb5',
    '!': 'bKlLd1f'
    // Only allowing ? and ! as special characters
  };

  for (let i = 0; i < myArray.length; i++) {
    if (myArray[i] !== " ") {
      const replacement = replacementMap[myArray[i]];
      if (replacement) {
        myArray[i] = replacement;
      } else {
        alert("DO NOT USE SPECIAL CHARACTERS EXCEPT FOR ! AND ?. ONLY USE LETTERS IN THE ENGLISH ALPHABET")
        myArray = ""
      }
    } else {
      alert("Do not include spaces");
      return; // Stop encryption process if a space is found
    }
  }
  console.log(myArray)
  document.getElementById("unencryptedPassword").innerHTML = "U-kryptert passord: " + text;
  document.getElementById("encryptedPassword").innerHTML = "Kryptert passord: " + myArray.join("");
}


document.querySelector('.formDiv').addEventListener('submit', encrypt);