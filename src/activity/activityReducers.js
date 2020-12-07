import { ADD_MESSAGE, TOGGLE_SETTINGS } from "./activityActions"

const initialActivityState = {
  settings: {
    videoLayout: "docked", // This should be either 'docked' or 'minimized' which tells how the video hub should be when your activity is launched
    // You can add other settings over here
    booleanValue: true
  },
  messages: [],
  summary: "Folks had a good time Bazinga-ing"
}

/*
Object message has below definition
message: {
  sender: "userIdOfUserWhoSendsMessage"
  text: "messageText"
}
*/

export const activity = (state = initialActivityState, action) => {
  const { type, payload } = action

  switch (type) {
    case ADD_MESSAGE:
      const message = {
        sender: payload.sender,
        text: payload.text
      }

      return {
        ...state,
        messages: state.messages.concat(message)
      }

    case TOGGLE_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          booleanValue: !state.settings.booleanValue
        }
      }
    default:
      return {
        ...state
      }
  }
}
