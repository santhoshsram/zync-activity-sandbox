const activityReducer = (state, action) => {
  switch (action.type) {
    case "LAUNCH_ACTIVITY":
      return{
        ...state,
        launchMessage: "This is added on a call to LAUNCH_ACTIVITY"
      }
    case "ADD_MESSAGE":
      let msg = Object.assign([], state.messages)
      msg.push({ sender: action.userId, text: action.text })
      return {
        ...state,
        messages: msg
      }
    default:
      return {
        ...state
      }
  }
}

export { activityReducer }
