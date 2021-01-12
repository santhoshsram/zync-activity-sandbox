import "./App.css"
import styled from "styled-components"
import React, { useReducer } from "react"
import { Activity, Summary, Settings } from "./activity/Sample"
import { activityReducer } from "./activity/sampleActivity"
import { activityListing } from "./activity/activityListing"
import {
  Button,
  Border,
  ActivityTitle,
  ActivityDescription,
  ActivityIcon
} from "./components/Theme"

const TabList = styled.div`
  border-bottom: 1px solid #ccc;
  padding-left: 0;
`
const HR = styled.hr`
  color: #ccc;
  opacity: 0.4;
  margin: 25px 95px 25px 0px;
  box-shadow: 0px 0px 10px rgba(102, 102, 102, 0.25);
`
const sandboxReducer = (state, action) => {
  switch (action.type) {
    case "SELECT_TAB":
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
    case "UPDATE_SETTINGS":
      return {
        ...state,
        activities: {
          activity_instance: {
            ...state.activities["activity_instance"],
            settings: action.settings
          }
        }
      }
    default:
      return {
        ...state,
        activities: {
          activity_instance: activityReducer(
            state.activities["activity_instance"],
            action
          )
        }
      }
  }
}

const initActivityState = activityReducer(activityListing, {
  type: "LAUNCH_ACTIVITY"
})

const initMeetingState = {
  activities: {
    activity_instance: {
      ...initActivityState,
      instanceId: "activity_instance"
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
      },
      "charlie@aarvalabs.com": {
        userId: "charlie@aarvalabs.com",
        userName: "Charlie",
        role: "guest"
      },
      "delta@aarvalabs.com": {
        userId: "delta@aarvalabs.com",
        userName: "Delta",
        role: "guest"
      }
    }
  }
}

const initSandboxState = {
  mainSection: {
    activeTab: "setup"
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
  const [meetingState, meetingDispatch] = useReducer(
    meetingReducer,
    initMeetingState
  )
  const [sandboxState, sandboxDispatch] = useReducer(
    sandboxReducer,
    initSandboxState
  )
  const props = {
    meetingState,
    meetingDispatch,
    sandboxState,
    sandboxDispatch
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
const Setup = ({ meetingState, sandboxDispatch, meetingDispatch }) => {
  const { state, activities } = meetingState || {}
  const { activity_instance } = activities || {}
  const { users } = state || {}
  const { activityId, settings } = activity_instance || {}
  const { details } = activity_instance || {}
  const { title, description, iconUrl } = details || {}

  return (
    <div style={{ padding: "20px" }}>
      <Border>
        <h3>Sandbox settings</h3>
        <p>Raw JSON - activity</p>
        <textarea
          value={JSON.stringify(activity_instance, null, 2)}
          rows="20"
          style={{ width: "100%" }}
          readOnly
        />
        <p>Toggle Split screen to see 2 users side by side</p>
        <Button onClick={() => sandboxDispatch({ type: "TOGGLE_SPLIT" })}>
          TOGGLE SPLIT
        </Button>
      </Border>
      <Border>
        <h3>Activity Listing</h3>
        <p style={{ fontSize: "13px", marginTop: "0px", color: "#333" }}>
          ActivityId: {activityId}
        </p>
        <ActivityIcon src={iconUrl} alt={`icon`}></ActivityIcon>
        <ActivityTitle>{title}</ActivityTitle>
        <ActivityDescription>{description}</ActivityDescription>
      </Border>
      <Border>
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
        <Settings
          settings={settings}
          setLaunchSettings={(newSettings) =>
            meetingDispatch({ type: "UPDATE_SETTINGS", settings: newSettings })
          }
        />
        <HR />
      </Border>
      <Border>
        <h3>Summary</h3>
        <p style={{ fontSize: "13px", marginTop: "0px", color: "#aaa" }}>
          Summary is only displayed at the end of the activity.
        </p>
        <HR />
        <Summary activity={activity_instance} users={users} />
        <HR />
      </Border>
    </div>
  )
}
const TabbedView = (props) => {
  const {
    section,
    sandboxState,
    sandboxDispatch,
    meetingState,
    meetingDispatch
  } = props
  const { state, activities } = meetingState || {}
  const { activity_instance } = activities || {}
  const { users } = state || {}

  const { activeTab } = sandboxState[section] || {}

  return (
    <div style={{}}>
      <TabList>
        <Tab
          label="Setup"
          tabId="setup"
          active={activeTab === "setup"}
          selectTab={() =>
            sandboxDispatch({ type: "SELECT_TAB", section, tabId: "setup" })
          }
        />
        {(Object.values(users || {}) || []).map((user, i) => {
          const { userId, userName } = user
          return (
            <Tab
              key={i}
              label={userName}
              tabId={userId}
              active={activeTab === userId}
              selectTab={() =>
                sandboxDispatch({ type: "SELECT_TAB", section, tabId: userId })
              }
            />
          )
        })}
      </TabList>
      {activeTab === "setup" && <Setup {...props} />}
      {/* 
        Note the user of 'key' property in the below component. This is
        probably specific only to the sandbox and may not be needed in
        the actual implementation.

        The Activity component keeps track of local state for controlled
        components. In the sandbox, each user has a tab with a unique
        tabid = userid. When a tab change occurs the components are not
        remounted, they are just passed a different set of properties (i.e
        different userid + other properties).

        Since Activity's local state is common across all tabs (state is maintained
        per component instance only one instance of Activity component is created,
        not one per tab (user)), a change in one tab affects all the tabs.

        To avoid this, we use the 'key' property and set it to the userId,
        which forces react to remount the component each time userId changes
        (changing tab changes userId).

        However, one unexpected side effect of this is that, any changes not
        pushed to the central state (meeting reducer) will be lost on moving
        away from that tab. This is not so bad in the sandbox.
      */}

      {activeTab !== "setup" && (
        <Activity
          activity={activity_instance}
          users={users}
          user={users[activeTab]}
          eventDispatch={meetingDispatch}
        />
      )}
    </div>
  )
}

const TabHeader = styled.span`
  display: inline-block;
  list-style: none;
  margin-bottom: -1px;
  padding: 0.5rem 0.75rem;
  cursor: pointer;
`

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
      <TabHeader style={addStyle} onClick={() => selectTab(tabId)}>
        {label}
      </TabHeader>
    </>
  )
}

export default App
