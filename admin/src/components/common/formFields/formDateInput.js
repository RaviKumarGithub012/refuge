/**
 * This component is created for input date calendar
 */

import React from "react";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

/**
 * Making the date string in dd-MMM-yyyy format (eg. 10-Jun-2021)
 */
const getDateFormat = (_date) => {
  const date = new Date(_date);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

/**
 * This function is used for input label animation on focus
 */
const handleOnFocus = (e) => {
  e.target.parentNode.parentNode.classList.add("active");
};

/**
 * This function is used for input label animation on blur
 */
const handleOnBlur = (e) => {
  const val = e.target.value;
  e.target.parentNode.parentNode.classList.remove("active");
  if (val && val.length) {
    e.target.parentNode.parentNode.classList.add("populate");
  } else {
    e.target.parentNode.parentNode.classList.remove("populate");
  }
};

const FormDateInput = (props) => {
  const { value = null, onChange, label } = props;
  return (
    <div className="ap-formGroup">
      <div className="ap-inputOuter">
        {/**
         * Here we are using datepicker module for date input
         */}
        <DatePicker
          dateFormat="dd-mm-yyyy"
          selected={value}
          value={value}
          onChange={(date) => onChange(getDateFormat(date))}
          className="ap-formControl"
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          {...props}
        />
        {/**
         * Here we use label form date input
         */}
        <label className="ap-formLabel">{label}</label>
      </div>
    </div>
  );
};

export default FormDateInput;
