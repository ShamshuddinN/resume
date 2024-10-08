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

  betaOut2 = betaOut2.replace(/  /g, ' ')

  betaOut2 = betaOut2.trim()

  sendOutput(betaOut2);
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

  sendOutput(outputText)
}


function CertificationsFormat() {
  let inText = document.querySelector('#textInput').value
  
  if (inText.length <= 5) {
    return 0
  }

  inText = inText.split('\n');

  let certificatesArray = []
  let caughtMail = ''
  let omitted = []
  for (let g = 0; g < inText.length; g++) {
    if (inText[g].includes('@')) {
      caughtMail += inText[g].trim()
    } 
    else if (inText[g].length > 2 && inText[g].length <= 100) {
      let certificate_text = REnRP(inText[g].trim())
      certificate_text = certificate_text.replace(/\.$/g, '')
      certificatesArray.push(certificate_text)
    }
    else if (inText[g].length > 2) {
      omitted.push(REnRP(inText[g].trim()))
    }

    const arrAsString = JSON.stringify(certificatesArray);
    let finalOutput = ''
    finalOutput += `certifications = ${arrAsString}` + '\n' + `mail = '${caughtMail}'\n`;

    sendOutput(finalOutput)
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
    sayPlaceholder("Please Enter Text in Input Text Box with a Line seperator.")

  } else if (isAlpha(inpTextHere[0]) ||inpTextHere[0] === ' ') {
    sayPlaceholder("Error: No Line Seperator Found!")

  } else if (mystr.includes(inpTextHere[0])) {
    sayPlaceholder('Error: For Numbered Line Seperators Use "Num Ln" button.')

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
      sendOutput(outText)
    }

  }
  
}


let controlCount = 0;
let shiftCount = 0;
function inputHandle(event) {
  
  if (event.key == 'Control') {
    controlCount += 1
  }
  
  if (event.key == 'Shift') {
    shiftCount += 1
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

      if (!PlainString[0].includes(':')) {
        PlainString = ["ExampleVNH:\n", ...PlainString]
      }
      

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
            formattedText += '\n\n' + planeText(passText = theHeaders[txt].trim());
            if (theDescriptions[txt][0] == '-') {
              formattedText += '\n' + SpecialCase(seperator = '•', passText = theDescriptions[txt].trim()); //working
            } else if (isNumeric(theDescriptions[txt][0])) {
              formattedText += '\n' + handleNLines(passText = theDescriptions[txt].trim()); //working
            } else if (isAlpha(theDescriptions[txt][0]) == false) {
              formattedText += '\n' + inputSubmit(txtIn = '', passText = RefineString(theDescriptions[txt].trim()) ); //working
            } else if (theDescriptions[txt].slice(0, 2) == 'o ') {
              formattedText += '\n' + SpecialCase(seperator = '•', passText = theDescriptions[txt].trim()); //testing
            } else if (isAlpha(theDescriptions[txt][0])) {
              formattedText += '\n' + planeText(passText = RefineString(theDescriptions[txt].trim())); //working
            }
          }
        }
      }

// to be improved

      formattedText = formattedText.replace('ExampleVNH:\n', '')
      sendOutput(formattedText.trim())
    }

  }
  // new code



  if (event.ctrlKey && event.key === '/') { //event.ctrlKey && event.key === 'Enter'
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
    
    

    
    // final = final.replace(/([,&]|and(?=[A-Z]))/g, "$1 ");
    let cOutput = capitalizeWords(trimmed);
    event.target.value = '';
    document.querySelector('#characterCount').innerText = `Character Count: 0`;

    cOutput = cOutput.replace(/Autocad/g, 'AutoCAD');
    cOutput = cOutput.replace(/autocad/g, 'AutoCAD');

    cOutput = cOutput.replace(/ 3d /g, ' 3D ');
    cOutput = cOutput.replace(/^3d /g, '3D ');
    cOutput = cOutput.replace(/ 3d$/g, ' 3D');

    cOutput = cOutput.replace(/^([mM])is /g, 'MIS ');
    cOutput = cOutput.replace(/ ([mM])is /g, ' MIS ');
    cOutput = cOutput.replace(/ ([mM])is$/g, ' MIS');
    cOutput = cOutput.replace(/ ([mM])is\.$/g, ' MIS.');

    cOutput = cOutput.replace(/^Hr /g, 'HR ');
    cOutput = cOutput.replace(/ Hr$/g, ' HR');
    cOutput = cOutput.replace(/ Hr /g, ' HR ');

    cOutput = cOutput.replace(/ Cum /g, ' cum ');
    cOutput = cOutput.replace(/^Cum /g, 'cum ');
    cOutput = cOutput.replace(/ Cum$/g, ' cum');
    
    cOutput = cOutput.replace(/－/g, '-');

    cOutput = cOutput.replace(/Hvac /g, 'HVAC ');
    cOutput = cOutput.replace(/ Hvac/g, ' HVAC');
    cOutput = cOutput.replace(/ Mep/g, ' MEP');
    cOutput = cOutput.replace(/ Hse /g, ' HSE ');
    cOutput = cOutput.replace(/ Hse/g, ' HSE');
    cOutput = cOutput.replace(/Wordpress/g, 'WordPress');
    cOutput = cOutput.replace(/Mep /g, 'MEP ');
    cOutput = cOutput.replace(/^Ndt /g, 'NDT ');
    cOutput = cOutput.replace(/ Ndt /g, ' NDT ');


    cOutput = cOutput.replace(/ Asst\. /g, ' Assistant ');
    cOutput = cOutput.replace(/^Asst\. /g, 'Assistant ');
    cOutput = cOutput.replace(/^Asst /g, 'Assistant ');
    cOutput = cOutput.replace(/ Asst /g, ' Assistant ');

    cOutput = cOutput.replace(/ Mgmt\. /g, ' Management ');
    cOutput = cOutput.replace(/^Mgmt\. /g, 'Management ');
    cOutput = cOutput.replace(/^Mgmt /g, 'Management ');
    cOutput = cOutput.replace(/ Mgmt /g, ' Management ');


    cOutput = cOutput.replace(/ Ndt$/g, ' NDT');
    cOutput = cOutput.replace(/^Hse /g, 'HSE ');
    cOutput = cOutput.replace(/ Hse /g, ' HSE ');
    cOutput = cOutput.replace(/ Hse$/g, ' HSE');
    cOutput = cOutput.replace(/([a-zA-Z]) \.$/g, '$1.');
    cOutput = cOutput.replace(/([a-zA-Z]) \.\n/g, '$1.\n');
  
    cOutput = cOutput.replace(/ Nebosh/g, ' NEBOSH');
    cOutput = cOutput.replace(/Co\-ordi/g, 'Coordi');
    cOutput = cOutput.replace(/nebosh /g, 'NEBOSH ');
    cOutput = cOutput.replace(/Nebosh /g, 'NEBOSH ');
    cOutput = cOutput.replace(/ Bms /g, ' BMS ');
    cOutput = cOutput.replace(/Co Ordinator/g, 'Coordinator');
    cOutput = cOutput.replace(/Bms /g, 'BMS ');
    cOutput = cOutput.replace(/ And /g, ' & ');
    cOutput = cOutput.replace(/ Of /g, ' of ');
    cOutput = cOutput.replace(/ Qc$/g, ' QC');
    cOutput = cOutput.replace(/^Qc /g, 'QC ');
    cOutput = cOutput.replace(/ Qc /g, ' QC ');
    cOutput = cOutput.replace(/\nQc /g, '\nQC ');
    cOutput = cOutput.replace(/ Qa /g, ' QA ');
    cOutput = cOutput.replace(/^Qa /g, 'QA ');


    cOutput = cOutput.replace(/Asst\.engineer/g, 'Assistant Engineer');
    cOutput = cOutput.replace(/Asst\. Engineer/g, 'Assistant Engineer');
    
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
      sayPlaceholder("Text Too Short Or No Words Found!");
    } else {
      document.querySelector('#textOutput').disabled = false;
      document.querySelector('#textOutput').value = cOutput;
    }

  }
  
  else if (event.ctrlKey && event.key == '.') {
    GPTCorrection()
    document.querySelector('#textInput').value = ''

  }
  

};


function isUpperCase(char) {
  return char === char.toUpperCase() && char !== char.toLowerCase();
}

function GPTCorrection() {
  let inputValue = document.querySelector('#textInput').value;
  inputValue = inputValue.replace(/### /g, '')
  inputValue = inputValue.replace(/\*\*\*/g, '')
  inputValue = inputValue.replace(/\*\*/g, '')


  inputValue = inputValue.split('\n');
  let outValue = '';

  let changeCount = 0
  let CurrentState = 1

  const startAlpha = /^([a-zA-Z])/;
  const endAlpha = /([a-zA-Z])$/;
  const endsWithColon = /\:$/;


  for (let w = 0; w < inputValue.length; w++) {
    let incomingState = 0
    if (inputValue[w] != '') {
      let tempStore = inputValue[w];
      tempStore = tempStore.replace(/^-/g, '•');
      tempStore = tempStore.replace(/  \-/g, '-');
      tempStore = tempStore.replace(/^  /g, '');


      if (startAlpha.test(tempStore) && endAlpha.test(tempStore)) {

        tempStore = '\n' + tempStore + ':';
      }

      if (endsWithColon.test(tempStore)) {

        tempStore = '\n' + tempStore;
      }

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

  outValue = outValue.replace(/\n\n/g, '\n');
  if (outValue.length > 5) {
    document.querySelector('#textOutput').disabled = false;
    document.querySelector('#textOutput').value = outValue.trim();
  } 


}

function updateCount(event) {
  let chars = event.target.value;
  document.querySelector('#characterCount').innerText = `Character Count: ${chars.length}`;
  document.querySelector('#copyButton').innerText = 'Copy Text'
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

  

  if (mysep.includes('.')) {
    mysep = mysep.replace(/\./, '\\.');
  } else if (mysep.includes('*')) {
    mysep = mysep.replace(/\*/, '\\*');
  } else if (mysep.includes('+')) {
    mysep = mysep.replace(/\+/g, '\\+')
  }
  


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

    sendOutput(finalVal)
  
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
    sendOutput(outputTxt);  
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
  sendOutput(planeTxt) 
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
    sayPlaceholder(':)');

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

}






// General Replacements:
function REnRP(text) {
  let final = text;

  //Comma replacements
  final = final.replace(/[,&](a-zA-Z)/g, ', $1');
  final = final.replace(/([a-zA-Z])([a-zA-Z]) ,([a-zA-Z])([a-zA-Z])/g, '$1$2, $3$4')
  final = final.replace(/([a-zA-Z]) ,/g, '$1,')
  final = final.replace(/([a-zA-Z]),([a-zA-Z])/g, '$1, $2')
  //

  final = final.replace(/and([A-Z])/g, 'and $1');
  final = final.replace(/([a-z])And([A-Z])/g, '$1 And $2');
  


  if (final.includes('')) {
    final = final.replace(//g, '-');
  }

  //Unstable Code
  if (final.includes('')) {
    final = final.replace(//g, 'ff');
  }
  
  if (final.includes('')) {
    final = final.replace(//g, 'ffi');
  }
  //Unstable Code


  if (final.includes('  ')) {
    final = final.replace(/ /g, ' ');
  }

  if (final.includes('	')) {
    final = final.replace(/	/g, ' ');
  }
  
  if (final.includes('－')) {
    final = final.replace(/－/g, '-');
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
  final = final.replace(/Autocad/g, 'AutoCAD');
  final = final.replace(/autocad/g, 'AutoCAD');

  final = final.replace(/ 3d /g, ' 3D ');
  final = final.replace(/^3d /g, '3D ');
  final = final.replace(/ 3d$/g, ' 3D');

  final = final.replace(/ Cum /g, ' cum ');
  final = final.replace(/^Cum /g, 'cum ');
  final = final.replace(/ Cum$/g, ' cum');



  final = final.replace(/ QATAR /g, ' Qatar ');
  final = final.replace(/([0-9])year/g, '$1 year');
  final = final.replace(/([0-9])Year/g, '$1 Year');
  final = final.replace(/ china /g, ' China ');
  final = final.replace(/^china /g, 'China ');
  final = final.replace(/ china$/g, ' China');
  final = final.replace(/ etc /g, ' etc. ');
  final = final.replace(/ etc$/g, ' etc.');
  final = final.replace(/Wordpress/g, 'WordPress');
  final = final.replace(/cross \- functional/g, 'cross-functional');
  final = final.replace(/ hvac/g, ' HVAC');
  final = final.replace(/hvac /g, 'HVAC ');

  final = final.replace(/ ([mM])is /g, ' MIS ');
  final = final.replace(/^([mM])is /g, 'MIS ');



  final = final.replace(/ mgmt\. /g, ' Management ');
  final = final.replace(/ Mgmt\. /g, ' Management ');
  final = final.replace(/ Mgmt /g, ' Management ');
  final = final.replace(/^Mgmt /g, 'Management ');
  final = final.replace(/^Mgmt\. /g, 'Management ');
  final = final.replace(/ Asst\. /g, ' Assistant ');
  final = final.replace(/ Asst /g, ' Assistant ');
  final = final.replace(/^Asst\. /g, 'Assistant ');
  final = final.replace(/^Asst /g, 'Assistant ');
  
  
  final = final.replace(/ Nebosh/g, ' NEBOSH');
  final = final.replace(/nebosh /g, 'NEBOSH ');
  final = final.replace(/Nebosh /g, 'NEBOSH ');
  final = final.replace(/ adnoc /g, ' ADNOC ');
  final = final.replace(/ Adnoc /g, ' ADNOC ');
  final = final.replace(/Adnoc /g, ' ADNOC ');
  
  final = final.replace(/Co\-ordi/g, 'Coordi');
  final = final.replace(/co\-ordi/g, 'Coordi');
  final = final.replace(/Co\- ordi/g, 'Coordi');
  final = final.replace(/CO\-ORDI/g, 'COORDI');

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
  final = final.replace(/ mep\n/g, ' MEP\n');
  final = final.replace(/ Mep$/g, ' MEP');
  final = final.replace(/ Mep\n/g, ' MEP\n');
  final = final.replace(/^Mep /g, 'MEP ');
  final = final.replace(/\nMep /g, 'MEP ');
  final = final.replace(/^Hse /g, 'HSE ');
  final = final.replace(/\nHse /g, '\nHSE ');
  final = final.replace(/ Hse /g, ' HSE ');
  final = final.replace(/ Hse$/g, ' HSE');
  final = final.replace(/ Hse\n/g, ' HSE\n');

  final = final.replace(/([a-zA-Z]) \.$/g, '$1.');
  final = final.replace(/([a-zA-Z]) \.\n/g, '$1.\n');


  final = final.replace(/^hse /g, 'HSE ');
  final = final.replace(/\nhse /g, '\nHSE ');
  final = final.replace(/ hse /g, ' HSE ');
  final = final.replace(/ hse$/g, ' HSE');
  final = final.replace(/ hse\n/g, ' HSE\n');
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
  final = final.replace(/([a-zA-Z]) \.([a-zA-Z])/g, '$1. $2');
  final = final.replace(/equipments/g, 'equipment');
  final = final.replace(/ B\. E /g, ' B.E ');
  final = final.replace(/aircoolers/g, 'air coolers');
  final = final.replace(/Aircoolers/g, 'Air coolers');
  final = final.replace(/Tamilnadu/g, 'Tamil Nadu');
  final = final.replace(/tamilnadu/g, 'Tamil Nadu');
  final = final.replace(/equipment's/g, 'equipment');
  final = final.replace(/Equipments/g, 'Equipment');
  final = final.replace(/Equipment's/g, 'equipment');
  final = final.replace(/([a-zA-Z])([a-zA-Z])([a-zA-Z])&([a-zA-Z])([a-zA-Z])([a-zA-Z])/g, '$1$2$3 & $4$5$6');
  final = final.replace(/([a-z])([a-z])&/g, '$1$2 &')
  final = final.replace(/([a-z])([a-z])&([a-z])([a-z])/g, '$1$2 & $3$4')
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
  final = final.replace(/([a-zA-Z0-9])\(/g, '$1 (');
  final = final.replace(/ qc /g, ' QC ');
  final = final.replace(/^qc /g, 'QC ');
  final = final.replace(/^Qc /g, 'QC ');
  final = final.replace(/ qa /g, ' QA ');
  final = final.replace(/ Qc /g, ' QC ');
  final = final.replace(/ Qa /g, ' QA ');
  final = final.replace(/^Qa /g, 'QA ');
  final = final.replace(/^qa /g, 'QA ');
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


function SearchDIs() {
  let searchTerm = document.querySelector('#textInput').value;
  searchTerm = searchTerm.trim().toLowerCase()
  if (searchTerm.length < 2) {
    sayPlaceholder("Query Must be more than 2 characters long")
    return 0
  }

  searchTerm = searchTerm.trim().toLowerCase()
  let DepartmentsText = `account audit taxation company secreatory administration advertising media planning pr architecture interior design banking - client mgmt portfolio mgmt banking- investment corporate digital beauty salon skin care buying purchase procurement vendor management cabin crew flight attendant steward air hostess cashier teller billing and 
payments chefs f&b housekeeping front desk contract management estimation tendering quantity surveying corporate planning consulting strategy m&a customer service data entry operations back office processing dba datawarehousing (it software) doctor nurse paramedics hospital technician medical research drilling engineering equipment operations - machine crane forklift equity derivatives commodities investor relations erp crm (it sofware) finance treasury finance audit accounting fire & safety department flight operations (pilots, technical staff, ground staff) freasher graduates management trainee intern no experience geotechnical geologists petrophysicists graphic 
design web design art visualiser guards security services hair style nails art helpdesk customer services telecalling hr human relations industry relations hse (health safety environment) information technology & telecom inspection & corrosion installation maintenance operations repair insurance underwriting surveying actuary it hardware support it hardware repair & maintenance it software architect operations journalism content writing editing correspondent laboratory language translation lawyers legal advisors logistics supply chains maintenance marine services (marine officer marine engineer ship chandler driver) marketing brand marketing marketing research digital marketing mep (mechanical electrical plumbing) merchandising & planning category management operations other planning engineering strategy forecasting power, water & utilities 
product development product management production manufacturing project management quality testing qa qc inspector r&d research and development refinery maintenance risk management risk analysis fraud investigation sales - key account management sales business development pricing secreatory front office personal assistant (pa) shop drawing drafting draughtsman site engineering projects software development application development (it software) store operations (for retail industry) surveying (civil) system administration network administration security (it software) teaching education telecom engineering communication engineering ticketing reservations top management senior management training learning transport driving tv anchors reporters film production vj rj visual merchandizing`;
  let IndustriesText = `maintenance repair advertising events media agriculture forestry architecture interior designing aviation banking catering chemical industries commerce construction distribution education engineering entertainment theme parks tourism entry-level workers finance accounting auditing fintech fmcg healthcare hospitals hospitality 
hotels human resources recruitment industrials investment and developers it technology telecom legal law firm luxury goods and jewellery manufacturing marketing and advertisement mechanical & electrical engineering mep metro train mining oil & gas others perfumery cosmetics power professional business services real estate & builders shipping transportation utilities wholesale and retail trade`;
  let departments = ['Account / Audit / Taxation / Company Secreatory', 'Administration', 'Advertising  / Media Planning / PR', 'Architecture / Interior Design', 'Banking - Client Mgmt / Portfolio Mgmt', 'Banking- Investment/Corporate/Digital', 'Beauty / Salon / Skin Care', 'Buying / Purchase / Procurement / Vendor Management', 'Cabin Crew / Flight Attendant / Steward / Air Hostess', 'Cashier / Teller  / Billing and Payments', 'Chefs / F&B / Housekeeping / Front Desk', 'Contract Management / Estimation / Tendering / Quantity Surveying', 'Corporate Planning / Consulting / Strategy / M&A', 'Customer Service', 'Data Entry / Operations / Back Office Processing', 'DBA / Datawarehousing (IT Software)', 'Doctor / Nurse / Paramedics /  Hospital Technician / Medical Research', 'Drilling', 'Engineering', 'Equipment Operations - Machine / Crane / Forklift', 'Equity/ Derivatives/ Commodities/Investor Relations', 'ERP / CRM (IT Sofware)', 'Finance / Treasury',
    'Finance/ Audit/ Accounting', 'Fire & Safety  Department', 'Flight Operations (Pilots, Technical Staff, Ground Staff)', 'Freasher Graduates / Management Trainee / Intern / No Experience', 'Geotechnical / Geologists / Petrophysicists', 'Graphic Design / Web Design / Art / Visualiser', 'Guards / Security Services', 'Hair Style / Nails / Art', 'Helpdesk / Customer Services / Telecalling', 'HR / Human Relations / Industry Relations', 'HSE (Health / Safety / Environment)', 'Information Technology & Telecom', 'Inspection & Corrosion', 'Installation / Maintenance / Operations / Repair', 'Insurance / Underwriting / Surveying / Actuary', 'IT Hardware Support / IT Hardware Repair & Maintenance', 'IT Software/Architect/Operations', 'Journalism / Content writing / Editing / Correspondent', 'Laboratory', 'Language Translation', 'Lawyers / Legal Advisors', 'Logistics / Supply Chains',
     'Maintenance', 'Marine Services (Marine Officer / Marine Engineer / Ship Chandler / Driver)', 'Marketing / Brand Marketing / Marketing Research / Digital Marketing', 'MEP (Mechanical / Electrical / Plumbing)', 'Merchandising & Planning / Category Management', 'Operations', 'Other', 'Planning Engineering / Strategy / Forecasting', 'Power, Water & Utilities', 'Product Development / Product Management', 'Production / Manufacturing', 'Project Management', 'Quality / Testing / QA / QC / Inspector', 'R&D / Research and Development', 'Refinery Maintenance', 'Risk Management / Risk Analysis / Fraud Investigation', 'Sales - Key Account Management', 'Sales / Business Development / Pricing', 'Secreatory / Front Office / Personal Assistant (PA)',
      'Shop Drawing / Drafting / Draughtsman', 'Site Engineering / Projects', 'Software Development / Application Development (IT Software)', 'Store operations (For Retail Industry)', 'Surveying (Civil)', 'System Administration / Network Administration / Security (IT Software)', 'Teaching / Education', 'Telecom Engineering / Communication Engineering', 'Ticketing / Reservations', 'Top  Management / Senior  Management', 'Training / Learning', 'Transport / Driving', 'TV Anchors / Reporters / Film Production / VJ / RJ', 'Visual Merchandizing'];
  let industries = ['Maintenance/Repair', 'Advertising / Events / Media', 'Agriculture / Forestry', 'Architecture / Interior Designing', 'Aviation', 'Banking', 'Catering', 'Chemical industries', 'Commerce', 'Construction', 'Distribution', 'Education', 'Engineering', 'Entertainment / Theme Parks / Tourism', 'Entry-Level Workers',
    'Finance / Accounting / Auditing', 'FinTech', 'FMCG', 'Healthcare / Hospitals', 'Hospitality / Hotels', 'Human Resources / Recruitment', 'Industrials', 'Investment And Developers', 'IT / Technology / Telecom', 'Legal / Law Firm', 'Luxury Goods and Jewellery',
     'Manufacturing', 'Marketing and Advertisement', 'Mechanical & Electrical Engineering', 'MEP', 'Metro / Train', 'Mining', 'Oil & Gas', 'Others', 'Perfumery / Cosmetics', 'Power', 'Professional / Business Services', 'Real Estate & Builders', 'Shipping', 'Transportation', 'Utilities', 'Wholesale and Retail trade'];

     let Dresults = 'Departments:\n';
     let Iresults = 'Industries:\n';
     if (DepartmentsText.includes(searchTerm)) {
      
      for (let u = 0; u < departments.length; u++) {
        if (departments[u].toLowerCase().includes(searchTerm)) {
          Dresults += '• ' + departments[u] + '\n'
        }
      }
      Dresults += '\n';
     } else {
      Dresults = 'Departments: NA\n\n'
     }

     if (IndustriesText.includes(searchTerm)) {
      for (let tr = 0; tr < industries.length; tr++) {
        if (industries[tr].toLowerCase().includes(searchTerm)) {
          Iresults += '• ' + industries[tr] + '\n'
        }
      }
      
     } else{
      Iresults = 'Industry: NA'
     }

     let finalResult = Dresults + Iresults
     finalResult = finalResult.trim()
     sendOutput(finalResult)
}

const PDT = (FN) => {
  let inputText = getInputtxt()
  
  if (inputText == 0) {
    sayPlaceholder("Input is too short.")
    return 0
  }

  if (FN == 5) {
    navigator.clipboard.writeText(`Worked as ${inputText.trim()}.`)
    sayPlaceholder('WA is Success!')
    clearInput()
  } else if (FN == 6) {
    if (inputText.toLowerCase().includes('project')) {
      navigator.clipboard.writeText(`Worked on ${planeText(inputText)}.`)
    } else {
      navigator.clipboard.writeText(`Worked on ${planeText(inputText)} Project.`)
    }
    sayPlaceholder('WOP is Success!')
    clearInput()
  }


  return 0
}


const getInputtxt = () => {
  if (!document.querySelector('#textInput').value) {
    return 0
  } else if (document.querySelector('#textInput').value.length <= 2) {
    return 0
  }

  return document.querySelector('#textInput').value
}

function sendOutput(outputText) {
  document.querySelector('#textInput').value = '';
  document.querySelector('#textOutput').value = outputText;  
  document.querySelector('#textOutput').disabled = false;
}

const clearInput = () => {
  document.querySelector('#textInput').value = '';
}

function sayPlaceholder(textToSay) {
  document.querySelector('#textOutput').placeholder = textToSay;
  document.querySelector('#textOutput').disabled = true;
}