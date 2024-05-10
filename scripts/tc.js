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


function ProjectPromptF() {
  let PPtxt = `Below is a python dictionary with comments as instructions explaining how to extract project information:
  projects =   [ {
          "Project Name": "Example name", # This should not exceed beyond 60 characters, if project name is too long use a short meaningful suitable name. If you cannot find a suitable name at all, then default it to 'Project'.
          "Role": "Engineer", # this should not exceed 35 characters, if so choose a short suitable role, if role not provided, default it to 'Engineer'.
          "Duration (Months)": 0, # a number, if written as period, example: [Nov 2021 to dec 2022] convert it into months. if no duration is provided, you can leave this as an empty string like: ''.
          "Client": "", # this should not exceed 60 characters. If not provided, leave it as an empty string.
          "Location": "", # this should not exceed 60 characters. If not provided, leave it as an empty string.
          "Description": [
              "first point",
              "second point",
              "third point"
          ] # if possible make description an array of points. Any other information other then required for fields, can be filled here in Description.
      } ]
      # for multiple projects make it an array of dictionaries. Like: projects = [{project 1 info}, {project 2 info}, {..and so on)]
      # Wherever necessary make text corrections.
  
Extract Project information For Below Projects:
[Default Role to '' for all below projects]
`
  navigator.clipboard.writeText(PPtxt)

  let ppbtn = document.getElementById('ppcopy')
  ppbtn.innerText = 'pp Copied'
  ppbtn.classList.remove('btn-light')
  ppbtn.classList.add('btn-success')
  
}

function DefaultTxtF() {
  let dtxt = `Previous prompt:
  `
  navigator.clipboard.writeText(dtxt)

  let dtxtbtn = document.getElementById('DefTxtCopy')
  dtxtbtn.innerText = 'PP Copied'
  dtxtbtn.classList.remove('btn-light')
  dtxtbtn.classList.add('btn-success')
}


function BulletPointsPropmpt() {
  let pointspr = `correct below text wherever necessary and make bullet points:`
  navigator.clipboard.writeText(pointspr)

  let ptscpybtn = document.getElementById('PointsPrpt')
  ptscpybtn.innerText = 'Copied!'
  ptscpybtn.classList.remove('btn-light')
  ptscpybtn.classList.add('btn-success')
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
    document.querySelector('#textOutput').placeholder = 'Error: For Numbered Line Seperators Use "Num Ln" button.';
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


function SpecialCase(seperator) {
  let inputValue = document.querySelector('#textInput').value;
  
  let mysep = '\n'+inputValue[0];

  let plainVal = REnRP(inputValue);

  plainVal = '\n' + plainVal;
  let regx = new RegExp(mysep, 'g');
  plainVal = plainVal.replace(regx, '&$*')
  plainVal = RefineString(plainVal)

  let outList = plainVal.split('&$*');
  
  let finalVal = ''

  if (seperator === '-') {
    
    for (let k = 1; k < outList.length; k++) {
      if (k < outList.length - 1 && outList[k] != '') {
        finalVal += '- ' + outList[k].trim() + '\n'
      }
      else {
        finalVal += '- ' + outList[k].trim()
      }
    }

  } else if (seperator === '•') {
    for (let m = 1; m < outList.length; m++) {
      if (m < outList.length - 1 && outList[m] != '') {
        finalVal += '• ' + outList[m].trim() + '\n'
      }
      else {
        finalVal += '• ' + outList[m].trim()
      }
      
    }
  }
  

  document.querySelector('#textOutput').disabled = false;
  document.querySelector('#textOutput').value = finalVal;
  document.querySelector('#textInput').value = ''
  
}


function handleNLines() {
  let textIn = document.querySelector('#textInput').value;
  if (textIn == '') {
    return 0
  }
  let refinedTxt = '\n' + REnRP(textIn)
  refinedTxt = refinedTxt.split('\n')
  alterText = ''

  for (let j = 1; j < refinedTxt.length; j++) {
    if (refinedTxt[j].trim() !== '' && refinedTxt[j] !== ''){
      alterText += `\n${refinedTxt[j].trim()}`
    }
  }


  let plainTxt = ''
  let gSlen = alterText.slice(0, 3).match(/[0-9]/g).length
  let gNChar = alterText[gSlen+1]


  alterText = alterText.split('\n')

  for (let i = 0; i < alterText.length; i++) {

    let slen = 0

    if (alterText[i].slice(0, 3).match(/[0-9]/g)) {
      slen = alterText[i].slice(0, 3).match(/[0-9]/g).length
    }
    
    let localNChar = alterText[i][slen]
  
    if (slen !== 0 && gNChar === localNChar) {
      let tempTxt = `&*#${alterText[i]}`
      plainTxt += tempTxt
    } else {
      plainTxt += ' ' + alterText[i]
    }
    
  }
  plainTxt = plainTxt.split('&*#')
  let outputTxt = ''

  for (let o = 1; o < plainTxt.length; o++) {
    if (o === 1) {
      outputTxt += plainTxt[o]
    } else {
      outputTxt += '\n' + plainTxt[o]
    }
  }

  document.querySelector('#textOutput').disabled = false;
  document.querySelector('#textOutput').value = outputTxt;
  document.querySelector('#textInput').value = ''
  
}

function planeText() {
  let textIn = document.querySelector('#textInput').value;
  if (textIn == '') {
    return 0
  }
 let planeTxt = REnRP(textIn)
 document.querySelector('#textOutput').disabled = false;
 document.querySelector('#textOutput').value = planeTxt;
 document.querySelector('#textInput').value = '';
}


function copyText() {
  // navigator.clipboard.writeText('Hello Mars!')
  let boxVal = document.querySelector('#textOutput').value
  
  if (boxVal.length !== 0) {
    navigator.clipboard.writeText(boxVal)

    document.querySelector('#textOutput').value = ''
    document.querySelector('#copyButton').innerText = 'Copied'
    document.querySelector('#copyButton').classList.remove('btn-primary')
    document.querySelector('#copyButton').classList.add('btn-success')

    let ppClasses = document.getElementById('ppcopy')
    let dtClasses = document.getElementById('DefTxtCopy')
    let poiClasses = document.getElementById('PointsPrpt')
    document.querySelector('#textOutput').placeholder = ':)'

    let BtnElements = [ppClasses, dtClasses, poiClasses]

    for (let x = 0; x < BtnElements.length; x++) {
      if (BtnElements[x].classList[1] == 'btn-success') {
        console.log('entered in  condition')
        BtnElements[x].classList.remove('btn-success')
        BtnElements[x].classList.add('btn-light')
        if (x == 0) {
          BtnElements[x].innerText = 'Project Prompt'
        }
        else if (x == 1) {
          BtnElements[x].innerText = 'PP Txt'
        }
        else{
          BtnElements[x].innerText = 'Points Prompt'
        }
      }
    }
  } 
}


function REnRP(text) {
  let final = text;

  final = final.replace(/([,&]|and(?=[A-Z]))/g, "$1 ");

  if (final.includes('')) {
    final = final.replace(//g, '-');
  }
  
  if (final.includes('  ')) {
    final = final.replace(/ /g, ' ');
  }
  
  if (final.includes('  ')) {
    final = final.replace(/  /g, ' ');
  }

  if (final.includes('india')) {
    final = final.replace(/india/g, 'India');
  }
  
  if (final.includes('dubai')) {
    final = final.replace(/dubai/g, 'Dubai');
  }


  unusualTxt = ['abudhabi', 'Abudhabi', 'AbuDhabi']

  for (let p = 0; p < unusualTxt.length; p++) {
    if (final.includes(unusualTxt[p])) {
      let regx = new RegExp(unusualTxt[p], 'g');
      final = final.replace(regx, 'Abu Dhabi')
    }
    
  }

  if (final.includes(' , ')) {
    final = final.replace(/ , /g, ', ');
  }


  let tspaces = final.split(' ');

  let wspace = '';

  for (let i = 0; i < tspaces.length; i++) {
    if (tspaces[i] !== '') {
      wspace += tspaces[i] + ' ';
    }
    
  }

  return wspace.trim();
}