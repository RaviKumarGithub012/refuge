/**
 * Here we're defining the default data for API headers
 * We're getting auth data which set at the time of login
 */

export const customHeader = async (staticObj, dynamicObj) => {
  const authToken = (await localStorage.getItem("auth")) || ""
  staticObj = {
    pwd: "",
    tz: "",
    chnl: "Web",
    locale: localStorage.getItem("lang") || "en",
    rqst: "Request-Type",
    src: "i",
    utype: 731,
    uid: 0,
    uname: "",
    orgid: null,
    nodeid: null,
    uniqueId: "115900f05cc5daa1",
    apptype: "seller",
    app_type: "S",
    encryption: false,
    ...(authToken && { token: authToken }),
  }
  staticObj = { ...staticObj, ...dynamicObj }
  return staticObj
}

export const customPayload = (innerPayload) => {
  const payload = innerPayload
  return payload
}
