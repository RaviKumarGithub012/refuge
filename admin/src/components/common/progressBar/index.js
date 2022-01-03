/**
 * This component is create for Dashboard graph progress
 */

import React from "react"
import { withTranslation } from "react-i18next"
const ProgressBar = ({
  t,
  productName = "",
  totalAmount = 0,
  progress = 0,
  uom = "",
  progressBg = "blue",
  qty = "",
}) => {
  return (
    <div className="inner-block">
      <div className="flex-row space-between bar-title-row">
        <label className="bar-title">{productName}</label>
        <span>{`${totalAmount} ${t("aed")}`} </span>
      </div>
      {
        /**
         * Here we're showing the progress bar for product quantity or UOM
         */
      }
      <div className="progress-bar">
        <div className="progress-track">
          <div
            style={{ width: `${progress}%` }}
            className={`progress-filled ${progressBg}`}
          ></div>
        </div>
      </div>
      <div className="prod-uom">
        <label>{progressBg === "red" ? t("quantity") : t("uom")}</label>
        <span> {`${progressBg === "red" ? qty : ""} ${uom}`}</span>
      </div>
    </div>
  )
}

export default withTranslation()(ProgressBar)
