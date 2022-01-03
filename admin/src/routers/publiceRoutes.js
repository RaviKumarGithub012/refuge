import React from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router-dom";

/**
 * This is a public route component
 * We check for "authenticated" && "restricted" from props which we passes from main routes
 * If the authenticates is false then we're navigating the user to login screen
 * If the user's session is there then we're navigating it to dashboard screen
 */
const PublicRoute = ({
  Component,
  authenticated = false,
}) => {
  return !authenticated ? <Component /> : <Navigate to="/dashboard" />
}

/**
 * Here all the propTypes are defined for this particular component
 */

PublicRoute.propTypes = {
  Component: PropTypes.element.isRequired
}

export default PublicRoute
