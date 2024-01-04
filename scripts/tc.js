document.querySelector('#textOutput').disabled = true;

function capitalizeWords(str) {
  // convert the string to lowercase
  str = str.toLowerCase();
  // split the string into an array of words
  let words = str.split(" ");
  // loop through each word
  for (let i = 0; i < words.length; i++) {
    // get the first letter of the word
    let firstLetter = words[i][0];
    // capitalize the first letter
    firstLetter = firstLetter.toUpperCase();
    // replace the first letter of the word with the capitalized one
    words[i] = firstLetter + words[i].slice(1);
  }
  // join the words back into a string
  return words.join(" ");
}


function RefineString(rawStr) {
  
  if (typeof(rawStr) !== 'string') {
    return 'No string Provided';
  }

  let spaces = rawStr.split(' ');
  let sapceCount = spaces.length - 1;

  if (rawStr.length <= 1 || sapceCount === rawStr.length) {
    return 'Text Too Short or No Words found';
  } else {
    let refinedStr = '';
    let incomingText = '';
      if (rawStr.includes('\n')) {
        incomingText = rawStr.replace(/\n/g, ' ');
      } else {
        incomingText = rawStr;
      }

      if (incomingText.includes('')) {
        incomingText = incomingText.replace(//g, '-');
      }

    let raw = incomingText.split(' ');

    for (let i = 0; i < raw.length; i++) {
      if (raw[i] !== '') {
        refinedStr += raw[i] + ' ';
      }
    }
    return refinedStr;
  }
  
}

var isAlpha = function(ch){
  return /^[A-Z]$/i.test(ch);
}


function inputSubmit(txtIn) {
  let mystr = '1 2 3 4 5 6 7 8 9 0'
  let inpTextHere = txtIn;


  if (inpTextHere === '') {
    document.querySelector('#textOutput').value = '';
    document.querySelector('#textOutput').placeholder = 'Please Enter Text in Input Text Box with a Line seperator.';
    
    document.querySelector('#textOutput').disabled = true;
  } else if (isAlpha(inpTextHere[0]) ||inpTextHere[0] === ' ') {
    document.querySelector('#textOutput').placeholder = 'Error: No Line Seperator Found!';
    document.querySelector('#textOutput').disabled = true;
  } else if (mystr.includes(inpTextHere[0])) {
    document.querySelector('#textOutput').placeholder = 'Error: Numbered Line Seperators are not Supported yet.';
    document.querySelector('#textOutput').disabled = true;

  } else {
    let sep = inpTextHere[0];

    let out = inpTextHere.split(sep);
    let outText = ''

    for (let i = 1; i < out.length; i++) {
      if (i < out.length - 1) {
        outText += '• ' + out[i].trim()+ '\n';
      } else {
        outText += '• ' + out[i].trim()
      }
    }
    document.querySelector('#textOutput').disabled = false;


    document.querySelector('#textOutput').value = outText;
  }
  
}

let insertCount = 0;

function inputHandle(event) {
  
  let PlainString = RefineString(event.target.value);
  let trimmed = PlainString.trim()

  
  if (event.key === 'Insert') {
    insertCount += 1;
    
  } else {
    insertCount = 0;
  }

  
  if (insertCount === 2) {
    document.querySelector('#textOutput').value = '';
    event.target.value = '';
    document.querySelector('#characterCount').innerText = `Character Count: 0`;
    inputSubmit(PlainString);

  } else if (event.ctrlKey && event.key === 'Enter') {
    document.querySelector('#textOutput').value = '';
    let cOutput = capitalizeWords(trimmed);
    event.target.value = '';
    document.querySelector('#characterCount').innerText = `Character Count: 0`;
    
    if (cOutput === 'Text Too Short Or No Words Found') {
      document.querySelector('#textOutput').value = 'Text Too Short Or No Words Found';
    } else {
      document.querySelector('#textOutput').disabled = false;
      document.querySelector('#textOutput').value = cOutput;
    }

  }


};

function updateCount(event) {
  let chars = event.target.value;
  document.querySelector('#characterCount').innerText = `Character Count: ${chars.length}`; 
};
