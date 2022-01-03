/**
 * This file contains dashboard actions
 */

import callWebService, { callTypes } from "../../utils/networks/network"
import { getSession } from "../../utils/storages/storages"
import { customHeader, customPayload } from "../../config/requestConfig"
import Config from "../../config/config"
import {
  TOP_SELLING,
  TOTAL_SALES,
  NON_FULFILLED,
  TOTAL_PAID_UNPAID,
} from "./type"
import * as moment from "moment"

/**
 * In this getDate method we're calculating the past date from current data based on requirement like for last week, last month, etc...
 */

// Here dt is a date type it can be start sate and expiry date
const getDate = (dt, days) => {
  let endDate = moment(new Date()).format("yyyyMMDD")

  if (dt === "end_dt") {
    return endDate
  }

  if (dt === "start_dt") {
    let startDate = endDate
    let today = moment(endDate).get("date")
    let thisMonth = moment(endDate)
      .subtract(today - 1, "days")
      .format("yyyyMMDD")
    switch (Number(days)) {
      case 30:
        startDate = thisMonth
        return startDate
      case 60:
        startDate = moment(thisMonth).subtract(1, "months").format("yyyyMMDD")
        return startDate
      case 90:
        startDate = moment(thisMonth).subtract(2, "months").format("yyyyMMDD")
        return startDate
      case 180:
        startDate = moment(thisMonth).subtract(5, "months").format("yyyyMMDD")
        return startDate
      case 365:
        startDate = moment(thisMonth).subtract(11, "months").format("yyyyMMDD")
        return startDate
      default:
        startDate = moment(endDate).subtract(6, "days").format("yyyyMMDD")
        return startDate
    }
  }
}

/**
 * Fetching top selling products data from API with some default params
 */

export const fetchTopSelling =
  (daysCount = 7, limit = 3, sortingKey = "value", sortingOrder = "top") =>
  async (dispatch) => {
    const userData = await getSession()
    const { nodeId, orgId, userId, userName, userType } = userData

    const payloadData = {
      order: {
        query_nm: "get_organization_sales_metrics",
        org_id: orgId,
        node_id: nodeId,
        start_dt: getDate("start_dt", daysCount),
        end_dt: getDate("end_dt", daysCount),
        sorting_key_v: sortingKey,
        sorting_order_v: sortingOrder,
        limit_n: limit,
      },
    }

    try {
      const data = {
        envelope: {
          header: await customHeader(
            {},
            {
              uid: userId,
              orgid: orgId,
              uname: userName,
              utype: userType,
              nodeid: nodeId,
            }
          ),
          payload: customPayload(payloadData),
        },
      }
      const res = await callWebService(
        callTypes.post,
        data,
        Config.Dashboard.fetchTopSelling
      )

      if (res?.status === 200 && res?.data.status === "success") {
        const { payload } = res.data
        dispatch({ type: TOP_SELLING, payload: payload?.result })
        return payload?.result
      } else {
        dispatch({ type: TOP_SELLING, payload: null })
        return true
      }
    } catch (err) {
      console.error("err", err)
      return true
    }
  }

/**
 * Fetching total sales products data from API with some default params
 */
export const fetchTotalSales =
  (daysCount = 30) =>
  async (dispatch) => {
    const userData = await getSession()
    const { nodeId, orgId, userId, userName, userType } = userData

    const getFrequency = (days) => {
      if (days > 7) {
        if (days > 60) {
          return "monthly"
        } else return "weekly"
      } else return "daily"
    }

    const payloadData = {
      order: {
        query_nm: "get_organization_sales_details",
        org_id: orgId,
        node_id: nodeId,
        start_dt: getDate("start_dt", daysCount),
        end_dt: getDate("end_dt", daysCount),
        frequency_v: getFrequency(daysCount),
      },
    }

    try {
      const data = {
        envelope: {
          header: await customHeader(
            {},
            {
              uid: userId,
              orgid: orgId,
              uname: userName,
              utype: userType,
              nodeid: nodeId,
            }
          ),
          payload: customPayload(payloadData),
        },
      }
      dispatch({ type: TOTAL_SALES, payload: null })
      const res = await callWebService(
        callTypes.post,
        data,
        Config.Dashboard.fetchTotalSales
      )

      if (res?.status === 200 && res?.data.status === "success") {
        const { payload } = res.data
        dispatch({ type: TOTAL_SALES, payload: payload })
        return payload
      } else {
        dispatch({ type: TOTAL_SALES, payload: null })
        return true
      }
    } catch (err) {
      console.error("err", err)
      return true
    }
  }

/**
 * Fetching Non Fulfilled products data from API with some default params
 */

export const fetchNonFulfilled =
  (daysCount = 30, limit = 3, sortingKey = "value", sortingOrder = "top") =>
  async (dispatch) => {
    const userData = await getSession()
    const { nodeId, orgId, userId, userName, userType } = userData

    const payloadData = {
      order: {
        query_nm: "get_organization_sales_metrics",
        org_id: orgId,
        node_id: nodeId,
        start_dt: getDate("start_dt", daysCount),
        end_dt: getDate("end_dt", daysCount),
        sorting_key_v: sortingKey,
        sorting_order_v: sortingOrder,
        limit_n: limit,
        non_fulfilled_v: true,
      },
    }

    try {
      const data = {
        envelope: {
          header: await customHeader(
            {},
            {
              uid: userId,
              orgid: orgId,
              uname: userName,
              utype: userType,
              nodeid: nodeId,
            }
          ),
          payload: customPayload(payloadData),
        },
      }
      const res = await callWebService(
        callTypes.post,
        data,
        Config.Dashboard.fetchNonFulfilled
      )

      if (res?.status === 200 && res?.data.status === "success") {
        const { payload } = res.data
        dispatch({ type: NON_FULFILLED, payload: payload?.result })
        return payload?.result
      } else {
        dispatch({ type: NON_FULFILLED, payload: null })
        return true
      }
    } catch (err) {
      console.error("err", err)
      return true
    }
  }
/**
 * Fetching total paid unpaid products data from API with some default params
 */

export const fetchTotalPaidUnpaid =
  (daysCount = 30) =>
  async (dispatch) => {
    const userData = await getSession()
    const { nodeId, orgId, userId, userName, userType } = userData

    const payloadData = {
      order: {
        query_nm: "get_organization_sales_pymt_summary",
        org_id: orgId,
        node_id: nodeId,
        start_dt: getDate("start_dt", daysCount),
        end_dt: getDate("end_dt", daysCount),
      },
    }

    try {
      const data = {
        envelope: {
          header: await customHeader(
            {},
            {
              uid: userId,
              orgid: orgId,
              uname: userName,
              utype: userType,
              nodeid: nodeId,
            }
          ),
          payload: customPayload(payloadData),
        },
      }
      const res = await callWebService(
        callTypes.post,
        data,
        Config.Dashboard.fetchTotalPaidUnpaid
      )

      if (res?.status === 200 && res?.data.status === "success") {
        const { payload } = res.data
        dispatch({ type: TOTAL_PAID_UNPAID, payload: payload })
        return payload
      } else {
        dispatch({ type: TOTAL_PAID_UNPAID, payload: null })
        return true
      }
    } catch (err) {
      console.error("err", err)
      return true
    }
  }
