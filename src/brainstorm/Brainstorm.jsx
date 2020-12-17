// THIS IS BOILER PLATE FOR CREATING NEW ACTIVITY
import React from "react"
import { nanoid } from "nanoid"
import { Switch } from "../components/Switch"
import {
  ADD_IDEA,
  DELETE_IDEA,
  UPDATE_IDEA,
  START_IDEATION,
  START_ROUND_ROBIN,
  MOVE_TO_NEXT_ROUND_RR,
  START_CONVERGING,
  LOAD_SAMPLE_IDEAS,
  addIdea,
  deleteIdea,
  updateIdea,
  nextRoundRR
} from "./BrainstormActions"

import Ideate from "./Ideate"
import RoundRobin from "./RoundRobin"
import NotStarted from "./NotStarted"
import Converge from "./Converge"

import {
  ID_LEN,
  BRAINSTORM_NOT_STARTED,
  BRAINSTORM_IDEATE,
  BRAINSTORM_ROUND_ROBIN,
  BRAINSTORM_CONVERGE
} from "./brainstormUtils"
import ActivityControls from "./ActivityControls"

/*
Sample content of an idea

const idea = {
  ideaId: "uuid",
  ideaContent: "This is an idea",
  creator: "alpha@aarvalabs.com",
  assignee: "alpha@aarvalabs.com",
  tags: ["tag1", "tag2", "tag2"]
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

const activityReducer = (state, action) => {
  const { type, payload } = action
  switch (type) {
    case LOAD_SAMPLE_IDEAS: {
      const { sampleIdeas } = payload
      return {
        ...state,
        ideas: sampleIdeas
      }
    }
    case ADD_IDEA: {
      const { ideaContent, creator } = payload
      const id = nanoid(ID_LEN)
      return {
        ...state,
        ideas: state.ideas.concat({
          id,
          ideaContent,
          creator,
          comments: [],
          tags: []
        })
      }
    }
    case DELETE_IDEA: {
      const { id } = payload
      return {
        ...state,
        ideas: state.ideas.filter((idea) => idea.id !== id)
      }
    }
    case UPDATE_IDEA: {
      const { updatedIdea } = payload
      return {
        ...state,
        ideas: state.ideas.map((idea) => {
          if (idea.id === updatedIdea.id) {
            return updatedIdea
          }
          return idea
        })
      }
    }
    case START_IDEATION:
      return {
        ...state,
        currentStage: BRAINSTORM_IDEATE
      }
    case START_ROUND_ROBIN: {
      const { userIds } = payload
      let roundRobinInfo = {
        userIdQ: userIds,
        idxInQ: {},
        roundsToGo: userIds.length - 2
      }
      userIds.forEach((userId, idx) => {
        roundRobinInfo["idxInQ"][userId] = (idx + 1) % userIds.length
      })
      return {
        ...state,
        currentStage: BRAINSTORM_ROUND_ROBIN,
        roundRobinInfo
      }
    }
    case MOVE_TO_NEXT_ROUND_RR: {
      const idxInQ = {}
      state.roundRobinInfo.userIdQ.forEach((userId) => {
        idxInQ[userId] =
          (state.roundRobinInfo.idxInQ[userId] + 1) %
          state.roundRobinInfo.userIdQ.length
      })
      const roundsToGo = state.roundRobinInfo.roundsToGo - 1
      return {
        ...state,
        roundRobinInfo: {
          ...state.roundRobinInfo,
          idxInQ,
          roundsToGo
        }
      }
    }
    case START_CONVERGING: {
      return {
        ...state,
        currentStage: BRAINSTORM_CONVERGE
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
  const { settings } = activity || {}
  const { seeEveryonesIdeas } = settings || false
  const { meetingInfo } = settings || {}
  const { userId } = user || {}

  return (
    <>
      <div className="container-fluid">
        <ActivityControls
          user={user}
          users={users}
          activityState={activity}
          dispatch={dispatch}
        />
        <hr />
      </div>
      <div className="container">
        <div className="mb-3 ml-2 mr-2 mt-4">
          {(() => {
            switch (activity.currentStage) {
              case BRAINSTORM_NOT_STARTED: {
                return <NotStarted user={user} meetingInfo={meetingInfo} />
              }
              case BRAINSTORM_IDEATE: {
                return (
                  <Ideate
                    user={user}
                    ideas={ideas}
                    seeEveryonesIdeas={seeEveryonesIdeas}
                    onAddClicked={(ideaContent) => {
                      dispatch(addIdea(ideaContent, userId))
                    }}
                    deleteIdeaHandler={(id) => dispatch(deleteIdea(id))}
                    updateIdeaHandler={(updatedIdea) =>
                      dispatch(updateIdea(updatedIdea))
                    }
                  />
                )
              }
              case BRAINSTORM_ROUND_ROBIN: {
                return (
                  <RoundRobin
                    user={user}
                    ideas={ideas}
                    roundRobinInfo={activity.roundRobinInfo}
                    updateIdeaHandler={(updatedIdea) =>
                      dispatch(updateIdea(updatedIdea))
                    }
                    moveToNextRoundRR={() => dispatch(nextRoundRR())}
                  />
                )
              }
              case BRAINSTORM_CONVERGE: {
                return (
                  <Converge
                    user={user}
                    ideas={ideas}
                    deleteIdeaHandler={(id) => dispatch(deleteIdea(id))}
                    updateIdeaHandler={(updatedIdea) =>
                      dispatch(updateIdea(updatedIdea))
                    }
                  />
                )
              }
              default: {
                return (
                  <h2 className="text-danger">
                    You have reached an unsupported stage of brainstorming. How
                    did you get here?
                  </h2>
                )
              }
            }
          })()}
        </div>
      </div>
    </>
  )
}

const Settings = ({ settings, setLaunchSettings }) => {
  const { seeEveryonesIdeas, meetingInfo } = settings || {}
  const { title, agenda } = meetingInfo

  const toggle = () => {
    setLaunchSettings({ ...settings, seeEveryonesIdeas: !seeEveryonesIdeas })
  }

  const updateTitle = (title) => {
    setLaunchSettings({
      ...settings,
      meetingInfo: {
        ...meetingInfo,
        title: title
      }
    })
  }

  const updateAgenda = (agenda) => {
    setLaunchSettings({
      ...settings,
      meetingInfo: {
        ...meetingInfo,
        agenda: agenda
      }
    })
  }

  return (
    <div
      style={{
        width: "500px"
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <label>Everyone see&rsquo;s everyone&rsquo;s ideas</label>
        <Switch checked={seeEveryonesIdeas} onChange={toggle}></Switch>
      </div>
      <hr />
      <div
        className="mb-2"
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <label>Title</label>
        <input
          className="border border-secondary px-2 py-1"
          style={{ width: "70%" }}
          contentEditable
          suppressContentEditableWarning
          placeholder="Brainstorm title..."
          defaultValue={title}
          onBlur={(event) => updateTitle(event.target.value)}
        />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <label>Agenda</label>
        <textarea
          className="border border-secondary px-2 py-1"
          style={{ width: "70%" }}
          contentEditable
          suppressContentEditableWarning
          placeholder="Brainstorm genda..."
          defaultValue={agenda}
          onBlur={(event) => updateAgenda(event.target.value)}
        />
      </div>
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
    seeEveryonesIdeas: false,
    meetingInfo: {
      title: "",
      agenda: ""
    }
  },

  currentStage: BRAINSTORM_NOT_STARTED,
  roundRobinInfo: {
    userIdQ: [],
    idxInQ: {},
    roundsToGo: -1
  },
  ideas: []
}

export { Activity, Settings, Summary, activityReducer, activityListing }
