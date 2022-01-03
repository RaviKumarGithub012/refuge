/**
 *In this whole file we're performing the validation check based on regex code
 * So we're taking string/number from the validation methods in these following methods to test wheather that string matches our regex code or not, If not than return false
 * All the following methods are similar logic
 */

import Regex from "../../regex/Regex"

const isProdNameValid = (val) => {
  if (val?.length > 2) {
    return true
  } else return false
}

const idProdIdValid = (val) => {
  if (val) {
    if (!isNaN(val) && val.length === 5) {
      return true
    } else return false
  } else return false
}

const isInventoryValid = (val) => {
  if (val) {
    if (!isNaN(val) && Regex.numeric.test(val) && val % 1 === 0) {
      return true
    } else return false
  } else return true
}

const isPriceValid = (val) => {
  if (val) {
    if (!isNaN(val) && val.length <= 11) {
      return true
    } else return false
  } else return false
}

export { isProdNameValid, idProdIdValid, isInventoryValid, isPriceValid }
