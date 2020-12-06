import { SELECT_TAB, TOGGLE_SPLIT } from "./sandboxActions"

const initialSandboxState = {
  mainSection: {
    activeTab: "setup"
  },
  splitSection: {
    activeTab: "setup"
  },
  split: false
}

export const sandbox = (state = initialSandboxState, action) => {
  const { type, payload } = action

  switch (type) {
    case SELECT_TAB:
      const { section, tabId } = payload
      return {
        ...state,
        [section]: {
          activeTab: tabId
        }
      }
    case TOGGLE_SPLIT:
      return {
        ...state,
        split: !state.split
      }
    default:
      return {
        ...state
      }
  }
}
