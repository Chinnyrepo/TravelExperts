//Chinenye Okpalanze 
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

  
  //Chikaodili Ikechukwu/Oyakhire Airende
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
  
  if(password.value.length < 6){
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

  if(homephone.length < 10){
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

// Function for adding sky-blue background color to the input fields
// Oyakhire Airende
function BlueFunction(x){
  x.style.background = "skyblue";
}
