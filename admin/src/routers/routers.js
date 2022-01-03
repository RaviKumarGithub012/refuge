/**
 * This file is to mantain the manage all the public/public routes in application
 */
import React, { Suspense } from "react";
import PropTypes from "prop-types";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PublicRoute from "./publiceRoutes";
import PrivateRoute from "./privateRoutes";
// import ErrorBoundary from "../services/utils/errorBoundary";
const Login = React.lazy(() => import("../pages/authorization/login"));
const Dashboard = React.lazy(() => import("../pages/dashboard"));

const Routers = ({ authenticated = true, checked }) => {
  return (
    <Router>
      {/**
       * Error Boundary is wrapped to all the routes if error occured in any component wrapped in it
       * Error broundary is separate component which shows the error if found
       */}
      {/* <ErrorBoundary> */}
      <Suspense>
        {checked && (
          <Routes>
            <Route path="/" element={<PublicRoute authenticated={authenticated} Component={Login} />} />
            <Route path="/login" element={<PublicRoute authenticated={authenticated} Component={Login} />} />
            <Route path='/dashboard' element={<PrivateRoute authenticated={authenticated} Component={Dashboard} />}>

            </Route>
          </Routes>
        )}
      </Suspense>
      {/* </ErrorBoundary> */}
    </Router>
  );
};

Routers.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  checked: PropTypes.bool.isRequired,
};

export default Routers;
