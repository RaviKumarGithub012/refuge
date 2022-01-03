import {
  TOP_SELLING,
  TOTAL_SALES,
  NON_FULFILLED,
  TOTAL_PAID_UNPAID,
} from "./type"

const initialState = {
  topSelling: null,
  totalSales: null,
  nonFulfilled: null,
  totalPaidUnpaid: null,
}

/**
 * In this reducer we've define the initial state as initialState
 * Depending on action types we're populating the data in state reducer
 */

const dashboardReducer = (state = initialState, action) => {
  const { type, payload } = action
  switch (type) {
    case TOP_SELLING:
      return {
        ...state,
        topSelling: payload,
      }

    case TOTAL_SALES:
      return {
        ...state,
        totalSales: payload,
      }

    case NON_FULFILLED:
      return {
        ...state,
        nonFulfilled: payload,
      }

    case TOTAL_PAID_UNPAID:
      return {
        ...state,
        totalPaidUnpaid: payload,
      }

    default:
      return {
        ...state,
      }
  }
}

export default dashboardReducer
