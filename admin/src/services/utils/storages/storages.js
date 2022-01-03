import { sessionService } from "redux-react-session";

/**
 * Storing the session data in session cookies
 * we're encrypting the data before store in session
 * Here we're storing the encrypted token and some login user data
 */
const setSession = (token) => {
  return sessionService
    .saveSession(token)
    .then(() => {})
    .catch((err) => console.error(err));
}

/**
 * Fetching the session data from session cookies
 * we're decrypting the data after fetch and return that decrypted data
 */
const getSession = () => {
  return sessionService
    .loadSession()
    .then((token) => token)
    .catch((err) => {
      sessionService.deleteSession()
    });
}

/**
 * We're deleting the Session data in case of logout or session expiry time
 */
const deleteSession = async () => {
  const del = await sessionService
    .deleteSession()
    .then(() => sessionService.deleteUser())
    .catch((err) => {
      sessionService.deleteSession()
      console.error(err)
    })
  return del
}

export { setSession, getSession, deleteSession }
