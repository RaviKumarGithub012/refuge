/**
 * this component is used for Data not found if the data id  not available from the API
 */

import React from "react";
import noItem from "../../../assets/images/icons/no-item.svg";

const DataNotFound = ({ desc = "dataNotFound" }) => {
  return (
    <div className="data-not-found text-center">
      <div>
        {/**
         * Here we use no items image
         */}
        <img src={noItem} alt="" />
      </div>
      <p className="not-found-text m-t-10">{desc}</p>
    </div>
  )
}

export default DataNotFound;