import { Chapter, addChapter, findChapter, removeChapter, removeWorkerFromTask, addWorkerToTask, editRoleStatus, findChaptersByUser} from '../model/chapter-model.js'
// create 1 chapter
// delete 1 chapter
//retrieve 1 chapter
//change 1 role - remove 1 person
//change from 1 status to another

// get chapters where USER is and status is (!done)
// get chapters by title

export const postChapter = async (req, res) => {
  try {
    const newChapter = new Chapter(req.body)
    await addChapter(newChapter)
    res.status(201).json(newChapter)
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const getChapter = async (req, res) => {
  try {
    const id = req.params.id
    const chapter = await findChapter(id)
    if (!chapter) res.status(404).json({ message: "Chapter wasn't found" })
    res.json(chapter)
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}
export const getChaptersByUser = async (req, res) => {
  try {
    const id = req.params.id
    const chapters = await findChaptersByUser(id)
    if (!chapters || chapters.length === 0) res.status(404).json({ message: "User doesn't have any chapters connected to them" })
    res.json(chapters)
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const deleteChapter = async (req, res) => {
  try {
    const id = req.params.id
    const result = await removeChapter(id)
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Chapter not found" })
    }
    res.json({ message: "Successfully deleted" })
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const deleteWorkerFromTask = async (req, res) => {
  try {
    const { chapterId, role, userId } = req.params
    const updatedChapter = await removeWorkerFromTask(chapterId, role, userId)

    if (!updatedChapter) {
      return res.status(404).json({ message: "Chapter not found" })
    }

    res.json({
      message: `Removed user from ${role}`,
      chapter: updatedChapter
    })
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}
export const putWorkerToTask = async (req, res) => {
  try {
    const { chapterId, role, userId } = req.params
    const updatedChapter = await addWorkerToTask(chapterId, role, userId)

    if (!updatedChapter) {
      return res.status(404).json({ message: "Chapter not found" })
    }

    res.json({
      message: `Now user is a ${role}`,
      chapter: updatedChapter
    })
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}
export const patchRoleStatus = async (req, res) => {
  try {
    const { chapterId, role, status } = req.params
    const updatedChapter = await editRoleStatus(chapterId, role, status.replace(/([a-z])([A-Z])/g, '$1 $2'))

    if (!updatedChapter) {
      return res.status(404).json({ message: "Chapter not found" })
    }

    res.json({
      message: `Now status is ${status}`,
      chapter: updatedChapter
    })
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}