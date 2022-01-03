/**
 * This page is designed to show the error screen if crash or error occured on frontend side
 * Something went wrong message will show
 */

import React from "react";
import PropTypes from "prop-types";
// import CommonLayout from "../../../components/common/layouts/commonLayout";

const ErrorPage = ({  goBack }) => {
  return (
    // <CommonLayout>
      <div className="content-wrapper hieght-100 flex-row justify-center align-center">
        <div className="oppsWrong-box">
          <h2>{"oppsWrong"}</h2>
          <button className="button button-primary" onClick={goBack}>
            {"myDashboard"}
          </button>
        </div>
      </div>
    // </CommonLayout>
  )
}

ErrorPage.propTypes = {
  goBack: PropTypes.any,
}

export default ErrorPage;
