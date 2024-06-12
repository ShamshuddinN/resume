document.querySelector('#textOutput').disabled = true;

function capitalizeWords(str) {
  str = str.toLowerCase();
  let words = str.split(" ");
  for (let i = 0; i < words.length; i++) {
    let firstLetter = words[i][0];
    firstLetter = firstLetter.toUpperCase();
    words[i] = firstLetter + words[i].slice(1);
  }
  return words.join(" ");
}


function UnusualDash(Dtext) {
  if (Dtext.includes('‐')) {
    Dtext = Dtext.replace(/‐/g, '-');
  }
  
  if (Dtext.includes('–')) {
    Dtext = Dtext.replace(/–/g, '-');
  }

  return Dtext;
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

    rawStr = UnusualDash(rawStr)

    if (rawStr.includes('\n')) {
      incomingText = rawStr.replace(/\n/g, ' ');
    } else {
      incomingText = rawStr;
    }


    let raw = incomingText.split(' ');

    for (let i = 0; i < raw.length; i++) {
      if (raw[i] !== '') {
        refinedStr += raw[i] + ' ';
      }
    }
    refinedStr = REnRP(refinedStr);
    return refinedStr;
  }
  
}

var isAlpha = function(ch){
  return /^[A-Z]$/i.test(ch);
}

function isNumeric(value) {
  return !isNaN(value);
}

function emailHandle() {
  let mailIn = document.querySelector('#textInput').value;
  if (mailIn.includes('@')) {
    mailIn = mailIn.toLowerCase();
    mailIn = mailIn.replace(/ /g, '');
    // mailIn = mailIn.replace(//g, '');
    mailIn = mailIn.replace(/gmaii/g, 'gmail');
    mailIn = mailIn.replace(/gamil/g, 'gmail');
    mailIn = mailIn.replace(/gmali/g, 'gmail');



    navigator.clipboard.writeText(mailIn);
    document.getElementById('emailButton').classList.remove('btn-outline-light');
    document.getElementById('emailButton').classList.add('btn-success');
    document.getElementById('emailButton').innerText = 'Copied!'
    document.querySelector('#textInput').value = '';

  } 
}


function BetaFunction() {
  let betaInput = document.querySelector('#textInput').value;
  if (betaInput.length < 3) {
    return 0
  }

  betaInput = UnusualDash(betaInput)

  betaInput = REnRP(betaInput)
  betaInput = betaInput.split('\n');
  let betaProcess = ''

  for (let k = 0; k < betaInput.length; k++) {
    
    if (betaInput[k] != '') {
      let wordsCount = betaInput[k].split(' ');
      if (wordsCount.length > 2) {
        betaProcess += `${betaInput[k]}\n`
      } 
      else {
        if (betaInput[k].slice(-1) == '.') {
          betaProcess += `${betaInput[k]}\n`
        }
        else {
          betaProcess += `${betaInput[k]}.\n`
        }
      }
    }
  }


  let betaOut1 = ''

  betaProcess = betaProcess.split('.\n');


  for (let s = 0; s < betaProcess.length; s++) {
    if (betaProcess[s] != '') {
      betaOut1 += `₹$${betaProcess[s].trim()}.\n`;
    }
  }

  betaOut1 = betaOut1.replace(/\n/g, ' ');
  betaOut1 = betaOut1.split('₹$');

  let betaOut2 = ''

  for (let g = 0; g < betaOut1.length; g++) {
    if (betaOut1[g] != '' && betaOut1[g] != '.') {
      betaOut2 += `• ${betaOut1[g].trim()}\n`
    }
  }

  betaOut2 = betaOut2.trim()
  
  // betaProcess = betaProcess.replace(/([0-9])\.([0-9])/g, '$1d%t$2');


  // betaOut1 = betaOut1.replace(/d%t/g, '.');
  
  document.querySelector('#textOutput').value = betaOut2;
  document.querySelector('#textInput').value = '';
  document.querySelector('#textOutput').disabled = false
}

function formatText() {
  let inputText = document.querySelector('#textInput').value;
  if (inputText.length <= 5) {
    return 0
  }

  inputText = inputText.split('\n');
  
  let outputText = ''
  
  for (let v = 0; v < inputText.length; v++) {
    if (inputText[v] != '') {
      outputText += '%$@' + inputText[v];
    }
  }

  document.querySelector('#textOutput').value = outputText;
  document.querySelector('#textInput').value = '';

}


function CertificationsFormat() {
  let inText = document.querySelector('#textInput').value
  inText = inText.split('\n');

  let certificatesArray = []
  let caughtMail = ''
  let omitted = []
  for (let g = 0; g < inText.length; g++) {
    if (inText[g].includes('@')) {
      caughtMail += inText[g].trim()
    } 
    else if (inText[g].length > 2 && inText[g].length <= 100) {
      certificatesArray.push(REnRP(inText[g].trim()))
    }
    else if (inText[g].length > 2) {
      omitted.push(REnRP(inText[g].trim()))
    }

    const arrAsString = JSON.stringify(certificatesArray);
    let finalOutput = ''
    finalOutput += `certifications = ${arrAsString}` + '\n' + `mail = '${caughtMail}'\n`;

    document.querySelector('#textOutput').value = finalOutput;
    document.querySelector('#textOutput').disabled = false
    document.querySelector('#textInput').value = '';
  }
  
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

  let ppbtn = document.getElementById('ppcopy');
  ppbtn.innerText = 'pp Copied'
  ppbtn.classList.remove('btn-light');
  ppbtn.classList.add('btn-success');
  
}


function BulletPointsPropmpt() {
  let pointspr = `correct below text wherever necessary and make bullet points:`
  navigator.clipboard.writeText(pointspr)

  let ptscpybtn = document.getElementById('PointsPrpt');
  ptscpybtn.innerText = 'Copied!'
  ptscpybtn.classList.remove('btn-light');
  ptscpybtn.classList.add('btn-success');
}

function inputSubmit(txtIn, passText) {
  let mystr = '1 2 3 4 5 6 7 8 9 0'
  let inpTextHere = txtIn;


  let returnVar = 0
  if (passText != '' && passText.length > 2) {
    inpTextHere = passText; // still needs work
    returnVar = 1
  }


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

    if (returnVar) {
      return outText;
    } else {
      document.querySelector('#textOutput').disabled = false;
      document.querySelector('#textOutput').value = outText;  
    }

  }
  
}

let insertCount = 0;
let controlCount = 0;
let shiftCount = 0;
function inputHandle(event) {
  
  if (event.key == 'Control') {
    controlCount += 1
  }
  
  if (event.key == 'Shift') {
    shiftCount += 1
  }
  
  
  if (event.key === 'Insert') {
    insertCount += 1;
    
  } else {
    insertCount = 0;
  }


  // new code
  if (event.ctrlKey && event.key == 'q') {
    controlCount = 0
    shiftCount = 0
    let PlainString = document.querySelector('#textInput').value;
    event.target.value = ''

    if (PlainString.length > 5) {
      PlainString = UnusualDash(PlainString)
      PlainString = PlainString.split('\n');

      let formattedText = '';
      let theHeaders = []
      let theDescriptions = []
      let descriptionText = ''


      // Creating Header and Description
      for (let x = 0; x < PlainString.length; x++) { 
        if  (PlainString[x].length > 2 && PlainString[x].includes(':')) {
          let tempStr = PlainString[x].trim()
          if (isAlpha(tempStr[0]) && isUpperCase(tempStr[0])) {
            theHeaders.push(tempStr);
            if (descriptionText != '') {
              theDescriptions.push(descriptionText.trim())
              descriptionText = ''
            }
            
          } else {
            descriptionText += PlainString[x] + ' \n'
          }
          
        } else if (PlainString[x].length > 2) {
          descriptionText += PlainString[x] + ' \n' 
        }
      }
      if (descriptionText.length > 2) {
        theDescriptions.push(descriptionText.trim())
      }




// to be improved
      if (theHeaders.length != 0 && theDescriptions.length != 0) {
        if (theHeaders.length == theDescriptions.length) {
          for (let txt = 0; txt < theHeaders.length; txt++) {
            formattedText += '\n\n' + theHeaders[txt].trim();
            if (theDescriptions[txt][0] == '-') {
              formattedText += '\n' + SpecialCase(seperator = '•', passText = theDescriptions[txt].trim()); //working
            } else if (isNumeric(theDescriptions[txt][0])) {
              formattedText += '\n' + handleNLines(passText = theDescriptions[txt].trim()); //working
            } else if (isAlpha(theDescriptions[txt][0]) == false) {
              formattedText += '\n' + inputSubmit(txtIn = '', passText = RefineString(theDescriptions[txt].trim()) ); //working
            } else if (isAlpha(theDescriptions[txt][0])) {
              formattedText += '\n' + planeText(passText = RefineString(theDescriptions[txt].trim())); //working
            }
          }
        }
      }
// to be improved

      document.querySelector('#textOutput').disabled = false;
      document.querySelector('#textInput').value = ''
      document.querySelector('#textOutput').value = formattedText.trim();
      

    }



  }
  // new code


  if (insertCount === 2) {
    let PlainString = RefineString(event.target.value);  
    document.querySelector('#textOutput').value = '';
    event.target.value = '';
    document.querySelector('#characterCount').innerText = `Character Count: 0`;
    inputSubmit(txtIn = PlainString, passText = '');
    // Work underway here

// Capitalize Each Word Replacements: 

  } else if (event.ctrlKey && event.key === 'Enter') {
    document.querySelector('#textOutput').value = '';
    let PlainString = RefineString(event.target.value);
    let trimmed = PlainString.trim()  

    let regex11 = /\([a-zA-Z]/;
    let regex22 = /\/[a-zA-Z]/;
    if (regex11.test(trimmed)) {
      trimmed = trimmed.replace(/\(([^)]+)/g, '( $1');
    }

    if (regex22.test(trimmed)) {
      trimmed = trimmed.replace(/\/([^)]+)/g, '/ $1');
    }
    
    
    trimmed = trimmed.replace(/([A-Za-z0-9])-/g, '$1 -');
    trimmed = trimmed.replace(/-([A-Za-z0-9])/g, '- $1');

    
    // final = final.replace(/([,&]|and(?=[A-Z]))/g, "$1 ");
    let cOutput = capitalizeWords(trimmed);
    event.target.value = '';
    document.querySelector('#characterCount').innerText = `Character Count: 0`;

    cOutput = cOutput.replace(/Hvac /g, 'HVAC ');
    cOutput = cOutput.replace(/ Hvac/g, ' HVAC');
    cOutput = cOutput.replace(/ Mep/g, ' MEP');
    cOutput = cOutput.replace(/ Hse /g, ' HSE ');
    cOutput = cOutput.replace(/ Hse/g, ' HSE');
    cOutput = cOutput.replace(/Wordpress/g, 'WordPress');
    cOutput = cOutput.replace(/Mep /g, 'MEP ');
    cOutput = cOutput.replace(/^Ndt /g, 'NDT ');
    cOutput = cOutput.replace(/ Ndt /g, ' NDT ');
    cOutput = cOutput.replace(/ Ndt$/g, 'NDT ');
    cOutput = cOutput.replace(/ Bms /g, ' BMS ');
    cOutput = cOutput.replace(/Co Ordinator/g, 'Coordinator');
    cOutput = cOutput.replace(/Bms /g, 'BMS ');
    cOutput = cOutput.replace(/ And /g, ' & ');
    cOutput = cOutput.replace(/ Of /g, ' of ');
    cOutput = cOutput.replace(/ Qc/g, ' QC');
    cOutput = cOutput.replace(/Qc /g, 'QC ');
    cOutput = cOutput.replace(/Asst\.engineer/g, 'Assistant Engineer');
    cOutput = cOutput.replace(/Asst\. Engineer/g, 'Assistant Engineer');
    cOutput = cOutput.replace(/ Hr /g, ' HR ');
    cOutput = cOutput.replace(/Qa\//g, 'QA/');
    cOutput = cOutput.replace(/ Csu /g, ' CSU ');
    cOutput = cOutput.replace(/Equipments/g, 'Equipment');
    cOutput = cOutput.replace(/Equipment's/g, 'Equipment');
    cOutput = cOutput.replace(/E - Commerce/g, 'E-Commerce');
    cOutput = cOutput.replace(/ Csu/g, ' CSU');
    cOutput = cOutput.replace(/ Icu/g, ' ICU');
    cOutput = cOutput.replace(/ Icu /g, ' ICU ');
    cOutput = cOutput.replace(/Cctv /g, 'CCTV ');
    cOutput = cOutput.replace(/ Cctv/g, ' CCTV');
    cOutput = cOutput.replace(/ Pmc/g, ' PMC');
    cOutput = cOutput.replace(/Front - End/g, 'Front-End');
    cOutput = cOutput.replace(/ Pmc /g, ' PMC ');
    cOutput = cOutput.replace(/Qc\//g, 'QC/');
    cOutput = cOutput.replace(/\( /g, '(');
    cOutput = cOutput.replace(/ \)/g, ')');
    cOutput = cOutput.replace(/\/ /g, '/');
    cOutput = cOutput.replace(/\)([0-9a-zA-Z])/g, ') $1');


    
    let sc2 = 'Qa/ Qc'
    let regx2 = new RegExp(sc2, 'g');
    
    cOutput = cOutput.replace(regx2, 'QA/QC');
    cOutput = cOutput.replace(/Qa-qc/, 'QA/QC');

    
    
    if (cOutput === 'Text Too Short Or No Words Found') {
      document.querySelector('#textOutput').value = 'Text Too Short Or No Words Found';
    } else {
      document.querySelector('#textOutput').disabled = false;
      document.querySelector('#textOutput').value = cOutput;
    }

  }
  
  else if (event.shiftKey && event.key == '~') {
    GPTCorrection()
    document.querySelector('#textInput').value = ''

  }
  

};


function isUpperCase(char) {
  return char === char.toUpperCase() && char !== char.toLowerCase();
}

function GPTCorrection() {
  let inputValue = document.querySelector('#textInput').value;

  inputValue = inputValue.split('\n');
  let outValue = '';

  let changeCount = 0
  let CurrentState = 1

  for (let w = 0; w < inputValue.length; w++) {
    let incomingState = 0
    if (inputValue[w] != '') {
      let tempStore = inputValue[w]
      tempStore = tempStore.replace(/^-/g, '•');
      tempStore = tempStore.replace(/^  /g, '');
      tempStore = tempStore.replace(/^([a-zA-Z])/g, '\n> $1');
      
      if (tempStore[0] == '•') {
        incomingState = 0
      }
      else if (tempStore[0] == '-') {
        incomingState = 1
      }

      if (CurrentState != incomingState) {
        changeCount += 1
      }

  

      if (changeCount > 1 && changeCount %2 != 0) {
        tempStore = '\n' + tempStore
        changeCount = 1
      }

      outValue += tempStore + '\n'
      
      if (incomingState) {
        CurrentState = 1
      } else {
        CurrentState = 0
      }
      
    }
    
  }
  if (outValue.length > 5) {
    document.querySelector('#textOutput').disabled = false;
    document.querySelector('#textOutput').value = outValue.trim();
  } 


}

function updateCount(event) {
  let chars = event.target.value;
  document.querySelector('#characterCount').innerText = `Character Count: ${chars.length}`;
  document.querySelector('#copyButton').innerText = 'Copy'
  document.querySelector('#copyButton').classList.remove('btn-success');
  document.querySelector('#copyButton').classList.add('btn-primary');
};


function SpecialCase(seperator, passText) {
  let inputValue = document.querySelector('#textInput').value;

  let returnVar = 0
  if (passText != '' && passText.length > 3) {
    inputValue = passText
    returnVar = 1
  }

  if (returnVar == false && inputValue.length < 3) {
    return 0
  }

  inputValue = UnusualDash(inputValue)

  
  let mysep = '\n'+inputValue[0];

  let plainVal = REnRP(inputValue);

  mysep = mysep.replace(/\*/, '\\*');
  


  if (mysep.includes('|')) {
    mysep = mysep.replace(/\|/, '\\|');
  }

  plainVal = '\n' + plainVal;
  let regx = new RegExp(mysep, 'g');
  plainVal = plainVal.replace(regx, '$@');
  plainVal = RefineString(plainVal)

  let outList = plainVal.split('$@');
  
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
  


  if (returnVar) {
    return finalVal
  } else {
    document.querySelector('#textOutput').disabled = false;
    document.querySelector('#textOutput').value = finalVal;
    document.querySelector('#textInput').value = ''  
  }

}


function handleNLines(passText) {
  let textIn = document.querySelector('#textInput').value;

  let returnVar = 0
  if (passText != '' && passText.length > 2) {
    textIn = passText
    returnVar = 1
  }

  if (textIn.length < 3) {
    return 0
  }
  textIn = UnusualDash(textIn)

  let refinedTxt = '\n' + REnRP(textIn)
  refinedTxt = refinedTxt.split('\n');
  alterText = ''

  for (let j = 1; j < refinedTxt.length; j++) {
    if (refinedTxt[j].trim() !== '' && refinedTxt[j] !== ''){
      alterText += `\n${refinedTxt[j].trim()}`
    }
  }


  let plainTxt = ''
  let gSlen = alterText.slice(0, 3).match(/[0-9]/g).length
  let gNChar = alterText[gSlen+1]


  alterText = alterText.split('\n');

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
  plainTxt = plainTxt.split('&*#');
  let outputTxt = ''

  for (let o = 1; o < plainTxt.length; o++) {
    if (o === 1) {
      outputTxt += plainTxt[o]
    } else {
      outputTxt += '\n' + plainTxt[o]
    }
  }
  
  if (returnVar) {
    return outputTxt;
  } else {
    document.querySelector('#textOutput').disabled = false;
    document.querySelector('#textOutput').value = outputTxt;
    document.querySelector('#textInput').value = ''  
  }

}

function planeText(passText) {
  let textIn = document.querySelector('#textInput').value;
  let returnVar = 0;
  if (passText != '') {
    textIn = passText;
    returnVar = 1
  };
  textIn = textIn.replace(/\n/g, ' ');

  if (textIn.length < 3) {
    return 0
  }

  textIn = UnusualDash(textIn);

 let planeTxt = REnRP(textIn)

 if (returnVar) {
  return planeTxt.trim()
 } else {
  document.querySelector('#textOutput').disabled = false;
  document.querySelector('#textOutput').value = planeTxt;
  document.querySelector('#textInput').value = ''; 
 }


}


function copyText() {
  // navigator.clipboard.writeText('Hello Mars!');
  let boxVal = document.querySelector('#textOutput').value
  
  if (boxVal.length !== 0) {
    navigator.clipboard.writeText(boxVal)

    document.querySelector('#textOutput').value = ''
    document.querySelector('#copyButton').innerText = 'Copied'
    document.querySelector('#copyButton').classList.remove('btn-primary');
    document.querySelector('#copyButton').classList.add('btn-success');

    let ppClasses = document.getElementById('ppcopy');
    let poiClasses = document.getElementById('PointsPrpt');
    document.querySelector('#textOutput').placeholder = ':)'

    let BtnElements = [ppClasses, poiClasses]

    for (let x = 0; x < BtnElements.length; x++) {
      if (BtnElements[x].classList[1] == 'btn-success') {
  
        BtnElements[x].classList.remove('btn-success');
        BtnElements[x].classList.add('btn-light');
        if (x == 0) {
          BtnElements[x].innerText = 'Project Prompt'
        }
        else{
          BtnElements[x].innerText = 'Points Prompt'
        }
      }
    }

    if (document.getElementById('emailButton').classList[1] == 'btn-success') {
      document.getElementById('emailButton').classList.remove('btn-success');
      document.getElementById('emailButton').classList.add('btn-outline-light');
      document.getElementById('emailButton').innerText = 'Email'
    }
  } 

  if (document.querySelector('#textInput').value == '~') {
    document.querySelector('#textInput').value = ''
  }
}






// General Replacements:
function REnRP(text) {
  let final = text;

  final = final.replace(/([,&]|and(?=[A-Z]))/g, "$1 ");

  if (final.includes('')) {
    final = final.replace(//g, '-');
  }
  
  if (final.includes('  ')) {
    final = final.replace(/ /g, ' ');
  }

  if (final.includes('	')) {
    final = final.replace(/	/g, ' ');
  }
  
  if (final.includes('  ')) {
    final = final.replace(/  /g, ' ');
  }

  if (final.includes('india')) {
    final = final.replace(/india/g, 'India');
  }

  if (final.includes('pakistan')) {
    final = final.replace(/pakistan/g, 'Pakistan');
  }
  
  if (final.includes('dubai')) {
    final = final.replace(/dubai/g, 'Dubai');
  } 


  if (final.includes('.(')) {
    final = final.replace(/.\(/g, '. (');
  }
  
  if (final.includes('.)')) {
    final = final.replace(/\.\)/g, ').');
  }


  final = final.replace(/([a-zA-Z])([a-zA-Z])([a-zA-Z])([a-zA-Z])\.([a-zA-Z])([a-zA-Z])([a-zA-Z])([a-zA-Z])/g, '$1$2$3$4. $5$6$7$8');
  
   //Error
  final = final.replace(/ qatar /g, ' Qatar ');
  final = final.replace(/ QATAR /g, ' Qatar ');
  final = final.replace(/([0-9])year/g, '$1 year');
  final = final.replace(/([0-9])Year/g, '$1 Year');
  final = final.replace(/china/g, 'China');
  final = final.replace(/ etc /g, ' etc. ');
  final = final.replace(/ etc/g, ' etc.');
  final = final.replace(/Wordpress/g, 'WordPress');
  final = final.replace(/([a-zA-Z])([a-zA-Z])([a-zA-Z])-([a-zA-Z])([a-zA-Z])([a-zA-Z])([a-zA-Z])/g, '$1$2$3 - $4$5$6$7');
  final = final.replace(/ hvac/g, ' HVAC');
  final = final.replace(/hvac /g, 'HVAC ');
  final = final.replace(/Asst\.Engineer/g, 'Assistant Engineer');
  final = final.replace(/Asst\.engineer/g, 'Assistant Engineer');
  final = final.replace(/asst\.engineer/g, 'Assistant Engineer');
  final = final.replace(/Asst\. Engineer/g, 'Assistant Engineer');
  final = final.replace(/Asst\.Manager/g, 'Assistant Manager');
  final = final.replace(/Asst\.manager/g, 'Assistant Manager');
  final = final.replace(/asst\.manager/g, 'Assistant Manager');
  final = final.replace(/Asst\. Manager/g, 'Assistant Manager');
  final = final.replace(/ Hvac/g, ' HVAC');
  final = final.replace(/FireProofing/g, 'Fireproofing');
  final = final.replace(/Hvac /g, 'HVAC ');
  final = final.replace(/mep /g, 'MEP ');
  final = final.replace(/co ordinator/g, 'coordinator');
  final = final.replace(/Co ordinator/g, 'Coordinator');
  final = final.replace(/ mep/g, ' MEP');
  final = final.replace(/ Mep/g, ' MEP');
  final = final.replace(/Mep /g, 'MEP ');
  final = final.replace(/ wll /g, ' WLL ');
  final = final.replace(/ llc /g, ' LLC ');
  final = final.replace(/L\. L\. C\./g, ' LLC ');
  final = final.replace(/W\. L\. L\./g, 'W.L.L');

  final = final.replace(/in([A-Z])/g, 'in $1');
  final = final.replace(/([a-zA-Z]) As ([a-zA-Z])/g, '$1 as $2');
  final = final.replace(/managementsystem/g, 'management system');
  final = final.replace(/Managementsystem/g, 'Management system');
  final = final.replace(/exactstatus/g, 'exact status');
  final = final.replace(/([a-zA-Z]) And ([a-zA-Z])/g, '$1 and $2');
  final = final.replace(/ i /g, ' I ');
  final = final.replace(/ \./g, '.');
  final = final.replace(/equipments/g, 'equipment');
  final = final.replace(/ B\. E /g, ' B.E ');
  final = final.replace(/aircoolers/g, 'air coolers');
  final = final.replace(/Aircoolers/g, 'Air coolers');
  final = final.replace(/Tamilnadu/g, 'Tamil Nadu');
  final = final.replace(/tamilnadu/g, 'Tamil Nadu');
  final = final.replace(/equipment's/g, 'equipment');
  final = final.replace(/Equipments/g, 'equipment');
  final = final.replace(/Equipment's/g, 'equipment');
  final = final.replace(/([a-zA-Z])&/g, '$1 &');
  final = final.replace(/P & ID/g, 'P&ID');
  final = final.replace(/O& M/g, 'O&M');
  final = final.replace(/ qhse /g, ' QHSE ');
  final = final.replace(/ bms/g, ' BMS');
  final = final.replace(/bms /g, 'BMS ');
  final = final.replace(/ Bms/g, ' BMS');
  final = final.replace(/Bms /g, 'BMS ');
  final = final.replace(/ hse /g, ' HSE ');
  final = final.replace(/ Qhse /g, ' QHSE ');
  final = final.replace(/,\)/g, '),');
  final = final.replace(/, \)/g, ')');
  final = final.replace(/\( /g, '(');
  final = final.replace(/ \)/g, ')');
  final = final.replace(/\)([0-9a-zA-Z])/g, ') $1');
  final = final.replace(/([a-zA-Z])\(/g, '$1 (');
  final = final.replace(/ qc /g, ' QC ');
  final = final.replace(/ Qc /g, ' QC ');
  final = final.replace(/ qa\/qc /g, ' QA/QC ');
  final = final.replace(/Multi tasking/g, 'Multi-tasking');
  final = final.replace(/Multi Tasking/g, 'Multi-tasking');
  final = final.replace(/([a-zA-Z])certificate/g, '$1 certificate');
  final = final.replace(/([a-zA-Z])Certificate/g, '$1 Certificate');


  unusualTxt = ['abudhabi', 'Abudhabi', 'AbuDhabi']

  for (let p = 0; p < unusualTxt.length; p++) {
    if (final.includes(unusualTxt[p])) {
      let regx = new RegExp(unusualTxt[p], 'g');
      final = final.replace(regx, 'Abu Dhabi');
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
