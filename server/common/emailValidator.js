const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

exports.isValidEmail = (email) => {
  if (!email || typeof email !== "string") {
    return false;
  }
  return emailRegex.test(email.trim());
};

exports.validateEmail = (email) => {
  if (!email) {
    return {
      valid: false,
      message: "Email is required",
    };
  }

  if (typeof email !== "string") {
    return {
      valid: false,
      message: "Check your email again",
    };
  }

  if (!emailRegex.test(email.trim())) {
    return {
      valid: false,
      message: "email format is invalid",
    };
  }

  if (email.trim().length > 254) {
    return {
      valid: false,
      message: "email must be less than 255 characters",
    };
  }

  return {
    valid: true,
    message: "Email is valid",
  };
};
