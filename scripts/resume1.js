document.querySelector('#disableEditBtn').classList.add('d-none');
document.querySelector('#loadPreviousDataBtn').classList.add('d-none');
document.querySelector('#deletePreviousData').classList.add('d-none');
document.querySelector('#profileImg').classList.add('d-none');
document.querySelector('#skillsAddDialog').classList.add('d-none');
document.querySelector('#addLangDialog').classList.add('d-none');
document.querySelector('#hobbieDialog').classList.add('d-none');
document.querySelector('#summaryPointsDialog').classList.add('d-none');
document.querySelector('#expPointsDialog').classList.add('d-none');
document.querySelector('#projDalog').classList.add('d-none');

var profileImgCh = document.querySelector('#profilepic').files[0];

function picLoadCheck() {
 let fileInput = document.querySelector('#profilepic').files[0];

 if (fileInput) {
 var reader = new FileReader();
 reader.readAsDataURL(fileInput);

 reader.onload = function(e) {
  document.getElementById('hideUploadBtns').classList.add('d-none');
  var img = document.getElementById('profileImg');
  img.src = e.target.result;

  document.querySelector('#profileImg').classList.remove('d-none');
  document.querySelector('#ulWarnBtn').classList.add('d-none');
 }

 } else {
 document.querySelector('#ulWarnBtn').classList.remove('d-none');
 }
}

document.querySelector('#ulWarnBtn').classList.add('d-none');

function btnClose() {
 document.querySelector('#ulWarnBtn').classList.add('d-none');
}


function addSummarybtn() {
  
  existingBlk = document.querySelector('#summaryBlock').innerHTML;

  existingBlk += ` <h6 class="text-primary fs-6  " > Summary  <i class="bi bi-arrow-right-short"></i> </h6> <p class="mytextsize" > Enter Your Summary Here </p> `

  document.querySelector('#summaryBlock').innerHTML = existingBlk

}

let ulid = 110;
let expPts = 322;
let projPts = 550;

if (localStorage.getItem('ptIds')) {
  let parsedIds = JSON.parse(localStorage.getItem('ptIds'));
  ulid = parsedIds.summaryID;
  expPts = parsedIds.expID;
  projPts = parsedIds.projectID;
 }

let tulid = ``;

function summaryBullet() {
  existingBlk = document.querySelector('#summaryBlock').innerHTML;
  ulid += 1;
  updateValues();
  tulid = `t${ulid}`;
  existingBlk += ` <h6 class=" text-primary fs-6" > Summary  <i class="bi bi-arrow-right-short"></i> </h6> <ul id="${tulid}" > <li> Point 1 </li> </ul> <button onclick="summaryPoints()" class= "btn btn-light ms-1 mt-2 mb-2 border border-secondary contentToHide " > Add Points text <i class="bi bi-plus-circle ms-2"></i> </button>  `

  document.querySelector('#summaryBlock').innerHTML = existingBlk

}

function summaryPoints() {
  document.querySelector('#summaryPointsDialog').classList.remove('d-none');
}

function closeSummaryPoints() {
  document.querySelector('#summaryPointsDialog').classList.add('d-none');
}

function addSummaryPoints() {
  let summaryPts = document.querySelector('#summaryPoints').value;
  let sep = summaryPts[0];

  let spoints = summaryPts.split(sep);

  let innerHml = '';

  for (let m = 1; m < spoints.length ; m++) {
    
    innerHml += `<li> ${spoints[m]} </li>`;
    
  }

  
  document.querySelector(`#${tulid}`).innerHTML = innerHml;
  document.querySelector('#summaryPointsDialog').classList.add('d-none');

  
}


skillBlock = '';

function addSkill() {
 document.querySelector('#skillsAddDialog').classList.remove('d-none');
 
}


function addSkills() {
  let inpSkills = document.querySelector('#skilWords').value.split(',');

  let skillCheck = document.getElementsByName('skillPill');
  let skillPills = document.querySelector('#skillsBlock');

  
  if (skillCheck.length == 1 && skillCheck[0].innerText === 'Skill') {
    

    let htmlInside = '';
    for (let i = 0; i < inpSkills.length; i++) {
      htmlInside += ` <p name="skillPill" class=" border rounded-pill p-2 border-success border-2 ms-2 d-inline-block"> ${inpSkills[i].trim()} </p> `;
    }

    skillPills.innerHTML = htmlInside;

    document.querySelector('#skillsAddDialog').classList.add('d-none');

  } else {
    let htmlInside = skillPills.innerHTML;

    for (let j = 0; j < inpSkills.length; j++) {
      htmlInside += ` <p name="skillPill" class=" border rounded-pill p-2 border-success border-2 ms-2 d-inline-block"> ${inpSkills[j].trim()} </p> `;
    }
    skillPills.innerHTML = htmlInside;
  }

}

function closeSDialog() {
  document.querySelector('#skillsAddDialog').classList.add('d-none');
}


let experienceBlock = '';

// let expPts = 322;

let expPtsID = ``;

function addExperience() {
  expPts += 1;
  updateValues();
  expPtsID = `txt${expPts}`;
  experienceBlock = document.getElementById('experienceBlock').innerHTML;
  document.getElementById('experienceBlock').innerHTML = experienceBlock + ` <div class="row mt-4" > <div class="row mt-2" > <h6 class="insidehead" > <strong> Company name </strong> </h6> <p class="mytextsize" > Designation </p> </div> <div class="row d-flex justify-content-between" > <div class="col" > <p class="mytextsize" > Jan/2020 - Present </p> <h6 class="mytextsize" > Description </h6> </div> <div class="col" > <p class="mytextsize text-end" > <i class="bi bi-geo-alt " > </i> Karnataka, India </p> </div> </div> <div class="row mytextsize ms-3 me-1" > <ul id = "${expPtsID}" > <li> Write your Experience Summary/Responsibilities Here </li> </ul> </div> `;
}


function addExpPointsBtn() {
  document.querySelector('#expPointsDialog').classList.remove('d-none');
}

function closeExpPoints() {
  document.querySelector('#expPointsDialog').classList.add('d-none');
}


function addExpPoints() {
  let exhtml = ``;

  let enteredExpPoints = document.querySelector('#expePoints').value;
  let esep = enteredExpPoints[0];
  let ptsArray = enteredExpPoints.split(esep);

  for (let k = 1; k < ptsArray.length; k++) {
    exhtml += ` <li> ${ptsArray[k]} </li> `;
  }

  
  if (expPtsID == '') {
    document.querySelector(`#initialExpPoints`).innerHTML = exhtml;
  } else {
    document.querySelector(`#${expPtsID}`).innerHTML = exhtml;
  }


  document.querySelector('#expPointsDialog').classList.add('d-none');
}



// let projPts = 550;
let projPtsID = ``;


projectBlock = '';

function addProject() {
  projPts += 1;
  updateValues();
  projPtsID = `tx${projPts}`;


 projectBlock = document.getElementById('projectBlock').innerHTML;
 document.getElementById('projectBlock').innerHTML = projectBlock + ` <div class="row mt-3 mytextsize justify-content-between" > <div class="col" > <p class="insidehead" > <strong> Project Name </strong> </p> <p class="mytextsize" > <strong> Client: </strong> xyz </p> <h6 class="mytextsize" > Description </h6> </div> <div class="col" > <p class="insidehead text-end" > Employer </p> <p class="insidehead text-end" > Additional Field ex: Period </p> </div> </div> <div class="row mytextsize ms-3" > <ul id = "${projPtsID}" > <li> Describe yout Project Work </li> </ul> </div> `;
}



function addProjPointsBtn() {
  document.querySelector('#projDalog').classList.remove('d-none');
}

function closeProjPoints() {
  document.querySelector('#projDalog').classList.add('d-none');
}

function updateValues() {
  ids = {summaryID: ulid, expID : expPts, projectID : projPts};
  localStorage.setItem('ptIds', JSON.stringify(ids));
}



function addProjPoints() {
  let pjhtml = ``;

  let enteredProjPoints = document.querySelector('#proj11Points').value;
  let psep = enteredProjPoints[0];
  let ptsArray = enteredProjPoints.split(psep);

  for (let k = 1; k < ptsArray.length; k++) {
    pjhtml += ` <li> ${ptsArray[k]} </li> `;
  }

  
  if (projPtsID == '') {
    document.querySelector(`#initialProjD`).innerHTML = pjhtml;
  } else {
    document.querySelector(`#${projPtsID}`).innerHTML = pjhtml;
  }


  document.querySelector('#projDalog').classList.add('d-none');
}



eduRow = '';
ednum = 2;
delEdId = 1;
delrowId = 501;

function addEDRow() {
 eduRow = document.getElementById('edurow').innerHTML;
 eduRow += ` <tr id="${delEdId}" > <th scope="row"> ${ednum}.</th> <td> Secondary School </td> <td> Indian Institute </td> <td>2016 - 2018 </td> <td name="delEdrowBtn" class="text-center" > <button class="btn btn-danger fw-bold " onclick="deleteEdRow(${delEdId})" > Delete </button> </td> </tr> `;

 document.getElementById('edurow').innerHTML = eduRow;
 delEdId += 1;
 ednum += 1;
}

function deleteEdRow(id) {
  document.getElementById(id).innerHTML = '';
}


function addSectionNum() {
  let ach = document.querySelector('#achievementsSec').innerHTML;

  ach += ` <div class="row mt-2"> <h6 class="text-primary fs-6" > Achievements <i class="bi bi-arrow-right-short"></i> </h6> <div class="mt-2 mytextsize"> <ol> <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla officiis doloribus vitae omnis. Fugit, est quisquam.</li> <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, consequatur.</li> </ol> </div> </div> `;

  document.querySelector('#achievementsSec').innerHTML = ach;
}

function addSectionBullet() {
  let ach = document.querySelector('#achievementsSec').innerHTML;

  ach += ` <div class="row mt-2"> <h6 class="text-primary fs-6" > Achievements <i class="bi bi-arrow-right-short"></i> </h6> <div class="mt-2 mytextsize"> <ul> <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla officiis doloribus vitae omnis. Fugit, est quisquam.</li> <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, consequatur.</li> </ul> </div> </div> `;

  document.querySelector('#achievementsSec').innerHTML = ach;
}


var addLangn = '';
function addLang() {
 document.querySelector('#addLangDialog').classList.remove('d-none');
 
}

function closeLangDialog() {
  document.querySelector('#addLangDialog').classList.add('d-none');
}



function addLanguages() {
  
  let addLangn = '';

  avlLangs = document.getElementsByName('languages');

  languageArray = document.querySelector('#enteredLanguages').value.split(',');
  if (avlLangs.length == 1 && avlLangs[0].innerText === 'Language') {
    
    for (let o = 0; o < languageArray.length; o++) {
      
      addLangn += ` <p name="languages" class="border rounded-2 p-1 border-success border-1 ms-2 d-inline-block"> ${languageArray[o].trim()} </p> `;
      
    }

    document.getElementById('langBlock').innerHTML = addLangn;
    document.querySelector('#addLangDialog').classList.add('d-none');
    document.querySelector('#enteredLanguages').value = '';

  } else {
    addLangn = document.getElementById('langBlock').innerHTML;

    for (let t = 0; t < languageArray.length; t++) {
      
      addLangn +=  ` <p name="languages" class="border rounded-2 p-1 border-success border-1 ms-2 d-inline-block"> ${languageArray[t].trim()} </p> `;
      
    }
    document.getElementById('langBlock').innerHTML = addLangn;
    document.querySelector('#addLangDialog').classList.add('d-none');
    document.querySelector('#enteredLanguages').value = '';

  }
}





function addHobbie() {

  document.querySelector('#hobbieDialog').classList.remove('d-none');

  }

function closeHobbieDialog() {
  document.querySelector('#hobbieDialog').classList.add('d-none');
}

function addHobbies() {
  
  enteredHobbies = document.querySelector('#hobbiesTextarea').value.split(',');
  let addHobbiehtml = '';
  let existingHbs = document.getElementsByName('existingHobbies');

  if (existingHbs.length == 1 && existingHbs[0].innerText === 'Hobbie') {
    for (let z = 0; z < enteredHobbies.length; z++) {
      addHobbiehtml += ` <p class="border rounded-2 p-2 border-primary border-1 ms-2 d-inline-block"> ${enteredHobbies[z].trim()} </p> `;
      
    }
    document.getElementById('hobbiesBlock').innerHTML = addHobbiehtml;
    document.querySelector('#hobbieDialog').classList.add('d-none');
    document.querySelector('#hobbiesTextarea').value = '';

  } else {
    addHobbiehtml = document.getElementById('hobbiesBlock').innerHTML;

    for (let x = 0; x < enteredHobbies.length; x++) {
      
      addHobbiehtml += ` <p class="border rounded-2 p-2 border-primary border-1 ms-2 d-inline-block" > ${enteredHobbies[x].trim()} </p> `;
    }

    document.getElementById('hobbiesBlock').innerHTML = addHobbiehtml;
    document.querySelector('#hobbieDialog').classList.add('d-none');
    document.querySelector('#hobbiesTextarea').value = '';

  }


}


function saveData() {
 disableEdit()
 let bodyhml = document.body.innerHTML;
 localStorage.setItem('htmltext', JSON.stringify(bodyhml));
 document.querySelector('#deletePreviousData').classList.remove('d-none');
}

function editDocument() {
 document.body.contentEditable = true;
 document.querySelector('#enableEditBtn').classList.add('d-none');
 document.querySelector('#disableEditBtn').classList.remove('d-none');

}
function disableEdit() {
 document.body.contentEditable = false;
 document.querySelector('#enableEditBtn').classList.remove('d-none');
 document.querySelector('#disableEditBtn').classList.add('d-none');
 
}

function readyPrint() {
 if (profileImgCh == undefined) {
 document.querySelector('#profileImg').classList.remove('d-none');
 document.getElementById('hideUploadBtns').classList.add('d-none');
 }

 contentsToHide = document.querySelectorAll('.contentToHide');

 for (let i = 0; i < contentsToHide.length; i++) {
 contentsToHide[i].style = 'display: none';
 }
 document.querySelector('.lastContentHide').style = 'display: none';

 let edDelbtns = document.getElementsByName('delEdrowBtn');


 for (let l = 0; l < edDelbtns.length; l++) {
  
  edDelbtns[l].classList.add('d-none');
  
 }


}





if (localStorage.getItem('htmltext')) {
 document.querySelector('#loadPreviousDataBtn').classList.remove('d-none');
 document.querySelector('#deletePreviousData').classList.remove('d-none');
}


function retriveData() {
 disableEdit()
 let userData = localStorage.getItem('htmltext');
 document.body.innerHTML = JSON.parse(userData);
 document.querySelector('#deletePreviousData').classList.remove('d-none');

}

function deleteData() {
  localStorage.removeItem('htmltext');
  document.querySelector('#loadPreviousDataBtn').classList.add('d-none');
  document.querySelector('#deletePreviousData').classList.add('d-none');
}