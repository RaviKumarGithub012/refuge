/**
 * This component is created for form input with all attributes.
 */
import React, { useState, useEffect } from "react";
import Regex from "../../../services/utils/regex/Regex";
import { useDispatch } from "react-redux";
import { showHideToast } from "../../../services/redux/appNotifications/action";

const FormInput = ({
  onChange = () => {},
  placeholder = "",
  className = "form-control",
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
  suggestionList = [],
  regex = null,
  isNotZero = null,
  inputMode = "text",
  isPrice = false,
  isSearch = false,
}) => {
  const [isValue, setIsValue] = useState("");
  const [isReqEmpty, setIsReqEmpty] = useState(false);
  const dispatch = useDispatch();

  /**
   * This function is used for Handle the input value
   */
  const handleInputChange = (e) => {
    let val = e.target ? e.target.value : e;
    if (type === "number") {
      if (Regex.numeric.test(val)) {
        if (val.length > maxLength) return;
      }
    }

    /**
     * Set class on validation check if required and not value in input
     */
    if (isRequired && !val) {
      setIsReqEmpty(true);
      if (e.target) e.target.classList.add("empty");
    } else {
      setIsReqEmpty(false);
      if (e.target) e.target.classList.remove("empty");
    }

    if (isPrice && val) {
      if (`${val}`.length > 1 && Number(val) < 0) {
        return dispatch(showHideToast(true, 'negativePriceError'));
      }

      const _decimalCheck = `${val}`.split(".");
      if (_decimalCheck.length > 1 && _decimalCheck[1].length > 4) {
        return dispatch(showHideToast(true, "4decimalError"));
      }
    }

    setIsValue(val.replace(/\s+/g, " "));
    if (onChange) onChange(val.replace(/\s+/g, " "));
  };

  /**
   * This function is used for input label animation on focus
   */
  const handleOnFocus = (e) => {
    if (e.target) e.target.classList.add("active");

    if (isRequired && !isValue) {
      setIsReqEmpty(true);
    } else setIsReqEmpty(false);
  };

  /**
   * This function is used for input label animation on blur
   */
  const handleOnBlur = (e) => {
    const val = e.target ? e.target.value : e;
    if (e.target) e.target.classList.remove("active");
    if (val && val.length) {
      if (e.target) e.target.classList.add("populate");
    } else {
      if (e.target) e.target.classList.remove("populate");
    }

    if (isRequired && !isValue) {
      setIsReqEmpty(true);
    } else setIsReqEmpty(false);

    if (isNotZero !== null && isNotZero !== undefined) {
      setIsValue(val.replace(/^0+/, ""));
    } else if (val) {
      setIsValue(val.trim(""));
    }
  };

  useEffect(() => {
    if (value) {
      setIsValue(value);
    }
  }, [value]);

  return (
    <>
      <div className="form-group">
        {/**
         * This Label is used for form input with required attribute vaidation
         */}
        <label>
          {label}
          {isRequired && <span className="required">*</span>}
        </label>
        <input
          onChange={(e) => handleInputChange(e)}
          placeholder={placeholder}
          type={type}
          name={name}
          className={`${className} ${active} ${value ? "populate" : "empty"}`}
          onFocus={handleOnFocus}
          onBlur={handleOnBlur}
          minLength={minLength}
          maxLength={maxLength}
          disabled={isDisabled}
          autoComplete={isAutoComplete}
          value={isValue}
          inputMode={inputMode}
        />
      </div>
      {/**
       * This info note is represent the input information
       */}
      {infoNote && <label className="info-note">{infoNote}</label>}
    </>
  );
};

export default FormInput;
