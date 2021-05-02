import isEmail from "sane-email-validation";

//Checks email format
const validateEmailFormat = (email: string = ""): boolean => {
  if (!email || email === "") return false;
  return isEmail(email);
};

//Check if full name is first and last name (contains at least 2 words with  minimum length of 2)
const validateFullName = (fullName: string = ""): boolean => {
  if (!fullName || fullName === "") return false;
  const minNameLength = 2;
  const fullNameSplit = fullName.split(" ");

  if (!fullNameSplit[0] || !fullNameSplit[1]) {
    return false;
  }

  if (
    (fullNameSplit[0] && fullNameSplit[0].length < minNameLength) ||
    (fullNameSplit[1] && fullNameSplit[1].length < minNameLength)
  ) {
    return false;
  }

  return true;
};

//Check if password length is t least 6
const validatePassword = (password: string | undefined | null): boolean => {
  if (!password) return false;
  return password.length > 5;
};

//Check if text contains at least one character
const validateTextExists = (text: string | undefined | null) => {
  if (!text) return false;
  return ("" + text).length > 0;
};

export {
  validateEmailFormat,
  validateFullName,
  validatePassword,
  validateTextExists,
};
