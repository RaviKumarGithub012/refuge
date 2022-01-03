/**
 * This component is created for form select and multiselect
 * Multiselect call through react-multi-select-component
 */
import React, { useState, useEffect, useRef } from "react";
import MultiSelect from "react-multi-select-component";


const FormSelect = ({
  onChange,
  name,
  isRequired = false,
  id = "_id",
  valKey,
  data = [],
  className = "form-control select-control",
  label = "Select",
  value = "",
  multiple = false,
  active = "",
  error = "pleaseFillInTheRequired",
  isDisabled = false,
  infoNote = "",
  isNotZero = null,
  isReset = false
}) => {
  const [isValue, setIsValue] = useState("");
  const [isReqEmpty, setIsReqEmpty] = useState(false);
  const selectRef = useRef(null);

  useEffect(() => {
    if (isReset) selectRef.current.selectedIndex = 0;
  }, [isReset]);

  /**
   * This function is used for Handle the select value
   */
  const handleInputChange = (val) => {
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
    } else {
      setIsValue('');
    }
  }, [value]);

  return (
    <>
      <div className="form-group">
        {/**
         * This Label is used for form select with required attribute vaidation
         */}
        <label>
          {label}
          {isRequired && <span className="required">*</span>}
        </label>
        {multiple ? (
          /**
           * Multiselect use through react-multi-select-component module
           */
          <MultiSelect
            options={data}
            value={isValue}
            onChange={(val) => handleInputChange(val)}
            className={`${className} ${active} ${isValue.length > 0 ? "populate" : ""
              }`}
            hasSelectAll={false}
            disableSearch={true}
          />
        ) : (
          /**
           * Here we use select as common select for whole App with all defined attributes
           */
          <select
            onChange={(e) => handleInputChange(e.target.value)}
            value={isValue}
            name={name}
            className={`${className} ${active} ${isValue ? "populate" : ""}`}
            onFocus={handleOnFocus}
            onBlur={handleOnBlur}
            disabled={isDisabled}
            ref={selectRef}
          >
            <option value="">Select</option>
            {data.length > 0 ? (
              data?.map((a, i) => {
                if (a[valKey] !== null) {
                  return (
                    <option
                      key={a[id]}
                      value={a[id]}
                      defaultValue={isValue === a[id]}
                    >
                      {a[valKey]}
                    </option>
                  );
                }

              })
            ) : (
              <option value="">{"noDataFound"}</option>
            )}
          </select>
        )}
      </div>

      {/**
       * This info note is represent the input information
       */}
      {infoNote && <label className="info-note">{infoNote}</label>}

    </>
  );
};

export default FormSelect;
