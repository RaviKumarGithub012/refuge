/**
 * This file configuratiion is require to handle all the API interceptors
 * It'll check if API is public or private means if the API requires token or not
 */

import axios from "axios";
import Config from "../config/config";

axios.interceptors.request.use(
  async (evt) => {
    if (checkTokenNeed(evt.url)) {
      const storedToken = await localStorage.getItem("accessToken");
      const token = storedToken || (await getSession());
      if (token) {
        evt.headers.Authorization = `Basic ${token}`
        return evt;
      } else {
        throw new Error("Session Expired")
      }
    }
    return evt
  },
  (err) => Promise.reject(err)
)

/**
 * Here we're checking for these following API end points
 */

const checkTokenNeed = (url) => { }

export default axios
