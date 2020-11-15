import './App.css';
import styled from 'styled-components'
import React, { useReducer } from 'react'
import { Activity, activityReducer } from './activity/Activity';
import { Button } from './components/Theme'

const TabList = styled.div`
  border-bottom: 1px solid #ccc;
  padding-left: 0;
`

const sandboxReducer = (state, action) => {
  switch (action.type) {
    case 'SELECT_TAB':
      return {
        ...state,
        [action.section]: {
          activeTab: action.tabId
        }
      }
    case "TOGGLE_SPLIT":
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

const meetingReducer = (state, action) => {
  switch (action.type) {
    case "ADD_USER":
      return {
        ...state,

      }
    case "REMOVE_USER":
      return {
        ...state,

      }
    default:
      return {
        ...state,
        activities: {
          "activity_instance": activityReducer(state.activities["activity_instance"], action)
        }
      }
  }
}

const initMeetingState = {
  activities: {
    "activity_instance": {

    }
  },
  state: {
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
      }
    }
  }
}

const initSandboxState = {
  mainSection: {
    activeTab: "setup",
  },
  splitSection: {
    activeTab: "setup"
  },
  split: false
}

const Split = styled.span`
  height: 100%;
  width: 50%;
  position: fixed;
  z-index: 1;
  top: 0;
  overflow-x: hidden;  
`

function App() {
  const [meetingState, meetingDispatch] = useReducer(meetingReducer, initMeetingState)
  const [sandboxState, sandboxDispatch] = useReducer(sandboxReducer, initSandboxState)
  const props = { meetingState, meetingDispatch, sandboxState, sandboxDispatch }
  const { split } = sandboxState
  return (
    <>
      {!split && <TabbedView section="mainSection" {...props} />}
      {split && <>
        <Split style={{ left: 0 }}> <TabbedView section="mainSection" {...props} /> </Split>
        <Split style={{ right: 0 }}> <TabbedView section="splitSection" {...props} /> </Split>
      </>}
    </>
  );
}
const Setup = ({ sandboxDispatch }) => {
  return (
    <div style={{ padding: "20px" }}>
      <Button onClick={() => sandboxDispatch({ type: "TOGGLE_SPLIT" })}>TOGGLE SPLIT</Button>
    </div>
  )

}
const TabbedView = (props) => {

  const { section, sandboxState, sandboxDispatch, meetingState, meetingDispatch } = props
  const { state, activities } = meetingState || {}
  const { activity_instance } = activities || {}
  const { users } = state || {}

  const { activeTab } = sandboxState[section] || {}

  return (<div style={{}}>
    <TabList>
      <Tab
        label="Setup"
        tabId="setup"
        active={activeTab === "setup"}
        selectTab={() => sandboxDispatch({ type: "SELECT_TAB", section, tabId: "setup" })}
      />
      {(Object.values(users || {}) || []).map((user, i) => {
        const { userId, userName } = user
        return <Tab
          key={i}
          label={userName}
          tabId={userId}
          active={activeTab === userId}
          selectTab={() => sandboxDispatch({ type: "SELECT_TAB", section, tabId: userId })}
        />
      })}
    </TabList>
    { activeTab === "setup" && <Setup {...props} />}
    {
      activeTab !== "setup" &&
      <Activity activity={activity_instance} users={users} user={users[activeTab]} dispatch={meetingDispatch} />
    }
  </div>)

}



const TabHeader = styled.span`
  display: inline-block;
  list-style: none;
  margin-bottom: -1px;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
`

const Tab = ({ label, tabId, active, selectTab }) => {
  const addStyle = active ?
    { backgroundColor: "white", border: "solid #ccc", borderWidth: "1px 1px 0 1px" } :
    {}

  return (<>
    <TabHeader style={addStyle}
      onClick={() => selectTab(tabId)}>{label}</TabHeader>
  </>)
}



export default App;
