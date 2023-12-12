document.querySelector('#disableEditBtn').style = 'display: none;';
document.querySelector('#loadPreviousDataBtn').style = 'display: none;';
document.querySelector('#profileImg').style = 'display: none;';
document.querySelector('#skillsAddDialog').style = 'display: none;';
document.querySelector('#addLangDialog').style.display = 'none';
document.querySelector('#hobbieDialog').style.display = 'none';

var profileImgCh = document.querySelector('#profilepic').files[0];

function picLoadCheck() {
 let fileInput = document.querySelector('#profilepic').files[0];

 if (fileInput) {
 var reader = new FileReader();
 reader.readAsDataURL(fileInput);

 reader.onload = function(e) {
  document.getElementById('hideUploadBtns').style = 'display: none;';
  var img = document.getElementById('profileImg');
  img.src = e.target.result;

  document.querySelector('#profileImg').style = 'display: block;';
  document.querySelector('#ulWarnBtn').style = 'display: none;';
 }

 } else {
 document.querySelector('#ulWarnBtn').style = 'display: block;';
 }
}

document.querySelector('#ulWarnBtn').style = 'display: none;';

function btnClose() {
 document.querySelector('#ulWarnBtn').style = 'display: none;';
}


skillBlock = '';

function addSkill() {
 document.querySelector('#skillsAddDialog').style = 'display: block;';
 
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

    document.querySelector('#skillsAddDialog').style = 'display: none;';

  } else {
    let htmlInside = skillPills.innerHTML;

    for (let j = 0; j < inpSkills.length; j++) {
      htmlInside += ` <p name="skillPill" class=" border rounded-pill p-2 border-success border-2 ms-2 d-inline-block"> ${inpSkills[j].trim()} </p> `;
    }
    skillPills.innerHTML = htmlInside;
  }

}

function closeSDialog() {
  document.querySelector('#skillsAddDialog').style = 'display: none;';
}


let experienceBlock = '';

function addExperience() {
 experienceBlock = document.getElementById('experienceBlock').innerHTML;
 document.getElementById('experienceBlock').innerHTML = experienceBlock + ` <div class="row mt-4" > <div class="row mt-2" > <h6 class="insidehead" > <strong> Company name </strong> </h6> <p class="mytextsize" > Designation </p> </div> <div class="row d-flex justify-content-between" > <div class="col" > <p class="mytextsize" > Jan/2020 - Present </p> <h6 class="mytextsize" > Description </h6> </div> <div class="col" > <p class="mytextsize text-end" > <i class="bi bi-geo-alt " > </i> Karnataka, India </p> </div> </div> <div class="row mytextsize ms-3 me-1" > <ul> <li> Write your Experience Summary/Responsibilities Here </li> </ul> </div> `;
}

projectBlock = '';

function addProject() {
 projectBlock = document.getElementById('projectBlock').innerHTML;
 document.getElementById('projectBlock').innerHTML = projectBlock + ` <div class="row mt-3 mytextsize justify-content-between" > <div class="col" > <p class="insidehead" > <strong> Project Name </strong> </p> <p class="mytextsize" > <strong> Client: </strong> xyz </p> <h6 class="mytextsize" > Description </h6> </div> <div class="col" > <p class="insidehead text-end" > Employer </p> <p class="insidehead text-end" > Additional Field ex: Period </p> </div> </div> <div class="row mytextsize ms-3" > <ul> <li> Describe yout Project Work </li> </ul> </div> `;
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

  ach += ` <div class="row mt-2"> <h6 class="text-primary fs-6" > Achievements <i class="bi bi-arrow-right-short"></i> </h6> <div class="mt-2 mytextsize"> <ol> <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla officiis doloribus vitae omnis. Fugit, est quisquam.</li> <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, consequatur.</li> </ol> </div> </div> `

  document.querySelector('#achievementsSec').innerHTML = ach;
}

function addSectionBullet() {
  let ach = document.querySelector('#achievementsSec').innerHTML;

  ach += ` <div class="row mt-2"> <h6 class="text-primary fs-6" > Achievements <i class="bi bi-arrow-right-short"></i> </h6> <div class="mt-2 mytextsize"> <ul> <li>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla officiis doloribus vitae omnis. Fugit, est quisquam.</li> <li>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure, consequatur.</li> </ul> </div> </div> `

  document.querySelector('#achievementsSec').innerHTML = ach;
}


var addLangn = '';
function addLang() {
 document.querySelector('#addLangDialog').style.display = 'block';
 
}

function closeLangDialog() {
  document.querySelector('#addLangDialog').style.display = 'none';
}



function addLanguages() {
  
  let addLangn = '';

  avlLangs = document.getElementsByName('languages');

  languageArray = document.querySelector('#enteredLanguages').value.split(',');
  if (avlLangs.length == 1 && avlLangs[0].innerText === 'Language') {
    
    for (let o = 0; o < languageArray.length; o++) {
      
      addLangn += ` <p name="languages" class="border rounded-2 p-1 border-success border-1 ms-2 d-inline-block"> ${languageArray[o].trim()} </p> `
      
    }

    document.getElementById('langBlock').innerHTML = addLangn;
    document.querySelector('#addLangDialog').style.display = 'none';
    document.querySelector('#enteredLanguages').value = '';

  } else {
    addLangn = document.getElementById('langBlock').innerHTML;

    for (let t = 0; t < languageArray.length; t++) {
      
      addLangn +=  ` <p name="languages" class="border rounded-2 p-1 border-success border-1 ms-2 d-inline-block"> ${languageArray[t].trim()} </p> `
      
    }
    document.getElementById('langBlock').innerHTML = addLangn;
    document.querySelector('#addLangDialog').style.display = 'none';
    document.querySelector('#enteredLanguages').value = '';

  }
}





function addHobbie() {

  document.querySelector('#hobbieDialog').style.display = 'block';

  }

function closeHobbieDialog() {
  document.querySelector('#hobbieDialog').style.display = 'none';
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
    document.querySelector('#hobbieDialog').style.display = 'none';
    document.querySelector('#hobbiesTextarea').value = '';

  } else {
    addHobbiehtml = document.getElementById('hobbiesBlock').innerHTML;

    for (let x = 0; x < enteredHobbies.length; x++) {
      
      addHobbiehtml += ` <p class="border rounded-2 p-2 border-primary border-1 ms-2 d-inline-block" > ${enteredHobbies[x].trim()} </p> `;
    }

    document.getElementById('hobbiesBlock').innerHTML = addHobbiehtml;
    document.querySelector('#hobbieDialog').style.display = 'none';
    document.querySelector('#hobbiesTextarea').value = '';

  }


}


function saveData() {
 disableEdit()
 let bodyhml = document.body.innerHTML;
 localStorage.setItem('htmltext', JSON.stringify(bodyhml));
}

function editDocument() {
 document.body.contentEditable = true;
 document.querySelector('#enableEditBtn').style = 'display: none;';
 document.querySelector('#disableEditBtn').style = 'display: block;';

}
function disableEdit() {
 document.body.contentEditable = false;
 document.querySelector('#enableEditBtn').style = 'display: block;';
 document.querySelector('#disableEditBtn').style = 'display: none;';
 
}

function readyPrint() {
 if (profileImgCh == undefined) {
 document.querySelector('#profileImg').style = 'display: block;';
 document.getElementById('hideUploadBtns').style = 'display: none;';
 }

 contentsToHide = document.querySelectorAll('.contentToHide');

 for (let i = 0; i < contentsToHide.length; i++) {
 contentsToHide[i].style = 'display: none';
 }
 document.querySelector('.lastContentHide').style = 'display: none';

 let edDelbtns = document.getElementsByName('delEdrowBtn');


 for (let l = 0; l < edDelbtns.length; l++) {
  
  edDelbtns[l].style.display = 'none';
  
 }


}





if (localStorage.getItem('htmltext')) {
 document.querySelector('#loadPreviousDataBtn').style = 'display: block;';
}




function retriveData() {
 disableEdit()
 let userData = localStorage.getItem('htmltext');
 document.body.innerHTML = JSON.parse(userData);

}