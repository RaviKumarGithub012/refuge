/**
 * This component is created for form textarea as common form field with all attributes.
 */

import React, { useState, useEffect } from "react";
import Regex from "../../../services/utils/regex/Regex";

const FormTextarea = ({
  onChange = () => {},
  placeholder = "",
  className = "ap-formControl",
  type = "text",
  name = "",
  minLength = "",
  maxLength = "",
  isRequired = false,
  label = "",
  error = "pleaseFillInTheRequired",
  errorMsg = "pleaseEnterValid",
  isDisabled = false,
  active = "",
  value = "",
  infoNote = "",
  isAutoComplete = "off",
  regex = null,
  isNotZero = null,
  inputMode = "text",
  rows = 4,
}) => {
  const [isValue, setIsValue] = useState("");
  const [isReqEmpty, setIsReqEmpty] = useState(false);

  /**
   * This function is used for Handle the input value
   */
  const handleInputChange = (val) => {
    let test = Regex.alphaNumeric.test(val);
    if (val.length > 0 && !test) {
      return;
    }
    /**
     * Set class on validation check if required and not value in input
     */
    if (isRequired && !val) {
      setIsReqEmpty(true);
    } else setIsReqEmpty(false);

    setIsValue(val);
    if (onChange) onChange(val);
  };

  /**
   * This function is used for input label animation on focus
   */
  const handleOnFocus = (e) => {
    e.target.classList.add("active");

    if (isRequired && !isValue) {
      setIsReqEmpty(true);
    } else setIsReqEmpty(false);
  };

  /**
   * This function is used for input label animation on blur
   */
  const handleOnBlur = (e) => {
    const val = e.target.value;
    e.target.classList.remove("active");
    if (val && val.length) {
      e.target.classList.add("populate");
    } else {
      e.target.classList.remove("populate");
    }

    if (isRequired && !isValue) {
      setIsReqEmpty(true);
    } else setIsReqEmpty(false);

    if (isNotZero !== null && isNotZero !== undefined) {
      setIsValue(val.replace(/^0+/, ""));
    }
  };

  useEffect(() => {
    if (value) {
      setIsValue(value);
    }
  }, [value]);

  return (
    <div className="ap-formGroup">
      <div className="ap-inputOuter">
        {/**
         * Here we use textarea as common form field for whole App.
         */}
        <textarea
          onChange={(e) => handleInputChange(e.target.value)}
          placeholder={placeholder}
          type={type}
          name={name}
          className={`${className} ${active} ${value ? "populate" : ""}`}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          maxLength={maxLength}
          disabled={isDisabled}
          autoComplete={isAutoComplete}
          value={isValue}
          inputMode={inputMode}
          rows={rows}
        />
        {/**
         * This Label is used for form textarea with required attribute vaidation
         */}
        <label className="ap-formLabel">
          {label}
          {isRequired && <span className="required">*</span>}
        </label>
      </div>
      {/**
       * This info note is represent the input information
       */}
      {infoNote && <label className="info-note">{infoNote}</label>}

      {/**
       * This label show and hide error text accoding to condition
       */}
      <label
        className={`ap-formError ${
          (isValue && regex !== null && !regex) || isReqEmpty
            ? "d-block"
            : "d-none"
        }`}
      >
        {isReqEmpty ? `${label} ${error}` : errorMsg}
      </label>
    </div>
  );
};

export default FormTextarea;
