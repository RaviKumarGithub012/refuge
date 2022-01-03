/**
 * This App component having all the nested components
 */
import React, { Fragment, useEffect, useState, Suspense } from "react"
import propTypes from "prop-types"
import { connect } from "react-redux"
import Routers from "./routers/routers"
import { bindActionCreators } from "redux"
import { showHideToast } from "./services/redux/appNotifications/action"
import AppNotifications from "./components/appNotifications/appNotifications"
import 'bootstrap/dist/css/bootstrap.min.css';

const App = ({ toggleToast, toastMsg, isSuccess,  ...rest }) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    /**
     * Here we're checking for stable internet connection or not
     * If there is no internet connection then we'll show a error toast message that No Internet Connection
     * We're using windows listener to check live if internet is there or not
     */
    const handleConnection = (event) => {
      if (event.type === "offline") {
        setIsConnected(true)
        toggleToast(true, "noInternetConnection")
      } else {
        setIsConnected(false)
        toggleToast(true, "youAreOnline", true)
      }
    }
    window.addEventListener("online", handleConnection)
    window.addEventListener("offline", handleConnection)
    return () => {
      window.removeEventListener("online", handleConnection)
      window.removeEventListener("offline", handleConnection)
    }
  }, [isConnected, toggleToast])

  const closeToast = (modal, message) => {
    toggleToast(modal, message)
  }

  /**
   * We're checking if the language is RTL or not
   * If the RTL is there then we're making our all the html direction to RTL
   */

  return (
    <Fragment>
        <Suspense fallback={`...loading`}>
          <AppNotifications
            closeToast={closeToast}
            visible={isConnected || toastMsg?.isToast}
            message={toastMsg?.toastMessage}
            isSuccess={isSuccess}
          />
          <Routers {...rest} />
        </Suspense>
    </Fragment>
  )
}

App.propTypes = {
  authenticated: propTypes.bool.isRequired,
  checked: propTypes.bool.isRequired,
}

const mapStateToProps = (state) => ({
  checked: state.session.checked,
  authenticated: state.session.authenticated,
  toastMsg: state.toast,
  isSuccess: state.toast.isSuccess,
})

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ toggleToast: showHideToast }, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
