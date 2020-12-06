/*
Action to select a tab
payload: {
  section: "nameOfSection",
  tabId: "idOfTabToShowTheSection"
}
*/
export const SELECT_TAB = "SELECT_TAB"
export const selectTab = (section, tabId) => ({
  type: SELECT_TAB,
  payload: {
    section,
    tabId
  }
})

/*
Action to toggle split
This action has no payload.
*/
export const TOGGLE_SPLIT = "TOGGLE_SPLIT"
export const toggleSplit = () => ({ type: TOGGLE_SPLIT })
