import React from "react"
import IdeasListing from "./IdeasListing"
import { ideasOfUser } from "./ideaSelectors"
import { startConverging } from "./BrainstormActions"

const RoundRobin = ({
  user,
  ideas,
  roundRobinInfo,
  updateIdeaHandler,
  moveToNextRoundRR,
  startNextStage
}) => {
  const { userId, role } = user
  const usersCurIdxInQ = roundRobinInfo.idxInQ[userId]
  const reviewedUserId = roundRobinInfo.userIdQ[usersCurIdxInQ]
  const curRound =
    roundRobinInfo.userIdQ.length - (roundRobinInfo.roundsToGo + 1)

  return (
    <>
      {roundRobinInfo.roundsToGo >= 0 ? (
        <>
          {role === "host" ? (
            <>
              {roundRobinInfo.roundsToGo === 0 ? (
                <button
                  type="button"
                  className="m-3 btn btn-danger float-right"
                  onClick={startNextStage}
                >
                  Start Converging
                </button>
              ) : (
                <button
                  type="button"
                  className="m-3 btn btn-primary float-right"
                  onClick={moveToNextRoundRR}
                >
                  Next Round
                </button>
              )}
            </>
          ) : (
            ""
          )}
          <h3 className="mt-4">Idea Review Round: {curRound}</h3>
          <h5 className="mt-3">
            Add your comments / suggestions / improvements to the below ideas.
          </h5>
          <IdeasListing
            ideas={ideasOfUser(ideas, reviewedUserId)}
            deleteIdeaHandler={null}
            updateIdeaHandler={updateIdeaHandler}
          />
        </>
      ) : (
        <h1 className="text-danger">
          Round robins exhausted. You shouldn&rsquo;t have gotten here.
        </h1>
      )}
    </>
  )
}

export default RoundRobin