import React from "react"
import IdeasListing from "./IdeasListing"
import { ideasOfUser } from "./ideaSelectors"

const RoundRobin = ({ user, ideas, roundRobinInfo, updateIdeaHandler }) => {
  const { userId } = user
  const usersCurIdxInQ = roundRobinInfo.idxInQ[userId]
  const reviewedUserId = roundRobinInfo.userIdQ[usersCurIdxInQ]
  const curRound =
    roundRobinInfo.userIdQ.length - (roundRobinInfo.roundsToGo + 1)

  return (
    <>
      {roundRobinInfo.roundsToGo > 0 ? (
        <>
          <h3>Idea Review Round: {curRound}</h3>
          <h5>
            Add your comments / suggestions / improvements to the below ideas.
          </h5>
          <IdeasListing
            ideas={ideasOfUser(ideas, reviewedUserId)}
            deleteIdeaHandler={null}
            updateIdeaHandler={updateIdeaHandler}
          />
        </>
      ) : (
        <h1>Round robins exhausted</h1>
      )}
    </>
  )
}

export default RoundRobin
