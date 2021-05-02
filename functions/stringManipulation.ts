//Capitalize first letter of every word in the string
const capitalize = (string: string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

//Get the first word in the string
const firstWord = (string: string) => {
  return string.split(" ")[0];
};

export { capitalize, firstWord };
