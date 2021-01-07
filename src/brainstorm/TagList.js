import { WithContext as ReactTags } from "react-tag-input"
import "./ReactTagStyles.css"

const TagList = ({ idea, tags, addTagHandler }) => {
  const KeyCodes = {
    comma: 188,
    enter: 13
  }

  const delimiters = [KeyCodes.comma, KeyCodes.enter]

  const onAddTag = (tag) => {
    addTagHandler(idea.id || "", tag.text)
  }

  const getTagsForIdea = (tagids) => {
    const ideaTags = []
    tagids.forEach((tid) => {
      const t = tags.filter((tag) => tag.id === tid)
      ideaTags.push(...t)
    })

    return ideaTags
  }

  return (
    <div>
      <ReactTags
        tags={getTagsForIdea(idea.tags || [])}
        delimiters={delimiters}
        suggestions={tags}
        labelField={"text"}
        allowDragDrop={false}
        handleAddition={(e) => onAddTag(e)}
        placeholder="add tags"
      />
    </div>
  )
}

export default TagList
