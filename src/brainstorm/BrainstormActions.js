/*
Action to add a new idea
*/
export const ADD_IDEA = "ADD_IDEA"
export const addIdea = (ideaContent, creator) => ({
  type: ADD_IDEA,
  payload: {
    ideaContent,
    creator
  }
})

/*
Action to delete an idea
*/
export const DELETE_IDEA = "DELETE_IDEA"
export const deleteIdea = (id) => ({
  type: DELETE_IDEA,
  payload: {
    id
  }
})

/*
Action to update an idea
*/
export const UPDATE_IDEA = "UPDATE_IDEA"
export const updateIdea = (updatedIdea) => ({
  type: UPDATE_IDEA,
  payload: {
    updatedIdea
  }
})

/*
Action to start BRAINSTORM_IDEATE step
*/
export const START_IDEATION = "START_IDEATION"
export const startIdeation = () => ({ type: START_IDEATION })

/*
Action to start BRAINSTORM_ROUND_ROBIN step
*/
export const START_ROUND_ROBIN = "START_ROUND_ROBIN"
export const startRoundRobin = (userIds) => ({
  type: START_ROUND_ROBIN,
  payload: { userIds }
})

/*
Action to move to next round in round robin step
*/
export const MOVE_TO_NEXT_ROUND_RR = "MOVE_TO_NEXT_ROUND_RR"
export const nextRoundRR = () => ({ type: MOVE_TO_NEXT_ROUND_RR })

/*
Action to start BRAINSTORM_IDEATE step
*/
export const START_CONVERGING = "START_CONVERGING"
export const startConverging = () => ({ type: START_CONVERGING })

/*
Action to load sample ideas
*/
export const LOAD_SAMPLE_IDEAS = "LOAD_SAMPLE_IDEAS"
export const loadSampleIdeas = (sampleIdeas) => ({
  type: LOAD_SAMPLE_IDEAS,
  payload: {
    sampleIdeas
  }
})
