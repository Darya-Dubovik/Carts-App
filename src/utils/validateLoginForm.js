export function validateLoginForm({
  login,
  password,
  setLoginError,
  setPasswordError,
}) {
  let isValid = true;

  if (!login.trim()) {
    setLoginError("Логин не должен быть пустым");
    isValid = false;
  } else if (login.length < 5) {
    setLoginError("Логин должен содержать не менее 5 символов");
    isValid = false;
  } else {
    setLoginError("");
  }

  if (!password.trim()) {
    setPasswordError("Пароль не должен быть пустым");
    isValid = false;
  } else if (password.length < 4) {
    setPasswordError("Пароль должен содержать не менее 4 символов");
    isValid = false;
  } else {
    setPasswordError("");
  }

  return isValid;
}
