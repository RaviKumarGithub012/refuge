/**
 * We've getting a base URL from env file
 */
const baseUrl = `${process.env.REACT_APP_API_URL}`

/**
 * We've define a set of API endpoints for every nested module
 */
const Config = {
  onBoarding: {
    login: `${baseUrl}/api/v1/login`,
  },
}

export default Config
