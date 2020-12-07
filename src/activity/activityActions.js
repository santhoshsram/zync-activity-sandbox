/*
Action to add a new message
payload: {
  sender: "userIdOfUserWhoSendsMessage"
  text: "messageText"
}
*/
export const ADD_MESSAGE = "ADD_MESSAGE"
export const addMessage = (sender, text) => ({
  type: ADD_MESSAGE,
  payload: {
    sender,
    text
  }
})

/*
Action to toggle settings.
This action has no payload
*/
export const TOGGLE_SETTINGS = "TOGGLE_SETTINGS"
export const toggleSettings = () => ({ type: TOGGLE_SETTINGS })
