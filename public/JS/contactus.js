//Chinenye Okpalanze
function myFunction(element, display) {
    element.previousElementSibling.style.display = display;
  }

function validate(){
	var firstname = document.getElementById("firstname").value;
	var lastname = document.getElementById("lastname").value;
	var email = document.getElementById("email").value;
	var subject = document.getElementById("subject").value;
	var message = document.getElementById("message").value;
	var error_message = document.getElementById("error_message");
	
	error_message.style.padding = "10px";
	error_message.style.color = "white";
	error_message.style.fontSize = "1.3vw";
	error_message.style.border = "4px solid rgb(0, 0, 255)";
	error_message.style.backgroundColor = "red";
	
	var text;
	if(firstname.length < 2){
	  text = "Please enter a valid First Name";
	  error_message.innerHTML = text;
	  return false;
	}
	if(lastname.length < 2){
	  text = "Please enter valid Last Name";
	  error_message.innerHTML = text;
	  return false;
	}
	if(email.indexOf("@") == -1 || email.length < 6){
	  text = "Please enter valid Email";
	  error_message.innerHTML = text;
	  return false;
	}
	if(subject.length < 5){
	  text = "Please enter correct subject";
	  error_message.innerHTML = text;
	  return false;
	}
	if(message.length <= 10){
	  text = "Please enter more than 10 characters";
	  error_message.innerHTML = text;
	  return false;
	}
	return true;
  }