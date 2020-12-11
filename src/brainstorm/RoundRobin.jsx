import React from "react"
import IdeasListing from "./IdeasListing"
import { ideasOfUser } from "./ideaSelectors"

const RoundRobin = ({ userId, ideas, roundRobinInfo, updateIdeaHandler }) => {
  const usersCurIdxInQ = roundRobinInfo.idxInQ[userId]
  const reviewedUserId = roundRobinInfo.userIdQ[usersCurIdxInQ]
  return (
    <>
      {roundRobinInfo.roundsToGo > 0 ? (
        <IdeasListing
          ideas={ideasOfUser(ideas, reviewedUserId)}
          deleteIdeaHandler={null}
          updateIdeaHandler={updateIdeaHandler}
        />
      ) : (
        <h1>Round robins exhausted</h1>
      )}
    </>
  )
}

export default RoundRobin
