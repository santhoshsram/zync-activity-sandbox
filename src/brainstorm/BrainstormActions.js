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
Action to start BRAINSTORM_REVIEW step
*/
export const START_REVIEW = "START_REVIEW"
export const startReview = (userIds) => ({
  type: START_REVIEW,
  payload: { userIds }
})

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

/*
Action to get the next idea from the user's review Q
*/
export const NEXT_IDEA = "NEXT_IDEA"
export const nextIdea = (userId) => ({
  type: NEXT_IDEA,
  payload: {
    userId
  }
})

/*
Action to set the current idea that the host has selected
in the converge step
*/
export const SET_ACTIVE_CONVERGE_IDEA = "SET_ACTIVE_CONVERGE_IDEA"
export const setActiveConvergeIdea = (selectedIdeaId) => ({
  type: SET_ACTIVE_CONVERGE_IDEA,
  payload: {
    selectedIdeaId
  }
})

/*
Action to add a tag to an idea and update list of tags
*/
export const ADD_TAG = "ADD_TAG"
export const addTag = (ideaId, tagStr) => ({
  type: ADD_TAG,
  payload: {
    ideaId,
    tagStr
  }
})

/*
Action to delete a tag on an idea
*/
export const DELETE_TAG = "DELETE_TAG"
export const deleteTag = (ideaId, tagId) => ({
  type: DELETE_TAG,
  payload: {
    ideaId,
    tagId
  }
})

/*
Action to add a tag to list of selected tags in the converge step
*/
export const SELECT_TAG = "SELECT_TAG"
export const addToSelectedTags = (selectedTagId) => ({
  type: SELECT_TAG,
  payload: {
    selectedTagId
  }
})
