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

   // Function for form validation
    function validate(form){
      let postalCode = document.getElementById("inputpo");
      console.log(postalCode);
      let reg = new RegExp(/[A-Za-z][1-9][A-Za-z]\s[1-9][A-Za-z][1-9]/);
      console.log(reg.test(postalCode));
      if(reg.test(postalCode.value) == false){
        event.preventDefault();
        alert('Invalid postal code.');
        postalCode.focus();
        return false;
      }
    }