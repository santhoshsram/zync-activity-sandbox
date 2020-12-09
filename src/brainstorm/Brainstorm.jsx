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
    <div className="container-fluid">
      <div className="display-4">
        Activity {userName} - {role}
      </div>
      <div className="card">
        <div className="card-body">This is some text within a card block.</div>
      </div>
      <Button
        onClick={() =>
          dispatch({ type: "ADD_MESSAGE", userId, text: "BAZINGA" })
        }
      >
        BAZINGA
      </Button>
      <div className="card-columns">
        {(messages || []).map((m, i) => (
          <div className="card border p-0 mb-2">
            <div className="card-body" key={i}>
              {m.sender} says {m.text}
            </div>
          </div>
        ))}
      </div>
    </div>
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
