export const validateEmail = (email) => {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 6;
};

export const validateRegistration = (data) => {
  const errors = {};

  if (!data.name || data.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters long";
  }

  if (!data.email || !validateEmail(data.email)) {
    errors.email = "Please provide a valid email address";
  }

  if (!data.password || !validatePassword(data.password)) {
    errors.password = "Password must be at least 6 characters long";
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
