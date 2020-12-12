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
  startIdeation,
  startRoundRobin,
  nextRoundRR,
  startConverging,
  loadSampleIdeas
} from "./BrainstormActions"

import Ideate from "./Ideate"
import RoundRobin from "./RoundRobin"
import NotStarted from "./NotStarted"
import { sampleIdeas } from "./sampleIdeas"

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
  const { userId, role, userName } = user || {}

  return (
    <div className="container-fluid">
      <h2 className="mb-3 mt-3 ml-1">
        {userName} | ({userId}) - {role}
      </h2>
      {role === "host" && (
        <button
          type="button"
          className="ml-2 mt-3 btn btn-outline-info float-left"
          onClick={() => dispatch(loadSampleIdeas(sampleIdeas))}
        >
          Load Sample Ideas
        </button>
      )}

      {(() => {
        switch (activity.currentStage) {
          case BRAINSTORM_NOT_STARTED: {
            return (
              <NotStarted
                role={role}
                startNextStage={() => dispatch(startIdeation())}
              />
            )
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
                startNextStage={() =>
                  dispatch(startRoundRobin(Object.keys(users)))
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
                startNextStage={() => dispatch(startConverging())}
              />
            )
          }
          case BRAINSTORM_CONVERGE: {
            return (
              <h4 className="text-warning">
                Converge stage is still under development.
              </h4>
            )
          }
          default: {
            return (
              <h2 className="text-danger">
                You have reached an unsupported stage of brainstorming. How did
                you get here?
              </h2>
            )
          }
        }
      })()}
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
  roundRobinInfo: {
    userIdQ: [],
    idxInQ: {},
    roundsToGo: -1
  },
  ideas: []
}

export { Activity, Settings, Summary, activityReducer, activityListing }
