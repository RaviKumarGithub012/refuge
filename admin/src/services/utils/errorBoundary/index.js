/**
 * This page is designed to show the error screen if crash or error occured on frontend side
 * In this file we define some of the methods to trigger this screen
 */

import React, { Component } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import ErrorPage from "./errorPage";

class ErrorBox extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      hasError: false,
    };
  }

  /**
   * Here we're getting if the error found on the frontend side
   * If error found then we're setting a flag hasError as true
   */

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  /**
   * If error or any exception found then we're setting a flag hasError as true
   */

  componentDidCatch() {
    this.setState({
      hasError: true,
    });
  }

  /**
   * This is a method by which we're performing the back action
   */

  handleBack = () => {
    const { navigate } = this.props;
    this.setState({ hasError: false });
    navigate('/dashboard');
  };

  render() {
    const { hasError } = this.state;
    const { children } = this.props;
    /**
     * Returning the default error component which is present in errorPage file in case of error found
     */
    if (hasError) {
      return <ErrorPage goBack={this.handleBack} />;
    }
    return children;
  }
}

const ErrorBoundary = () => {
  const navigate = useNavigate();
  return 'asdfasdf';
};


ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
  history: PropTypes.oneOfType([PropTypes.object]).isRequired,
};

export default ErrorBoundary;