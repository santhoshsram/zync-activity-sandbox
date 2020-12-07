// THIS IS BOILER PLATE FOR CREATING NEW ACTIVITY
import React from "react"
import { connect } from "react-redux"
import { Switch } from "../components/Switch"
import {
  Button,
  Modal,
  ActivityTitle,
  ActivityDescription,
  ActivityIcon
} from "../components/Theme"
import styled from "styled-components"
import { addMessage, toggleSettings } from "./activityActions"

const HR = styled.hr`
  color: #ccc;
  opacity: 0.4;
  margin: 25px 0px 25px 0px;
  box-shadow: 0px 0px 10px rgba(102, 102, 102, 0.25);
`

const BoxedTextArea = styled.textarea`
  width: 100%;
`

const ModalSection = styled(Modal)`
  background: #f0f0f0;
  margin: 5px;
`

const activityInfo = {
  activityId: "bazinga",
  title: "Bazinga",
  description: "You say bazinga. I say bazinga. ",
  icon: "https://aarvalabs.imfast.io/mydawn/activiity_icon.png"
}

const Activity = ({ users, user, messages, addMessage }) => {
  const { userId, role, userName } = user || {}

  return (
    <>
      <h1>
        Activity {userName} - {role}
      </h1>
      <Button onClick={() => addMessage(userId, "BAZINGA")}>BAZINGA</Button>
      <div
        style={{
          border: "1px solid black",
          height: "500px",
          background: "#ccc",
          margin: "10px"
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

const Settings = ({ settings, toggleSettings }) => {
  const { booleanValue } = settings || {}

  return (
    <div
      style={{
        display: "flex",
        width: "500px",
        justifyContent: "space-between"
      }}
    >
      <div>Setting Switch</div>
      <Switch checked={booleanValue} onChange={toggleSettings}></Switch>
    </div>
  )
}

const ActivityInfo = ({
  users,
  rawActivityState,
  settings,
  summary,
  toggleSettings
}) => {
  return (
    <>
      <ModalSection>
        <p>Raw JSON - activity</p>
        <BoxedTextArea value={rawActivityState} rows="20" />
      </ModalSection>

      <ModalSection>
        <h3>Activity Listing</h3>
        <p style={{ fontSize: "13px", marginTop: "0px", color: "#333" }}>
          ActivityId: activityId
        </p>

        <ActivityIcon src={activityInfo.icon} alt={`icon`}></ActivityIcon>
        <ActivityTitle>{activityInfo.title}</ActivityTitle>
        <ActivityDescription>{activityInfo.description}</ActivityDescription>
      </ModalSection>

      <ModalSection>
        <h3>Settings</h3>
        <p style={{ fontSize: "13px", marginTop: "0px", color: "#333" }}>
          In Zync Meet, settings are only allowed to be edited before activity
          launch. <br />
          Once Launched settings are immutable. <br />
          In Sandbox, activity is launched on load settings can be updated at
          any time. <br />
          Change settings at the beginning of activity launch and never change
          them here.
        </p>
        <HR />
        <Settings settings={settings} toggleSettings={toggleSettings} />
        <HR />
      </ModalSection>

      <ModalSection>
        <h3>Activity Summary</h3>
        <p style={{ fontSize: "13px", marginTop: "0px", color: "#aaa" }}>
          Summary is only displayed at the end of the activity.
        </p>
        <HR />
        <p>{Object.keys(users).join(", ")} participated in the activity.</p>
        {summary}
        <HR />
      </ModalSection>
    </>
  )
}

const mapStateToActivityProps = (state) => ({
  messages: state.activity.messages
})

const mapDispatchToActivityProps = (dispatch) => ({
  addMessage: (sender, text) => dispatch(addMessage(sender, text))
})

const ConnectedActivity = connect(
  mapStateToActivityProps,
  mapDispatchToActivityProps
)(Activity)

const mapStateToActivityInfoProps = (state) => ({
  rawActivityState: JSON.stringify(state.activity, null, 2),
  settings: state.activity.settings,
  summary: state.activity.summary
})

const mapDispatchToActivityInfoProps = (dispatch) => ({
  toggleSettings: () => dispatch(toggleSettings())
})

const ConnectedActivityInfo = connect(
  mapStateToActivityInfoProps,
  mapDispatchToActivityInfoProps
)(ActivityInfo)

export { ConnectedActivity as Activity, ConnectedActivityInfo as ActivityInfo }
