export const ID_LEN = 11
export const BRAINSTORM_NOT_STARTED = "BRAINSTORM_NOT_STARTED"
export const BRAINSTORM_IDEATE = "BRAINSTORM_IDEATE"
export const BRAINSTORM_ROUND_ROBIN = "BRAINSTORM_ROUND_ROBIN"
export const BRAINSTORM_REVIEW = "BRAINSTORM_REVIEW"
export const BRAINSTORM_CONVERGE = "BRAINSTORM_CONVERGE"

export const ideasOfUser = (ideas, userId) =>
  ideas.filter((idea) => idea.creator === userId)

export const ideaFromId = (ideas, ideaId) =>
  ideas.find((idea) => idea.id === ideaId)
