/*Utility for encrypting and decrypting data*/

import cryptr from "cryptr";

//Get cryptr key form .env
const cryptrKey = process.env.CRYPTR_SECRET_KEY;

const encrypt = (data: any): string | undefined => {
  let stringifiedData = data; //Assign data argument to a variable

  //Check if data is a string type else Stringify it
  if (typeof stringifiedData !== "string")
    stringifiedData = JSON.stringify(data);

  //Generate new cryptr
  let newCryptr: any;
  if (cryptrKey) newCryptr = new cryptr(cryptrKey);

  //Encrypt data and return the value
  let encryptedDataString: any;
  try {
    encryptedDataString = newCryptr?.encrypt(stringifiedData);
  } catch (err) {
    console.log(`encrypt: ${err}`);
    encryptedDataString = null;
  }

  return encryptedDataString;
};

const decrypt = (encryptedString: string): any | undefined => {
  //Check if encrypted string is a string, else return undefined
  if (typeof encryptedString !== "string") return undefined;

  //Generate new cryptr
  let newCryptr: any;
  if (cryptrKey) newCryptr = new cryptr(cryptrKey);

  //Decrypt data and return the value
  let decryptedData: any;
  try {
    decryptedData = newCryptr?.decrypt(encryptedString);
  } catch (err) {
    console.log(`decrypt: ${err}`);
    decryptedData = null;
  }

  return decryptedData ? JSON.parse(decryptedData) : undefined;
};

export { encrypt, decrypt };
