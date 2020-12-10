// THIS IS BOILER PLATE FOR CREATING NEW ACTIVITY
import React from "react"
import { nanoid } from "nanoid"
import { Switch } from "../components/Switch"
import IdeasListing from "./IdeasListing"
import AddNewIdea from "./AddNewIdea"
import {
  ADD_IDEA,
  DELETE_IDEA,
  START_IDEATION,
  START_ROUND_ROBIN,
  addIdea,
  deleteIdea,
  startIdeation,
  startRoundRobin
} from "./BrainstormActions"

const ID_LEN = 11
const BRAINSTORM_NOT_STARTED = "BRAINSTORM_NOT_STARTED"
const BRAINSTORM_IDEATE = "BRAINSTORM_IDEATE"
const BRAINSTORM_ROUND_ROBIN = "BRAINSTORM_ROUND_ROBIN"
const BRAINSTORM_CONVERGE = "BRAINSTORM_CONVERGE"

/*
Sample content of an idea

const idea = {
  ideaId: "uuid",
  ideaContent: "This is an idea",
  creator: "alpha@aarvalabs.com",
  assignee: "alpha@aarvalabs.com",
  comments: [
    {
      commenter: "beta@aarvalabs.com",
      comment: "nice idea"
    },
    {
      commenter: "charlie@aarvalabs.com",
      comment: "let me make it a better idea, by adding sprinkling some magic"
    }
  ]
}
*/

const myIdeas = (state, userId) =>
  state.ideas.filter((idea) => idea.creator === userId)

const activityReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case ADD_IDEA: {
      const { ideaContent, creator } = payload
      const id = nanoid(ID_LEN)
      return {
        ...state,
        ideas: state.ideas.concat({ id, ideaContent, creator })
      }
    }
    case DELETE_IDEA: {
      const { id } = payload
      return {
        ...state,
        ideas: state.ideas.filter((idea) => idea.id !== id)
      }
    }
    case START_IDEATION:
      return {
        ...state,
        currentStage: BRAINSTORM_IDEATE
      }
    case START_ROUND_ROBIN:
      const { userIds } = payload
      let roundRobinQueue = {}
      userIds.forEach((userId) => {
        roundRobinQueue[userId] = userIds.filter((id) => id !== userId)
      })
      return {
        ...state,
        currentStage: BRAINSTORM_ROUND_ROBIN,
        roundRobinQueue
      }
    default:
      return {
        ...state
      }
  }
}

const Activity = ({ activity, users, user, dispatch }) => {
  const { ideas } = activity || {}
  const { settings } = activity || {}
  const { seeEveryonesIdeas } = settings || false
  const { userId, role, userName } = user || {}

  if (activity.currentStage === BRAINSTORM_NOT_STARTED) {
    /*
    XXX TODO:
    Instead of comparing role directly to a string "host" the values for
    roles should be defined as constants in some file and imported into
    Activity.
    */
    if (role === "host") {
      return (
        <button
          type="button"
          className="m-3 btn btn-danger"
          onClick={() => dispatch(startIdeation())}
        >
          Start Brainstorming
        </button>
      )
    } else {
      return (
        <h4 className="m-3">
          Host has not started the brainstorming activity yet. Please wait.
        </h4>
      )
    }
  } else if (activity.currentStage === BRAINSTORM_ROUND_ROBIN) {
    return (
      <h4 className="m-3">Round robin stage has not been implemented yet.</h4>
    )
  }

  return (
    <div className="container-fluid">
      <h2 className="mb-3 mt-3 ml-1">
        {userName} | ({userId})- {role}
      </h2>
      {role === "host" ? (
        <button
          type="button"
          className="mr-2 mt-3 mb-3 btn btn-danger float-right"
          onClick={() => dispatch(startRoundRobin(Object.keys(users)))}
        >
          Start Round Robin
        </button>
      ) : (
        ""
      )}
      <AddNewIdea
        onAddClicked={(ideaContent) => {
          dispatch(addIdea(ideaContent, userId))
        }}
      />
      <IdeasListing
        ideas={seeEveryonesIdeas ? ideas : myIdeas(activity, userId)}
        deleteIdeaHandler={(id) => dispatch(deleteIdea(id))}
      />
    </div>
  )
}

const Settings = ({ settings, setLaunchSettings }) => {
  const { seeEveryonesIdeas } = settings || {}
  const toggle = () => {
    setLaunchSettings({ ...settings, seeEveryonesIdeas: !seeEveryonesIdeas })
  }
  return (
    <div
      style={{
        display: "flex",
        width: "500px",
        justifyContent: "space-between"
      }}
    >
      <div>Everyone see&rsquo;s everyone&rsquo;s ideas</div>
      <Switch checked={seeEveryonesIdeas} onChange={toggle}></Switch>
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
    seeEveryonesIdeas: false
  },
  currentStage: BRAINSTORM_NOT_STARTED,
  roundRobinQueue: {},
  ideas: []
}

export { Activity, Settings, Summary, activityReducer, activityListing }
