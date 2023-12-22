document.querySelector('#textOutput').disabled = true;

var isAlpha = function(ch){
  return /^[A-Z]$/i.test(ch);
}



function inputSubmit() {
  let mystr = '1 2 3 4 5 6 7 8 9 0'
  let iText = document.querySelector('#textInput').value;
  let incomingText = iText.replace(/\n/g, " ");


  // if (incomingText.includes('equipments') || incomingText.includes('Equipments')) {
  //   incomingText = incomingText.replace(/equipments/g, "equipment") 
  // }

  if (incomingText === '') {
    document.querySelector('#textOutput').value = '';
    document.querySelector('#textOutput').placeholder = 'Please Enter Text in Input Text Box with a Line seperator.';
    
    document.querySelector('#textOutput').disabled = true;
  } else if (isAlpha(incomingText[0]) ||incomingText[0] === ' ') {
    document.querySelector('#textOutput').placeholder = 'Error: No Line Seperator Found!';
    document.querySelector('#textOutput').disabled = true;
  } else if (mystr.includes(incomingText[0])) {
    document.querySelector('#textOutput').placeholder = 'Error: Numbered Line Seperators are not Supported yet.';
    document.querySelector('#textOutput').disabled = true;

  } else {
    let sep = incomingText[0];

    let out = incomingText.split(sep);
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

// const str = "Mr Red has a red house and a red car";
// const newText = str.replace(/red/g, "blue");
// console.log(newText); // Mr Blue has a blue house and a blue car



