export function validateLoginForm({
  login,
  password,
  setLoginError,
  setPasswordError,
}) {
  let isValid = true;

  if (!login.trim()) {
    setLoginError("Login cannot be empty");
    isValid = false;
  } else if (login.length < 5) {
    setLoginError("Login must be at least 5 characters long");
    isValid = false;
  } else {
    setLoginError("");
  }

  if (!password.trim()) {
    setPasswordError("Password cannot be empty");
    isValid = false;
  } else if (password.length < 4) {
    setPasswordError("Password must be at least 5 characters long");
    isValid = false;
  } else {
    setPasswordError("");
  }

  return isValid;
}
