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
      {roundRobinInfo.roundsToGo >= 0 ? (
        <>
          <h3>Idea Review Round: {curRound}</h3>
          <p className="mt-3 mb-3">
            Add your comments / suggestions / improvements to the below ideas.
          </p>
          <IdeasListing
            viewerId={userId}
            ideas={ideasOfUser(ideas, reviewedUserId)}
            allowAnyoneToEdit={false}
            allowNewComments={true}
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
