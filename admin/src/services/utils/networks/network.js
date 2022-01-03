import axios from "../../interceptor/Interceptor"
import {
  SHOW_HIDE_TOAST,
  SHOW_HIDE_TOAST_SUCCESS,
} from "../../redux/appNotifications/type"
import { store } from "../../redux/store"
import { logoutUser } from "../commonFunc"
export const callTypes = {
  get: "GET",
  post: "POST",
  upload: "UPLOAD",
  put: "PUT",
  delete: "DELETE",
  patch: "PATCH",
}

/**
 * This method is created for to show the toast message from redux actions
 * It contains message of toast
 */

export function showToast(error, isSuccess = false) {
  const errorMsg = error ? error : ""
  store.dispatch({
    type: isSuccess ? SHOW_HIDE_TOAST_SUCCESS : SHOW_HIDE_TOAST,
    payload: { isToast: true, toastMessage: errorMsg, isSuccess: isSuccess },
  })
}

/**
 * This method is created for to call the api's with different different API methods
 * also we're handing the interceptors of api also
 * It contains message of toast messages in case of error/exception found
 * Checking the API statuse if it's required or not
 */

export default async function callWebService(requestType, data, url, config) {
  switch (requestType) {
    // Call GET API
    case callTypes.get: {
      const getApiResult = await axios.get(url, data, config).catch((error) => {
        showToast(error)
      })

      if (getApiResult?.data?.status === "failure") {
        showToast(getApiResult?.data?.status)
      }
      return getApiResult
    }
    // Call POST API
    case callTypes.post: {
      const postApiResult = await axios
        .post(url, data, config)
        .catch((error) => {
          console.error("Catch", error)
          showToast("")
          return error
        })

      if (typeof postApiResult === "object") {
        let msg = postApiResult?.data.res_msg
        if (postApiResult?.data.status === "failure") {
          if (postApiResult?.data.res_code < 0) {
            setTimeout(() => showToast(msg), 1000)
          }
          if (postApiResult?.data.res_code === 1202) {
            logoutUser()
            showToast(msg)
          } else setTimeout(() => showToast(msg), 1000)
        } else {
          if (
            postApiResult?.data?.payload &&
            postApiResult?.data?.payload?.code === 401
          ) {
            let inMsg = postApiResult?.data?.payload?.message
            setTimeout(() => showToast(inMsg), 1000)
          }
        }
        return postApiResult && postApiResult
      }
      break
    }
    // Call PUT API
    case callTypes.put: {
      const putApiResult = await axios.put(url, data).catch((error) => {
        showToast(error)
      })

      if (putApiResult?.data?.status === "failure") {
        showToast(putApiResult?.data?.status)
      } else showToast("Success", true)

      return putApiResult
    }
    // Call DELETE API
    case callTypes.delete: {
      const deleteApiResult = await axios
        .delete(url, { data })
        .catch((error) => {
          showToast(error)
        })

      if (deleteApiResult?.data?.status === "failure") {
        showToast(deleteApiResult?.data?.status)
      } else showToast("Success", true)

      return deleteApiResult
    }
    // Call PATCH API
    case callTypes.patch: {
      const patchApiResult = await axios.patch(url, data).catch((error) => {
        showToast(error)
      })

      if (patchApiResult?.data?.status === "failure") {
        showToast(patchApiResult?.data?.status)
      } else showToast("Success", true)

      return patchApiResult
    }
    // Call default method as GET API
    default: {
      const defApiResult = await axios.get(url, data, config).catch((error) => {
        showToast(error)
      })

      if (defApiResult?.data?.status === "failure") {
        showToast(defApiResult?.data?.status)
      } else showToast("Success", true)

      return defApiResult
    }
  }
}
