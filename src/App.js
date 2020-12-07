import "./App.css"
import styled from "styled-components"
import React from "react"
import { connect } from "react-redux"
import { selectTab, toggleSplit } from "./sandboxActions"

import { Activity, ActivityInfo } from "./activity/Activity"
import { Button, Border } from "./components/Theme"

const TabList = styled.div`
  border-bottom: 1px solid #ccc;
  padding-left: 0;
`

const Split = styled.span`
  height: 100%;
  width: 50%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;
`

const TabHeader = styled.span`
  display: inline-block;
  list-style: none;
  margin-bottom: -1px;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
`

const initMeetingState = {
  users: {
    "alpha@aarvalabs.com": {
      userId: "alpha@aarvalabs.com",
      userName: "Alpha",
      role: "host"
    },
    "bravo@aarvalabs.com": {
      userId: "bravo@aarvalabs.com",
      userName: "Bravo",
      role: "guest"
    },
    "charlie@aarvalabs.com": {
      userId: "charlie@aarvalabs.com",
      userName: "Charlie",
      role: "guest"
    }
  }
}

function App({ sandboxState, toggleSplit, selectTab }) {
  const props = {
    meetingState: initMeetingState,
    sandboxState: sandboxState,
    toggleSplit: toggleSplit,
    selectTab: selectTab
  }
  const { split } = sandboxState

  return (
    <>
      {!split && <TabbedView section="mainSection" {...props} />}
      {split && (
        <>
          <Split style={{ left: 0 }}>
            {" "}
            <TabbedView section="mainSection" {...props} />{" "}
          </Split>
          <Split style={{ right: 0 }}>
            {" "}
            <TabbedView section="splitSection" {...props} />{" "}
          </Split>
        </>
      )}
    </>
  )
}

const Setup = ({ users, toggleSplit }) => {
  return (
    <div style={{ padding: "20px" }}>
      <Border>
        <h1>Sandbox settings</h1>
        <Button onClick={toggleSplit}>TOGGLE SPLIT</Button>
        <p>Toggle Split screen to see 2 users side by side</p>
      </Border>

      <Border>
        <h1>Activity Specific Settings</h1>
        <ActivityInfo users={users} />
      </Border>
    </div>
  )
}
const TabbedView = (props) => {
  const { section, sandboxState, toggleSplit, selectTab, meetingState } = props
  const { users } = meetingState
  const { activeTab } = sandboxState[section] || {}

  return (
    <div style={{}}>
      <TabList>
        <Tab
          label="Setup"
          tabId="setup"
          active={activeTab === "setup"}
          selectTab={() => selectTab(section, "setup")}
        />
        {(Object.values(users || {}) || []).map((user, i) => {
          const { userId, userName } = user
          return (
            <Tab
              key={i}
              label={userName}
              tabId={userId}
              active={activeTab === userId}
              selectTab={() => selectTab(section, userId)}
            />
          )
        })}
      </TabList>
      {activeTab === "setup" && (
        <Setup users={users} toggleSplit={toggleSplit} />
      )}
      {activeTab !== "setup" && (
        <Activity users={users} user={users[activeTab]} />
      )}
    </div>
  )
}

const Tab = ({ label, tabId, active, selectTab }) => {
  const addStyle = active
    ? {
        backgroundColor: "white",
        border: "solid #ccc",
        borderWidth: "1px 1px 0 1px"
      }
    : {}

  return (
    <>
      <TabHeader style={addStyle} onClick={selectTab}>
        {label}
      </TabHeader>
    </>
  )
}

const mapStateToProps = (state) => ({
  sandboxState: state.sandbox
})

const mapDispatchToProps = (dispatch) => ({
  toggleSplit: () => dispatch(toggleSplit()),
  selectTab: (section, tabId) => dispatch(selectTab(section, tabId))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
