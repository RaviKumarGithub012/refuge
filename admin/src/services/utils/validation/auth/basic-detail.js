/**
 *In this whole file we're performing the validation check based on regex code
 * So we're taking string/number from the validation methods in these following methods to test wheather that string matches our regex code or not, If not than return false
 * All the following methods are similar logic
 */

import Regex from "../../regex/Regex"

const name = (val) => {
  if (Regex.name.test(val)) {
    return true
  }
  return false
}

const email = (val) => {
  if (Regex.email.test(val)) {
    return true
  }
  return false
}

const farm_trade_name = (val) => {
  if (Regex.farmName.test(val)) {
    return true
  }
  return false
}

const address_line = (val) => {
  if (Regex.address.test(val)) {
    return true
  }
  return false
}

export const address_line2 = (val) => {
  if (Regex.address2.test(val)) {
    return true
  }
  return false
}

const isValValid = (val) => {
  if (val) {
    return true
  }
  return false
}

const isMsgValid = (val) => {
  let newval = val.trim()

  if (newval.length >= 10) {
    return true
  }
  return false
}

export { name, email, farm_trade_name, address_line, isValValid, isMsgValid }
