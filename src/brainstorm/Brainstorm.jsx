// THIS IS BOILER PLATE FOR CREATING NEW ACTIVITY
import React from "react"
import { nanoid } from "nanoid"
import { Switch } from "../components/Switch"
import IdeasListing from "./IdeasListing"
import AddNewIdea from "./AddNewIdea"
import { ADD_IDEA, DELETE_IDEA, addIdea, deleteIdea } from "./BrainstormActions"

const ID_LEN = 11

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

const sampleIdeas = [
  {
    ideaId: "idea-1",
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
  },
  {
    ideaId: "idea-2",
    ideaContent:
      "This is a really long idea. Let us see if there is space to fit this idea in the sticky.",
    creator: "beta@aarvalabs.com",
    assignee: "beta@aarvalabs.com",
    comments: [
      {
        commenter: "alpha@aarvalabs.com",
        comment: "nice idea"
      },
      {
        commenter: "charlie@aarvalabs.com",
        comment: "let me make it a better idea, by adding sprinkling some magic"
      }
    ]
  },
  {
    ideaId: "idea-3",
    ideaContent: "Ideas are dime a dozen, execution is what matters.",
    creator: "charlie@aarvalabs.com",
    assignee: "charlie@aarvalabs.com",
    comments: [
      {
        commenter: "alpha@aarvalabs.com",
        comment: "nice idea"
      },
      {
        commenter: "beta@aarvalabs.com",
        comment: "let me make it a better idea, by adding sprinkling some magic"
      }
    ]
  }
]

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
    default:
      return {
        ...state
      }
  }
}

const Activity = ({ activity, users, user, dispatch }) => {
  const { ideas } = activity || {}
  const { userId, role, userName } = user || {}

  return (
    <div className="container-fluid">
      <h2 className="mb-3 mt-3 ml-1">
        {userName} | ({userId})- {role}
      </h2>
      <IdeasListing
        ideas={myIdeas(activity, userId)}
        deleteIdeaHandler={(id) => dispatch(deleteIdea(id))}
      />
      <AddNewIdea
        onAddClicked={(ideaContent) => {
          dispatch(addIdea(ideaContent, userId))
        }}
      />
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
  },
  ideas: []
}

export { Activity, Settings, Summary, activityReducer, activityListing }
