export function validateLoginForm({
  login,
  password,
  setLoginError,
  setPasswordError,
}) {
  let isValid = true;

  if (!login.trim()) {
    setLoginError("Логин не может быть пустым");
    isValid = false;
  } else if (login.length < 5) {
    setLoginError("Логин должен содержать минимум 5 символов");
    isValid = false;
  } else {
    setLoginError("");
  }

  if (!password.trim()) {
    setPasswordError("Пароль не может быть пустым");
    isValid = false;
  } else if (password.length < 4) {
    setPasswordError("Пароль должен содержать минимум 4 символа");
    isValid = false;
  } else {
    setPasswordError("");
  }

  return isValid;
}
