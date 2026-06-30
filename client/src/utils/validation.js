// Email validation
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Password validation (at least 6 chars, 1 uppercase, 1 number)
export const isValidPassword = (password) => {
  if (password.length < 6) {
    return { valid: false, message: 'Password must be at least 6 characters' };
  }
  if (!/[A-Z]/.test(password)) {
    return { valid: false, message: 'Password must contain at least 1 uppercase letter' };
  }
  if (!/[0-9]/.test(password)) {
    return { valid: false, message: 'Password must contain at least 1 number' };
  }
  return { valid: true, message: 'Password is valid' };
};

// Phone validation (Nepal format or general)
export const isValidPhone = (phone) => {
  const phoneRegex = /^[+]?[\d\s\-()]{7,}$/;
  return phoneRegex.test(phone);
};

// Login validation
export const validateLogin = (email, password) => {
  const errors = [];

  if (!email || !email.trim()) {
    errors.push('Email is required');
  } else if (!isValidEmail(email)) {
    errors.push('Email format is invalid');
  }

  if (!password || !password.trim()) {
    errors.push('Password is required');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

// User signup validation
export const validateUserSignup = (data) => {
  const errors = [];

  if (!data.fullName || !data.fullName.trim()) {
    errors.push('Full Name is required');
  }

  if (!data.email || !data.email.trim()) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Email format is invalid');
  }

  if (!data.phone || !data.phone.trim()) {
    errors.push('Phone number is required');
  } else if (!isValidPhone(data.phone)) {
    errors.push('Phone number format is invalid');
  }

  if (!data.vehicleType) {
    errors.push('Vehicle type is required');
  }

  if (!data.password || !data.password.trim()) {
    errors.push('Password is required');
  } else {
    const passwordCheck = isValidPassword(data.password);
    if (!passwordCheck.valid) {
      errors.push(passwordCheck.message);
    }
  }

  if (!data.confirmPassword || !data.confirmPassword.trim()) {
    errors.push('Confirm Password is required');
  } else if (data.password !== data.confirmPassword) {
    errors.push('Passwords do not match');
  }

  if (!data.agree) {
    errors.push('You must accept Terms & Conditions');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};

// Station owner signup validation
export const validateStationSignup = (data) => {
  const errors = [];

  if (!data.fullName || !data.fullName.trim()) {
    errors.push('Full Name is required');
  }

  if (!data.businessName || !data.businessName.trim()) {
    errors.push('Business Name is required');
  }

  if (!data.email || !data.email.trim()) {
    errors.push('Email is required');
  } else if (!isValidEmail(data.email)) {
    errors.push('Email format is invalid');
  }

  if (!data.phone || !data.phone.trim()) {
    errors.push('Phone number is required');
  } else if (!isValidPhone(data.phone)) {
    errors.push('Phone number format is invalid');
  }

  if (!data.stationLocation || !data.stationLocation.trim()) {
    errors.push('Station location is required');
  }

  if (!data.password || !data.password.trim()) {
    errors.push('Password is required');
  } else {
    const passwordCheck = isValidPassword(data.password);
    if (!passwordCheck.valid) {
      errors.push(passwordCheck.message);
    }
  }

  if (!data.confirmPassword || !data.confirmPassword.trim()) {
    errors.push('Confirm Password is required');
  } else if (data.password !== data.confirmPassword) {
    errors.push('Passwords do not match');
  }

  if (!data.agree) {
    errors.push('You must accept Terms & Conditions');
  }

  return {
    valid: errors.length === 0,
    errors
  };
};
