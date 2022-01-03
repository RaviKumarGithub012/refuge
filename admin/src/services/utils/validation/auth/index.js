/**
 *In this whole file we're performing the validation check based on regex code
 * So we're taking string/number from the validation methods in these following methods to test wheather that string matches our regex code or not, If not than return false
 * All the following methods are similar logic
 */

import Regex from "../../regex/Regex";

const mobileNo = (val) => {
  let num = val.split("");
  if (num.length !== (process.env.REACT_APP_COUNTRY_CODE == "91" ? 10 : 9))
    return false;
  const result = Regex.phoneNumber.test(val);
  return result;
};

const passwordLength = (val) => {
  if (val?.length >= 6 && val?.length <= 15) {
    return true;
  } else return false;
};

const isPasswordValid = (val) => {
  if (Regex.password.test(val)) {
    return true;
  } else return false;
};

const otp = (val) => {
  if (Regex.otp.test(val)) {
    return true;
  } else return false;
};

const numberVal = (val) => {
  if (Regex.number.test(val)) {
    return true;
  } else return false;
};

export { mobileNo, isPasswordValid, numberVal, passwordLength, otp };
