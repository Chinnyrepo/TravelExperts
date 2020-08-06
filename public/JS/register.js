//Chinenye Okpalanze CO
function myFunction(element, display) {
  element.previousElementSibling.style.display = display;
}

// Disable form submissions if there are invalid fields
(function() {
  'use strict';
  window.addEventListener('load', function() {
    // Get the forms we want to add validation styles to
    let forms = document.getElementsByClassName('needs-validation');
    // Loop over them and prevent submission
    let validation = Array.prototype.filter.call(forms, function(form) {
      form.addEventListener('submit', function(event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

// Function for postal code validation
function validate(form){
  let firstname = document.getElementById("firstname");
  let lastname = document.getElementById("lastname");
  let password = document.getElementById("password");
  let retypepassword = document.getElementById("retypepassword");
  let email = document.getElementById("email");
  let homephone = document.getElementById("homephone");
  let busphone = document.getElementById("businessphone");

  
  
  let postalCode = document.getElementById("inputpo");
  console.log(postalCode);
  let reg = new RegExp(/[A-Za-z][0-9][A-Za-z]\s[0-9][A-Za-z][0-9]/);
  console.log(reg.test(postalCode));
  if(reg.test(postalCode.value) == false){
    event.preventDefault();
    alert('Invalid postal code.');
    postalCode.focus();
    return false;
  }

  if(firstname.value.length <2){
    event.preventDefault();
    alert('Invalid firstname.');
    firstname.focus();
    return false;
  }
  
  if(lastname.value.length <2){
    event.preventDefault();
    alert('Invalid lastname.');
    lastname.focus();
    return false;
  }
  
  if(password.value.length < 2){
    event.preventDefault();
    alert('Invalid entry: password must contain be more than 8 characters.');
    password.focus();
    return false;
  }

  if(retypepassword.value != password.value){
    event.preventDefault();
    alert('Password must match.');
    password.focus();
    return false;
  }

  if(email.indexOf("@") == -1 || email.length < 6){
    event.preventDefault();
    alert('Please enter valid Email');
    email.focus();
	  return false;
  }

  if(homephone.value.length < 10){
    event.preventDefault();
    alert('Please enter a valid phone number.');
    homephone.focus();
    return false;
  }

  if(busphone.value.length < 10){
    event.preventDefault();
    alert('Please enter a valid business phone number.');
    busphone.focus();
    return false;
  }
}

// Function for adding sky-blue backgroudn color to the input fields
// Oyakhire Airende
function BlueFunction(x){
  x.style.background = "skyblue";
}

// Function for validating other form input fields
// Oyakhire Airende
var myInput = document.getElementById("password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");
 
// When the user clicks on the password field, show the message box
myInput.onfocus = function () {
  document.getElementById("message").style.display = "block";
}
 
// When the user clicks outside of the password field, hide the message box
myInput.onblur = function () {
  document.getElementById("message").style.display = "none";
}
 
// When the user starts to type something inside the password field
myInput.onkeyup = function () {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if (myInput.value.match(lowerCaseLetters)) {
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }
 
  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if (myInput.value.match(upperCaseLetters)) {
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }
 
  // Validate numbers
  var numbers = /[0-9]/g;
  if (myInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }
 
  // Validate length
  if (myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}

function redfunction(x){
  alert("Thank you for logging in");
}