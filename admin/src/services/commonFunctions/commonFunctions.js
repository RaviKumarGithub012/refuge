import _ from "lodash";


/**
 * @description: DataStorage for get, add and remove from local storage.
 * **/

export const DataStorage = {
  getStorData: key => {
    return JSON.parse(localStorage.getItem(key));
  },
  setData: (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  },
  removedata: key => {
    localStorage.removeItem(key);
  },
  removeAllKey: () => { localStorage.clear(); return true; }
}


/**
 * @description: // check object is empty 
 */

export const checkEmpty = (data = {}) => { return _.isEmpty(data); }
