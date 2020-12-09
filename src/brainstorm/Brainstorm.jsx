// THIS IS BOILER PLATE FOR CREATING NEW ACTIVITY
import React from "react"
import { Switch } from "../components/Switch"
import { Button } from "../components/Theme"

const activityReducer = (state, action) => {
  switch (action.type) {
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

const Activity = ({ activity, users, user, dispatch }) => {
  const { messages } = activity || {}
  const { userId, role, userName } = user || {}

  return (
    <>
      <h1>
        Activity {userName} - {role}
      </h1>
      <Button
        onClick={() =>
          dispatch({ type: "ADD_MESSAGE", userId, text: "BAZINGA" })
        }
      >
        BAZINGA
      </Button>
      <div
        style={{
          border: "1px solid black",
          height: "500px",
          background: "#ccc"
        }}
      >
        {(messages || []).map((m, i) => (
          <div key={i}>
            {m.sender} says {m.text}
          </div>
        ))}
      </div>
    </>
  )
}

const Settings = ({ settings, setLaunchSettings }) => {
  const { booleanValue } = settings || {}
  const toggle = () => {
    setLaunchSettings({ ...settings, booleanValue: !booleanValue })
  }
  return (
    <div
      style={{
        display: "flex",
        width: "500px",
        justifyContent: "space-between"
      }}
    >
      <div>Setting Switch</div>
      <Switch checked={booleanValue} onChange={toggle}></Switch>
    </div>
  )
}

const Summary = ({ activity, users, user }) => {
  return <div> Summary - Activity Summary</div>
}

const activityListing = {
  activityId: "ZyncBrainstorming",
  details: {
    title: "Brainstorming Activity",
    description: "Virtual brainstorming made effective.",
    icon: "https://aarvalabs.imfast.io/mydawn/activiity_icon.png"
  },
  settings: {
    videoLayout: "docked", // This should be either 'docked' or 'minimized' which tells how the video hub should be when your activity is launched
    // You can add other settings over here
    booleanValue: true
  }
}

export { Activity, Settings, Summary, activityReducer, activityListing }
