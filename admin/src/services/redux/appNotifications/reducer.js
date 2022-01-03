import { SHOW_HIDE_TOAST, SHOW_HIDE_TOAST_SUCCESS } from "./type"

const initialState = {
  isToast: false,
  toastMessage: "",
  isSuccess: false,
}

/**
 * In this reducer we've define the initial state as initialState
 * Depending on action types we're populating the data in state reducer
 */

const toastReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case SHOW_HIDE_TOAST:
      return {
        isToast: payload?.isToast,
        toastMessage: payload?.toastMessage,
        isSuccess: false,
      }

    case SHOW_HIDE_TOAST_SUCCESS:
      return {
        isToast: payload?.isToast,
        toastMessage: payload?.toastMessage,
        isSuccess: true,
      }

    default:
      return state
  }
}
export default toastReducer
