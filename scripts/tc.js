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
      
      if (incomingText.includes('	')) {
        incomingText = incomingText.replace(/	/g, ' ');
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
  document.querySelector('#copyButton').innerText = 'Copy'
  document.querySelector('#copyButton').classList.remove('btn-success')
  document.querySelector('#copyButton').classList.add('btn-primary')
};


function SpecialCase() {
  let inputValue = document.querySelector('#textInput').value;
  
  let mysep = '\n'+inputValue[0];

  let plainVal = REnRP(inputValue);

  plainVal = '\n' + plainVal;

  let outList = plainVal.split(mysep);

  let outVal = '';

  for (let j = 0; j < outList.length; j++) {
    if (outList[j] !== '') {
      outVal += '&%$!' + outList[j].trim() + '\n';
    }
    
  }
  
  outVal = outVal.replace(/\n/g, ' ');

  outVal = outVal.split('&%$!')

  let finalVal = ''

  
  for (let z = 1; z < outVal.length; z++) {
    
    if (z !== outVal.length - 1) {
      finalVal += `- ${outVal[z]}\n`;
    } else {
      finalVal += `- ${outVal[z]}`;
    }
  }

  document.querySelector('#textOutput').disabled = false;
  document.querySelector('#textOutput').value = finalVal;
  
}


// function handleNLines() {
//   let textIn = document.querySelector('#textInput').value;
//   let refinedTxt = '\n' + REnRP(textIn)

//   let dsep = ''

//   if (areAllNumbers(refinedTxt.slice(1, 3))) {
    

//   } else if (areAllNumbers(refinedTxt.slice(1, 2))) {
//     console.log('That is a Number')
//   }
  
// }

// function areAllNumbers(str) {
//   return /^\d+$/.test(str);
// }


function copyText() {
  // navigator.clipboard.writeText('Hello Mars!')
  let boxVal = document.querySelector('#textOutput').value
  
  if (boxVal.length !== 0) {
    navigator.clipboard.writeText(boxVal)
    document.querySelector('#textOutput').value = ''
    document.querySelector('#copyButton').innerText = 'Copied'
    document.querySelector('#copyButton').classList.remove('btn-primary')
    document.querySelector('#copyButton').classList.add('btn-success')
  } 
}


function REnRP(text) {
  let final = text;

  if (final.includes('')) {
    final = final.replace(//g, '-');
  }
  
  if (final.includes('	')) {
    final = final.replace(/	/g, '');
    
  }
  
  if (final.includes('  ')) {
    final = final.replace(/  /g, ' ');
    
  }


  let tspaces = final.split(' ');

  let wspace = '';

  for (let i = 0; i < tspaces.length; i++) {
    if (tspaces[i] !== '') {
      wspace += tspaces[i] + ' ';
    }
    
  }

  return wspace;
}