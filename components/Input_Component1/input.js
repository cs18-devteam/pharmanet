class Validate {
  // constructor() {
  //   this.input = input;
  // }





  static emailCondition(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const comment = "Please enter a valid email address.";
    return {isValid: emailRegex.test(email.trim()), comment};
  };

  static Date(value) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const comment = "Please enter a valid date in YYYY-MM-DD format.";
    return {isValid: dateRegex.test(value.trim()), comment};
  }

  static Username(value) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const comment = "Please enter a valid username.";
    return {isValid: usernameRegex.test(value.trim()), comment};
  }

  static IdentityCardNumber(value) {
  const trimmed = value.trim();
  const comment = "Please enter a valid identity card number.";

  // Check: must start with a digit
  if (!/^[0-9]/.test(trimmed)) return {isValid: false, comment};

  // If exactly 10 characters: must be 8 digits + 1 uppercase letter
  if (/^\d{9}[A-Z]$/.test(trimmed)) return {isValid: true, comment};

  // If exactly 12 characters: must be 12 digits
  if (/^\d{12}$/.test(trimmed)) return {isValid: true, comment};

  // All other cases are invalid
  return {isValid: false, comment};
}


  // Accepts the isValid status and input element
  static validateInput(result, input) {
    const form = input.closest('form'); // ✅ Get the closest form element
    const feedback = form.querySelector('span'); // ✅ Get the feedback span within the form
    if (result.isValid) {
      input.classList.remove('invalid');
      input.classList.add('valid');
      feedback.textContent = '';
      feedback.className = 'success';
      return true;
    } else {
      input.classList.remove('valid');
      input.classList.add('invalid');
      feedback.textContent = result.comment || "Invalid input.";
      feedback.className = 'error';
      return false;
    }
  }


   /**
  * 
  * @param {HTMLInputElement} inputId accept HTMLInputElement through it's Id
  * @param {Function} validateFunction accept a validation function that returns true or false and take value as parameter
  * 
  * 
  * @description this function is created for applying the validation to each input field by taking inputID and validationCondition as it's input parameters .please read examples...
  *
  * 
  * @example 
  * // Usage Examples (1)
  * // change only the inputId and valdationCondition according to the need
  *  Validate.applyValidation('email', Validate.emailCondition);
  * 
  * 
  * 
  */




  static applyValidation(inputId, validateFunction) {
    const inputElement = document.getElementById(inputId);
    inputElement.addEventListener('input', function () {
      const result = validateFunction(this.value); 
      Validate.validateInput(result, inputElement); 
  });

    const validator = new Validate(inputElement.value);

    const validatorCondition = validateFunction;

    document.getElementById('form').addEventListener('submit', function (e) {
      const inputValue = inputElement.value;
      const isValid = validatorCondition(inputValue);

    });
  }
}




// Call the static method from the class
Validate.applyValidation('email', Validate.emailCondition);
Validate.applyValidation('idNumber', Validate.IdentityCardNumber);
Validate.applyValidation('userName', Validate.Username);
Validate.applyValidation('Date', Validate.Date);




