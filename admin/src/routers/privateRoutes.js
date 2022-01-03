import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

/**
 * This is a private route component
 * We check for "authenticated" from props which we passes from main routes
 * If the authenticates is false then we're navigating the user to login screen
 */

const PrivateRoute = ({ Component, authenticated }) => {
  console.log({authenticated});
  return !authenticated ? <Navigate to={"/login"} /> : <Component />;
};

/**
 * Here all the propTypes are defined for this particular component
 */

PrivateRoute.propTypes = {
  Component: PropTypes.element.isRequired,
  name: PropTypes.string.isRequired
};

export default PrivateRoute;
