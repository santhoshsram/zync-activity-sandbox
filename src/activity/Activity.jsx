// THIS IS BOILER PLATE FOR CREATING NEW ACTIVITY
import React from "react"
import { Switch } from "../components/Switch"
import {
  Button,
  ActivityTitle,
  ActivityDescription,
  ActivityIcon
} from "../components/Theme"
import styled from "styled-components"

const HR = styled.hr`
  color: #ccc;
  opacity: 0.4;
  margin: 25px 95px 25px 0px;
  box-shadow: 0px 0px 10px rgba(102, 102, 102, 0.25);
`

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

const ActivityInfo = ({ users }) => {
  return (
    <>
      <p>Raw JSON - activity</p>
      {/* XXX TODO: Replace hardCoded activityListing by pulling it 
      from the state */}
      <textarea
        value={JSON.stringify(activityListing, null, 2)}
        rows="20"
        cols="80"
      />
      <h3>Activity Listing</h3>
      <p style={{ fontSize: "13px", marginTop: "0px", color: "#333" }}>
        ActivityId: activityId
      </p>
      {/* XXX TODO: Replace hardcoded icon, title and description by pulling it
      from state */}
      <ActivityIcon
        src={"https://aarvalabs.imfast.io/mydawn/activiity_icon.png"}
        alt={`icon`}
      ></ActivityIcon>
      <ActivityTitle>Dummy Activity Title</ActivityTitle>
      <ActivityDescription>Dummy Activity Description</ActivityDescription>
      <h3>Settings</h3>
      <p style={{ fontSize: "13px", marginTop: "0px", color: "#333" }}>
        In Zync Meet, settings are only allowed to be edited before activity
        launch. <br />
        Once Launched settings are immutable. <br />
        In Sandbox, activity is launched on load settings can be updated at any
        time. <br />
        Change settings at the beginning of activity launch and never change
        them here.
      </p>
      <HR />
      {/* XXX TODO: Replace hardcoded value of settings by pulling it from state
       */}
      <Settings
        settings={activityListing.settings}
        setLaunchSettings={(newSettings) => {
          alert("Settings will be set to" + JSON.stringify(newSettings))
        }}
      />
      <HR />
      <h3>Summary</h3>
      <p style={{ fontSize: "13px", marginTop: "0px", color: "#aaa" }}>
        Summary is only displayed at the end of the activity.
      </p>
      <HR />
      Summary - Activity Summary
      <HR />
    </>
  )
}

const activityListing = {
  activityId: "bazinga",
  details: {
    title: "Bazinga",
    description: "You say bazinga. I say bazinga. ",
    icon: "https://aarvalabs.imfast.io/mydawn/activiity_icon.png"
  },
  settings: {
    videoLayout: "docked", // This should be either 'docked' or 'minimized' which tells how the video hub should be when your activity is launched
    // You can add other settings over here
    booleanValue: true
  }
}

export { Activity, ActivityInfo, Settings, activityReducer, activityListing }
