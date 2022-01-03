import { sessionService } from "redux-react-session"

/**
 * Here we're logging out the user and removing the session data as well
 * After removing the data from browser then we're navigating the user to login screen
 */

export const logoutUser = async () => {
  await sessionService.deleteSession();
  await sessionService.deleteUser();
  window.location.href = "/"
}
