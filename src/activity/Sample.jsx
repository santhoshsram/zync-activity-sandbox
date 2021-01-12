// THIS IS BOILER PLATE FOR CREATING NEW ACTIVITY
import React from "react"
import { Switch } from "../components/Switch"
import { Button } from "../components/Theme"

const Activity = ({ activity, users, user, eventDispatch }) => {
  const { messages } = activity || {}
  const { userId, role, userName } = user || {}

  return (
    <>
      <h1>
        Activity {userName} - {role}
      </h1>
      <Button
        onClick={() =>
          eventDispatch({ type: "ADD_MESSAGE", userId, text: "BAZINGA" })
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

export { Activity, Settings, Summary }
