// THIS IS BOILER PLATE FOR CREATING NEW ACTIVITY
import React from "react"
import { nanoid } from "nanoid"
import { Switch } from "../components/Switch"
import {
  ADD_IDEA,
  DELETE_IDEA,
  UPDATE_IDEA,
  START_IDEATION,
  START_REVIEW,
  NEXT_IDEA,
  START_CONVERGING,
  LOAD_SAMPLE_IDEAS,
  addIdea,
  deleteIdea,
  updateIdea,
  nextIdea
} from "./BrainstormActions"

import Ideate from "./Ideate"
import Review from "./Review"
import NotStarted from "./NotStarted"
import Converge from "./Converge"

import {
  ideasOfUser,
  ideaFromId,
  ID_LEN,
  BRAINSTORM_NOT_STARTED,
  BRAINSTORM_IDEATE,
  BRAINSTORM_REVIEW,
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
  likes: 2,
  unlikes: 1,
  reviews: [
    {
      reviewer: "beta@aarvalabs.com",
      review: "nice idea"
    },
    {
      reviewer: "charlie@aarvalabs.com",
      review: "let me make it a better idea, by adding sprinkling some magic"
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
          reviews: [],
          tags: [],
          likes: 0,
          unlikes: 0
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
    case START_REVIEW: {
      const { userIds } = payload

      // Set reviewInfo for each user
      let reviewInfo = {
        userIds: userIds
      }
      userIds.forEach((userId, idx) => {
        reviewInfo[userId] = {}
        reviewInfo[userId]["pos"] = idx
        reviewInfo[userId]["numIdeasToReview"] =
          state.ideas.length - ideasOfUser(state.ideas, userId).length
        /*
        Now let's pre-fill this user's review Q with ideas of the
        previous user i.e. the user to the left of the current user. 
        */
        const prevUserId =
          userIds[(userIds.length + (idx - 1)) % userIds.length]
        reviewInfo[userId]["ideaQ"] = []
        ideasOfUser(state.ideas, prevUserId).forEach((idea) => {
          reviewInfo[userId]["ideaQ"].push(idea.id)
        })

        /*
        Set the idea that the user will review first.
        Pop the first idea IDs from the queue and set it as the curIdeaId.
        */
        reviewInfo[userId]["curIdeaId"] = reviewInfo[userId]["ideaQ"].shift()
      })

      return {
        ...state,
        currentStage: BRAINSTORM_REVIEW,
        reviewInfo
      }
    }
    case NEXT_IDEA: {
      /*
      **BAD CODE ALERT**
      This whole switch case completely ignores concurrency handling.
      Popping from the Q and pushing into the Q should have concurrency
      checks. Otherwise we'll have a mess in our hands.

      This is ok for the sandbox, but may crash production.
      */

      /*
      This action does the following changes
      1. Take the idea that the current user (who id is in the payload)
         just reviwed and append it to the next user's Q of ideas to review.
      2. Take the next idea in the current user's Q and give it to the current
         user for review.
      3. Special cases to handle weird corner cases
      */
      const { userId } = payload
      const { reviewInfo } = state
      const ideaId2Move = reviewInfo[userId]["curIdeaId"]
      const nextUserPos =
        (reviewInfo[userId]["pos"] + 1) % reviewInfo.userIds.length
      const nextUserId = reviewInfo.userIds[nextUserPos]

      let nextUserCurIdeaId
      let nextUserIdeaQ
      if (!reviewInfo[nextUserId]["curIdeaId"]) {
        /*
        If curIdeaId of next user is undefined, it means the next user
        has emptied his/her Q and is waiting for the next idea to review.
        Adding the idea to his/her empty Q will not automatically pop that
        idea and give it to the user. Ideas are popped from the Q only when
        a user clicks on "Next Idea", and if the user is waiting for more
        idea, the "Next Idea" button is not presented (the next idea is
        supposed to load automatically when it becomes available - which is
        exactly what we are doing here.)

        So instead of appending the idea to the next user's Q in this case
        just give to the user for review and leave the Q untouched (i.e empty)
        */
        nextUserCurIdeaId = ideaId2Move
        nextUserIdeaQ = reviewInfo[nextUserId]["ideaQ"]
      } else {
        /*
        If the curIdeaId of next user is defined, it means he/she is still
        reviewing an idea and will hit "Next Idea", which will pop the next
        idea from his/her Q. So we can just append the idea to his/her Q and
        leave the curIdeaId untouched.
        */
        nextUserCurIdeaId = reviewInfo[nextUserId]["curIdeaId"]
        nextUserIdeaQ = reviewInfo[nextUserId]["ideaQ"].concat(ideaId2Move)
      }

      /*
      If the next user is the one who created this idea, we need not give
      this idea to him/her for review. We can just drop this idea and leave
      the next users Q untouched.
      */
      const nextUserReviewInfo =
        nextUserId === ideaFromId(state.ideas, ideaId2Move).creator
          ? {
              ...reviewInfo[nextUserId],
              curIdeaId: nextUserCurIdeaId,
              ideaQ: nextUserIdeaQ
            }
          : {
              ...reviewInfo[nextUserId]
            }

      return {
        ...state,
        reviewInfo: {
          ...reviewInfo,
          [userId]: {
            ...reviewInfo[userId],
            curIdeaId: reviewInfo[userId]["ideaQ"][0],
            ideaQ: reviewInfo[userId]["ideaQ"].slice(1),
            numIdeasToReview: reviewInfo[userId]["numIdeasToReview"] - 1
          },
          [nextUserId]: nextUserReviewInfo
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
  const { ideas, details, reviewInfo } = activity || {}
  const { settings } = activity || {}
  const { seeEveryonesIdeas, showStepwiseInstructions } = settings || false
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
                return <NotStarted user={user} details={details} />
              }
              case BRAINSTORM_IDEATE: {
                return (
                  <Ideate
                    user={user}
                    ideas={ideas}
                    seeEveryonesIdeas={seeEveryonesIdeas}
                    showInstructions={showStepwiseInstructions}
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
              case BRAINSTORM_REVIEW: {
                return (
                  <Review
                    userId={userId}
                    idea={ideaFromId(ideas, reviewInfo[userId]["curIdeaId"])}
                    moreIdeas={reviewInfo[userId]["numIdeasToReview"] > 0}
                    updateIdeaHandler={(updatedIdea) =>
                      dispatch(updateIdea(updatedIdea))
                    }
                    getNextIdea={(userId) => dispatch(nextIdea(userId))}
                    key={reviewInfo[userId]["curIdeaId"]}
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
  const { seeEveryonesIdeas, showStepwiseInstructions } = settings || {}

  const toggleSeeEveryonesIdeas = () => {
    setLaunchSettings({ ...settings, seeEveryonesIdeas: !seeEveryonesIdeas })
  }

  const toggleShowStepwiseInstructions = () => {
    setLaunchSettings({
      ...settings,
      showStepwiseInstructions: !showStepwiseInstructions
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
        <Switch
          id="seeEveryonesIdeas"
          checked={seeEveryonesIdeas}
          onChange={toggleSeeEveryonesIdeas}
        />
      </div>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <label>Show instructrions at the beginning of each step</label>
        <Switch
          id="showStepwiseInstructions"
          checked={showStepwiseInstructions}
          onChange={toggleShowStepwiseInstructions}
        />
      </div>
      <hr />
    </div>
  )
}

const Summary = ({ activity, users, user }) => {
  return <div> Summary - Activity Summary</div>
}

const activityListing = {
  activityId: "ZyncBrainstorming",
  details: {
    title: "Zync Brainstorming",
    description: "Virtual brainstorming made effective.",
    icon: "https://aarvalabs.imfast.io/mydawn/activiity_icon.png"
  },
  settings: {
    videoLayout: "docked", // This should be either 'docked' or 'minimized' which tells how the video hub should be when your activity is launched
    // You can add other settings over here
    seeEveryonesIdeas: false,
    showStepwiseInstructions: false
  },
  currentStage: BRAINSTORM_NOT_STARTED,
  reviewInfo: {},
  ideas: []
}

export { Activity, Settings, Summary, activityReducer, activityListing }
