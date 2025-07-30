class Validate {
  constructor(input) {
    this.input = input;
  }

  // Apply a validation function to an input field dynamically
  static apply(inputId, validateFunction) {
    const inputElement = document.getElementById(inputId);
    inputElement.addEventListener('input', function () {
      const result = validateFunction(this.value); // ✅ Uses the passed function
      Validate.validateInput(result, inputElement); // ✅ Pass element directly
    });
  }

  static emailCondition(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const comment = "Please enter a valid email address.";
    return {isValid: emailRegex.test(email.trim()), comment};
  }

  static validateDate(value) {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    const comment = "Please enter a valid date in YYYY-MM-DD format.";
    return {isValid: dateRegex.test(value.trim()), comment};
  }

  static validateUsername(value) {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    const comment = "Please enter a valid username.";
    return {isValid: usernameRegex.test(value.trim()), comment};
  }

  static validateIdentityCardNumber(value) {
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
    const feedback = document.getElementById('feedback');
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
}

// ✅ Get the actual input element (not just its value)
const inputElement = document.getElementById('Input');

// ✅ Create instance without overwriting class name
const validator = new Validate(inputElement.value);

// ✅ condition to change according to the input type
const validatorCondition =  Validate.validateDate;

// ✅ Handle form submission
document.getElementById('Form').addEventListener('submit', function (e) {
  const inputValue = inputElement.value;
  const isValid = validatorCondition(inputValue);
  const result = validatorCondition(inputElement.value);

  if (!Validate.validateInput(isValid, inputElement)) {
    e.preventDefault();
  }
});

// ✅ Apply real-time validation
Validate.apply('Input', validatorCondition);

console.log("input: ", inputElement.value);
console.log("isValid: ", validatorCondition(inputElement.value));
