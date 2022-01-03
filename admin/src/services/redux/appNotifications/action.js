/**
 * This Action is to trigger the toast messages from anywhere within the application
 * Here we are taking some arguments to show conditional UI on toast message like error-msg, warning-msg, success-msg, etc
 */

import { SHOW_HIDE_TOAST, SHOW_HIDE_TOAST_SUCCESS } from "./type"

export const showHideToast =
  (modal, message, isSuccess = false) =>
  (dispatch) => {
    dispatch({
      type: isSuccess ? SHOW_HIDE_TOAST_SUCCESS : SHOW_HIDE_TOAST,
      payload: {
        isToast: modal,
        toastMessage: typeof message === "string" ? message : "",
        isSuccess: isSuccess,
      },
    })
  }
