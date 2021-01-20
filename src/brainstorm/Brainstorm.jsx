// THIS IS BOILER PLATE FOR CREATING NEW ACTIVITY
import React from "react"
import { nanoid } from "nanoid"
import {
  ADD_IDEA,
  DELETE_IDEA,
  UPDATE_IDEA,
  START_IDEATION,
  START_REVIEW,
  NEXT_IDEA,
  START_CONVERGING,
  SET_ACTIVE_CONVERGE_IDEA,
  SELECT_TAG,
  LOAD_SAMPLE_IDEAS,
  ADD_TAG,
  DELETE_TAG,
  addIdea,
  deleteIdea,
  updateIdea,
  nextIdea,
  setActiveConvergeIdea,
  addTag,
  addToSelectedTags,
  deleteTag
} from "./BrainstormActions"

import Ideate from "./Ideate"
import Review from "./Review"
import NotStarted from "./NotStarted"
import Converge from "./Converge"

import {
  ideaFromId,
  ID_LEN,
  BRAINSTORM_NOT_STARTED,
  BRAINSTORM_IDEATE,
  BRAINSTORM_REVIEW,
  BRAINSTORM_CONVERGE,
  ideasOfOtherUsers,
  pickFirstIdeaFromReviewPool,
  removeElementFromArray
} from "./brainstormUtils"
import ActivityControls from "./ActivityControls"

/*
Sample content of an idea

const idea = {
  ideaId: "uuid",
  ideaContent: "This is an idea",
  creator: "alpha@aarvalabs.com",
  tags: ["tag1", "tag2", "tag2"]
  upvotes: 3,
  reviews: [
    {
      reviewer: "beta@aarvalabs.com",
      text: "nice idea"
    },
    {
      reviewer: "charlie@aarvalabs.com",
      text: "let me make it a better idea, by adding sprinkling some magic"
    }
  ],
  actionItems: "execute on the idea",
  assignees: ["alpha@aarvalabs.com", "bravo@aarvalabs.com"]
}
*/

/*
function: refreshUserForReview
Helper function to do
1. select and return an unreviewed idea from a pool of ideas to
   be reviewed. 
2. remove the selected idea from the review pool as well as the
   list of unreviewed ideas
3. add the reviewed idea back to the review pool

Parameters:
  reviewedIdeaId:    Id of the idea that the user has just reviewed
  unreviewedIdeaIds: Array of IDs of ideas that the user should review,
                     but has not yet reviewed.
  reviewPool:        Array of IDs of ideas that are available for review
                     by users (i.e. ideas not currently being reviewed by
                     any user).

Return Value:
 ideaIdBeingReviewed: Id of the idea selected to be reviewed by the user
*/

const refreshUserForReview = (
  reviewedIdeaId,
  unreviewedIdeaIds,
  reviewPool
) => {
  /*
  Pick an idea from the reviewPool that the user has not
  already reviewed. The unreviewedIdeaIds is a list of idea
  ids that the user should review but has not reviewed yet.
  */
  const ideaIdBeingReviewed = pickFirstIdeaFromReviewPool(
    unreviewedIdeaIds,
    reviewPool
  )

  /*
  Remove the idea id of the idea being reviewed by this user from the
  review pool as well as the unreviewed idea id list of this user
  */
  if (ideaIdBeingReviewed) {
    removeElementFromArray(unreviewedIdeaIds, ideaIdBeingReviewed)
    removeElementFromArray(reviewPool, ideaIdBeingReviewed)
  }

  /* Put the idea that the user just reviewed, back into the review pool */
  if (reviewedIdeaId) {
    reviewPool.push(reviewedIdeaId)
  }

  /* Return the idea that the user will now review */
  return ideaIdBeingReviewed
}

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
          upvotes: 0
        })
      }
    }
    case ADD_TAG: {
      const { ideaId, tagStr } = payload
      const existingTag = (state.tags || []).find((tag) => tag.text === tagStr)
      const tagId = existingTag?.id || nanoid(ID_LEN)

      return {
        ...state,
        tags: existingTag
          ? state.tags
          : (state.tags || []).concat({
              id: tagId,
              text: tagStr
            }),
        ideas: state.ideas.map((idea) => {
          if (idea.id === ideaId) {
            const updatedIdea = {
              ...idea,
              tags: idea.tags.includes(tagId)
                ? idea.tags
                : idea.tags.concat(tagId)
            }
            return updatedIdea
          }
          return idea
        })
      }
    }
    case DELETE_TAG: {
      const { ideaId, tagId } = payload
      return {
        ...state,
        ideas: state.ideas.map((idea) => {
          if (idea.id === ideaId) {
            const updatedIdea = {
              ...idea,
              tags: idea.tags.filter((tag) => tag !== tagId)
            }
            return updatedIdea
          }
          return idea
        })
      }
    }
    case DELETE_IDEA: {
      const { id } = payload

      /*
      If we are in converge stage and the idea being deleted
      is the selected idea, then we have to update the selectedIdeaId
      in converge info, otherwise converge step will blow up.
      */
      let newSelectedIdeaId = state.convergeInfo.selectedIdeaId

      /*
      If we are deleting the last element, let's reset selectedIdeaId
      to empty string
      */
      if (state.ideas.length === 1) {
        newSelectedIdeaId = ""
      } else {
        if (id === state.convergeInfo.selectedIdeaId) {
          /*
        Let's set the previous idea as the selected idea.
        If the idea being deleted is the first idea, let's
        set next idea as the selected idea.
        */
          const idx = state.ideas.findIndex((idea) => idea.id === id)
          newSelectedIdeaId = state.ideas[idx === 0 ? 1 : idx - 1].id
        }
      }

      return {
        ...state,
        ideas: state.ideas.filter((idea) => idea.id !== id),
        convergeInfo: {
          ...state.convergeInfo,
          selectedIdeaId: newSelectedIdeaId
        }
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

      let reviewInfo = {
        reviewPool: state.ideas.map((idea) => idea.id),
        users: {}
      }

      userIds.forEach((userId) => {
        reviewInfo["users"][userId] = {}

        /*
        Get the ids of all ideas that this user did not create and
        add it to this user's list of unreviewed ideas
        */
        reviewInfo["users"][userId]["unreviewedIdeaIds"] = ideasOfOtherUsers(
          state.ideas,
          userId
        ).map((idea) => idea.id)

        /*
        pick an idea id from review pool and set it as the one that
        this user will review
        */
        reviewInfo["users"][userId][
          "ideaIdBeingReviewed"
        ] = refreshUserForReview(
          undefined,
          reviewInfo["users"][userId]["unreviewedIdeaIds"],
          reviewInfo["reviewPool"]
        )
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

      Besides, this does not check for the case where the review pool
      becomes empty, which is quite possible.
      */

      /*
      XXX Todo
      Below scenarios are not explicitly tested and can possibly break.
      These need to be covered and any gaps need to be fixed.
      1. Number of users > number of ideas
      2. An empty review pool
      */

      const { userId } = payload
      const { reviewInfo } = state
      const reviewedIdeaId = reviewInfo["users"][userId]["ideaIdBeingReviewed"]

      /*
      Create a deep copy of review info, so that we can update it
      and set it in the state. Since review info has a nested structure
      updating it property by property in the state can become cumbersome.
      */
      let newReviewInfo = JSON.parse(JSON.stringify(reviewInfo))

      newReviewInfo["users"][userId][
        "ideaIdBeingReviewed"
      ] = refreshUserForReview(
        reviewedIdeaId,
        newReviewInfo["users"][userId]["unreviewedIdeaIds"],
        newReviewInfo["reviewPool"]
      )

      /*
      If any other user has pending ideas to review, but is currently waiting for
      one of these ideas to show up in the review pool, refresh them to see if the
      idea we put back in the pool can be reviewed by one of them.
      */

      for (const userId in newReviewInfo["users"]) {
        if (
          !newReviewInfo["users"][userId]["ideaIdBeingReviewed"] &&
          newReviewInfo["users"][userId]["unreviewedIdeaIds"].length > 0
        ) {
          newReviewInfo["users"][userId][
            "ideaIdBeingReviewed"
          ] = refreshUserForReview(
            undefined,
            newReviewInfo["users"][userId]["unreviewedIdeaIds"],
            newReviewInfo["reviewPool"]
          )
        }
      }

      return {
        ...state,
        reviewInfo: newReviewInfo
        /*         reviewInfo: {
          ...reviewInfo,
          reviewPool: newReviewPool,
          users: {
            ...reviewInfo.users,
            [userId]: {
              ideaIdBeingReviewed: ideaIdBeingReviewed,
              unreviewedIdeaIds: newUnreviewedIdeaIds
            }
          }
        } */
      }
    }
    case START_CONVERGING: {
      return {
        ...state,
        currentStage: BRAINSTORM_CONVERGE
      }
    }
    case SET_ACTIVE_CONVERGE_IDEA: {
      const { selectedIdeaId } = payload

      const updatedConvergeInfo = state.convergeInfo
      updatedConvergeInfo.selectedIdeaId = selectedIdeaId
      return {
        ...state,
        convergeInfo: updatedConvergeInfo
      }
    }
    case SELECT_TAG: {
      const { selectedTagId } = payload

      // Remove tag from selectedTags if it already exists. Add if it doesn't already exist.
      const updatedSelectedTags = (
        state.convergeInfo.selectedTags || []
      ).includes(selectedTagId)
        ? state.convergeInfo.selectedTags.filter((tag) => tag !== selectedTagId)
        : (state.convergeInfo.selectedTags || []).concat(selectedTagId)

      // If selectedTags is empty, select all ideas. Otherwise, filter ideas by tags in selectedTags.
      const updatedFilteredIdeas =
        updatedSelectedTags && updatedSelectedTags.length > 0
          ? state.ideas.filter((idea) => {
              return (
                idea.tags.filter((t) => updatedSelectedTags.includes(t))
                  .length > 0
              )
            })
          : state.ideas

      return {
        ...state,
        convergeInfo: {
          selectedTags: updatedSelectedTags,
          filteredIdeas: updatedFilteredIdeas
        }
      }
    }
    default:
      return {
        ...state
      }
  }
}

const Activity = ({ activity, users, user, eventDispatch }) => {
  const { ideas, tags, reviewInfo, convergeInfo } = activity || {}
  const { userId } = user || {}
  const { settings } = activity || {}
  const topic =
    settings.topic ||
    "Too bad, looks like we have no idea what we are brainstorming about."

  return (
    <>
      <div className="container-fluid">
        <ActivityControls
          user={user}
          users={users}
          activityState={activity}
          dispatch={eventDispatch}
        />
        <hr />
      </div>
      <div className="container">
        <div className="mb-3 ml-2 mr-2 mt-4">
          {(() => {
            switch (activity.currentStage) {
              case BRAINSTORM_NOT_STARTED: {
                return <NotStarted user={user} topic={topic} />
              }
              case BRAINSTORM_IDEATE: {
                return (
                  <Ideate
                    user={user}
                    topic={topic}
                    ideas={ideas}
                    tags={tags}
                    onAddClicked={(ideaContent) => {
                      eventDispatch(addIdea(ideaContent, userId))
                    }}
                    deleteIdeaHandler={(id) => eventDispatch(deleteIdea(id))}
                    updateIdeaHandler={(updatedIdea) =>
                      eventDispatch(updateIdea(updatedIdea))
                    }
                    addTagHandler={(ideaId, tagStr) => {
                      eventDispatch(addTag(ideaId, tagStr))
                    }}
                    deleteTagHandler={(ideaId, tagId) => {
                      eventDispatch(deleteTag(ideaId, tagId))
                    }}
                  />
                )
              }
              case BRAINSTORM_REVIEW: {
                return (
                  <Review
                    userId={userId}
                    topic={topic}
                    idea={ideaFromId(
                      ideas,
                      reviewInfo["users"][userId]["ideaIdBeingReviewed"]
                    )}
                    moreIdeas={
                      reviewInfo["users"][userId]["unreviewedIdeaIds"].length >
                      0
                    }
                    updateIdeaHandler={(updatedIdea) =>
                      eventDispatch(updateIdea(updatedIdea))
                    }
                    getNextIdea={(userId) => eventDispatch(nextIdea(userId))}
                    key={reviewInfo["users"][userId]["ideaIdBeingReviewed"]}
                    tags={tags}
                    addTagHandler={(ideaId, tagStr) => {
                      eventDispatch(addTag(ideaId, tagStr))
                    }}
                    deleteTagHandler={(ideaId, tagId) => {
                      eventDispatch(deleteTag(ideaId, tagId))
                    }}
                  />
                )
              }
              case BRAINSTORM_CONVERGE: {
                return (
                  <Converge
                    user={user}
                    users={users}
                    topic={topic}
                    selectedIdeaId={convergeInfo.selectedIdeaId || ideas[0].id}
                    ideas={
                      convergeInfo.selectedTags &&
                      convergeInfo.selectedTags.length > 0
                        ? convergeInfo.filteredIdeas
                        : ideas
                    }
                    deleteIdeaHandler={(id) => eventDispatch(deleteIdea(id))}
                    updateIdeaHandler={(updatedIdea) =>
                      eventDispatch(updateIdea(updatedIdea))
                    }
                    selectIdeaHandler={(selectedIdeaId) =>
                      eventDispatch(setActiveConvergeIdea(selectedIdeaId))
                    }
                    tags={tags}
                    selectedTags={convergeInfo.selectedTags}
                    selectTagHandler={(selectedTagId) =>
                      eventDispatch(addToSelectedTags(selectedTagId))
                    }
                    addTagHandler={(ideaId, tagStr) => {
                      eventDispatch(addTag(ideaId, tagStr))
                    }}
                    deleteTagHandler={(ideaId, tagId) => {
                      eventDispatch(deleteTag(ideaId, tagId))
                    }}
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
  const updateTopic = (topic) => {
    setLaunchSettings({
      ...settings,
      topic: topic
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
        <label>Brainstorm ideas on...</label>
        <input
          type="text"
          onBlur={(event) => updateTopic(event.target.value)}
          style={{ width: "300px" }}
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
    icon:
      "https://res.cloudinary.com/zync/image/upload/v1608690626/activity_icons/bazinga_zmp0uw.png"
  },
  settings: {
    videoLayout: "docked", // This should be either 'docked' or 'minimized' which tells how the video hub should be when your activity is launched
    // You can add other settings over here
    topic: ""
  },
  brainstormQuestion: "What are we brainstorming about?",
  currentStage: BRAINSTORM_NOT_STARTED,
  reviewInfo: {},
  convergeInfo: {
    filteredIdeas: [],
    selectedIdeaId: "",
    selectedTags: []
  },
  ideas: []
}

export { Activity, Settings, Summary, activityReducer, activityListing }
