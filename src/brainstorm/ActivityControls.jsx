import React from "react"
import Timer, { TIMER_COUNTUP } from "./Timer"
import {
  BRAINSTORM_NOT_STARTED,
  BRAINSTORM_IDEATE,
  BRAINSTORM_REVIEW,
  BRAINSTORM_CONVERGE
} from "./brainstormUtils"
import {
  startIdeation,
  startReview,
  startConverging,
  loadSampleIdeas
} from "./BrainstormActions"
import { activityIdeas, activityTags } from "./sampleIdeas"

const ActivityControls = ({ user, users, activityState, dispatch }) => {
  const { userId, role, userName } = user

  return (
    <div className="d-flex mt-3 pr-2 align-items-center">
      <div className="mr-auto">
        <h4>
          {userName} | {userId} -&nbsp;
          <small className="text-secondary">[{role}]</small>
        </h4>
      </div>

      {role === "host" && (
        <div>
          <a
            href="#!"
            className="text-decoration-none"
            onClick={() =>
              dispatch(loadSampleIdeas(activityIdeas, activityTags))
            }
          >
            Load Sample Ideas
          </a>
        </div>
      )}

      <div className="ml-3">
        <Timer type={TIMER_COUNTUP} />
      </div>

      {role === "host"
        ? (() => {
            switch (activityState.currentStage) {
              case BRAINSTORM_NOT_STARTED: {
                return (
                  <div className="ml-3">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => dispatch(startIdeation())}
                    >
                      Start Brainstorming
                    </button>
                  </div>
                )
              }
              case BRAINSTORM_IDEATE: {
                return (
                  <div className="ml-3">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => {
                        dispatch(startReview(Object.keys(users)))
                      }}
                    >
                      Start Review
                    </button>
                  </div>
                )
              }
              case BRAINSTORM_REVIEW: {
                return (
                  <div className="ml-3">
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => dispatch(startConverging())}
                    >
                      Start Converging
                    </button>
                  </div>
                )
              }
              case BRAINSTORM_CONVERGE: {
                return ""
              }
              default: {
                return (
                  <div className="ml-3">
                    <p className="text-danger">
                      You have reached an unsupported stage of brainstorming.
                      How did you get here?
                    </p>
                  </div>
                )
              }
            }
          })()
        : ""}

      {role === "host" && (
        <div className="ml-3">
          <button type="button" className="btn btn-danger">
            End Brainstorming
          </button>
        </div>
      )}
    </div>
  )
}

export default ActivityControls
