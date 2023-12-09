let fn = 'null';
let ln = 'null';
let mail = 'null';

function formsubmit() {
  fn = document.querySelector('#firstname').value;
  ln = document.querySelector('#lastname').value;
  mail = document.querySelector('#usermail').value;


  charsToCheck = ['#', '%', '^', '*', '(', ')', '$', '=', '!']
  

  // for (let i = 0; i < charsToCheck.length; i++) {
  //   if (mail.includes(charsToCheck[i])) {
  //     document.querySelector('#mailwarn').innerText = 'Email is Invalid!';
  //     break;
  //   }
    
  // }
  
  
  





  
  // var fileInput = document.getElementById('profilepic');
  // var file = fileInput.files[0];
  // var reader = new FileReader();

  // reader.readAsDataURL(file);

  // reader.onload = function(e) {
  //   var img = document.getElementById('testimg');
  //   img.src = e.target.result;
  // }

}




// function submitForm() {
//   var fileInput = document.getElementById('profilePicInput');
//   var file = fileInput.files[0];
//   var reader = new FileReader();

//   reader.onload = function(e) {
//       var img = document.getElementById('profilePicPreview');
//       img.src = e.target.result;
//       img.style.display = 'block';
//   };

//   reader.readAsDataURL(file);
