/**
 * This file contains the regex code for the validations
 * Here in isArabic variable we're checking if the localization is arabic or english, based on this we're setting for regex for respective language
 */

const isArabic = localStorage.getItem("lang") === "ar"

const Regex = {
  latLong: /^-?([1-8]?[1-9]|[1-9]0)\\.{1}\\d{1,6}/,
  email:
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  charSpace: /^([a-zA-Z_ ]+)$/,
  charSpaceWIthSpaicalChar: /^[ A-Za-z0-9_@/#&+-,($)*!%/]*$/,
  charSpaceWIthSpaicalCharElement: /^[ A-Za-z0-9_@+-,($)]*$/,
  charSpacenumberWIthSpaicalChar: /^[ A-Za-z0-9_@./#&+-,($)*!%/]*$/,
  numeric: /^\d+$/,
  text: /^[a-zA-Z .]+$/,
  number: /^\d+$/,
  mobileNumber: /^(0|[+971]{4})?[1-9][0-9]{8}$/,
  phoneNumber: /[0-9]{9}/,
  pinCode: /^(\d{4}|\d{6})$/,
  alphaNumeric: /^[a-zA-Z0-9_., ]+$/,
  alphaNum: /^[a-zA-Z0-9 ]+$/,
  toFixed: /^(?:\d*\.\d{1,2}|\d+)$/,
  decimalNum: /^\d+\.\d{0,2}$/,
  numericNotZero: /^[+]?[1-9]\d*$/,
  password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])^.{6,15}$/,
  otp: /^.{4}$/,
  name: isArabic
    ? /[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFA-Za-z]{3,30}/
    : /^[a-zA-Z\s]{3,30}$/,
  farmName: isArabic
    ? /[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFA-Za-z&,’ ]{3,65}/
    : /^[a-zA-Z ,\_\@\ \!\\\&\'\(\)\/"]{3,65}$/,
  address: isArabic
    ? /[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFA-Za-z0-9&,’!~@#$%^&*(){ }"<>.?]{3,50}/
    : /^[A-Za-z0-9&,’!~@#$%^&*(){ }"<>.?]{3,50}$/,
  address2: isArabic
    ? /[\u0600-\u065F\u066A-\u06EF\u06FA-\u06FFA-Za-z0-9&,’!~@#$%^&*(){ }"<>.?]{3,50}/
    : /^[A-Za-z0-9&,’!~@#$%^&*(){ }"<>.?]{3,50}$/,
  inventory: /^[0-9]{0,5}$/,
  priceDetail: /^(?:\d*\.\d{1,2}|\d+){6}$/,
  textarea: /^[a-zA-Z0-9 ]{10,300}$/,
}

export default Regex
