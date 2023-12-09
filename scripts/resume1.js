document.querySelector('#disableEditBtn').style = 'display: none;';
document.querySelector('#loadPreviousDataBtn').style = 'display: none;';
document.querySelector('#profileImg').style = 'display: none;';

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
    }

  } else {
    console.log('Unsuccessful');
  }
}



let skills = [];

skillBlock = '';

function addSkill() {
  skillBlock = document.getElementById('skillsBlock').innerHTML;
  document.getElementById('skillsBlock').innerHTML = skillBlock + `<p class="border rounded-pill p-2 border-success border-2 ms-2 d-inline-block">Skill</p>`;

}

let experienceBlock = '';

function addExperience() {
  experienceBlock = document.getElementById('experienceBlock').innerHTML;
  document.getElementById('experienceBlock').innerHTML = experienceBlock + `<div class="row mt-4"> <div class="row mt-2"> <h6 class="insidehead"> <strong>Company name</strong> </h6> <p class="mytextsize">Designation</p> </div> <div class="row d-flex justify-content-between"> <div class="col"> <p class="mytextsize"> Jan/2020 - Present</p> <h6 class="mytextsize" >Description</h6> </div> <div class="col"> <p class="mytextsize text-end"> <i class="bi bi-geo-alt "></i> Karnataka, India </p> </div> </div> <div class="row mytextsize ms-3 me-1"> <ul> <li>Write your Experience Summary/Responsibilities Here</li> </ul> </div>`;
}

projectBlock = '';

function addProject() {
  projectBlock = document.getElementById('projectBlock').innerHTML;
  document.getElementById('projectBlock').innerHTML = projectBlock + `<div class="row mt-3 mytextsize justify-content-between"> <div class="col"> <p class="insidehead" > <strong>Project Name</strong> </p> <p class="mytextsize"> <strong>Client: </strong> xyz </p> <h6 class="mytextsize" >Description</h6> </div> <div class="col"> <p class="insidehead text-end" > Employer </p> <p class="insidehead text-end" > Additional Field ex: Period </p> </div> </div> <div class="row mytextsize ms-3"> <ul> <li>Describe yout Project Work</li> </ul> </div>`;
}

eduRow = '';
ednum = 2;
function addEDRow() {
  eduRow = document.getElementById('edurow').innerHTML;
  document.getElementById('edurow').innerHTML = eduRow + `<tr> <th scope="row"> ${ednum} .</th> <td>Course</td> <td>Institute</td> <td>Year from - Year to</td> </tr>`;
  ednum += 1;
}

var addLangn = '';
function addLang() {
  addLangn = document.getElementById('langBlock').innerHTML;
  document.getElementById('langBlock').innerHTML = addLangn + `<p class="border rounded-2 p-1 border-success border-1 ms-2 d-inline-block">Language</p>`;
}

var addHobbien = '';
function addHobbie() {
  addHobbien = document.getElementById('hobbiesBlock').innerHTML;
  document.getElementById('hobbiesBlock').innerHTML = addHobbien + `<p class="border rounded-2 p-2 border-primary border-1 ms-2 d-inline-block"> Hobbie </p>`;
}


function saveData() {
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
}

if (localStorage.getItem('htmltext')) {
  document.querySelector('#loadPreviousDataBtn').style = 'display: block;';
}

function retriveData() {
  let userData = localStorage.getItem('htmltext');
  document.body.innerHTML = JSON.parse(userData);
}