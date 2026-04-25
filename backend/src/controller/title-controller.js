import { Title, addTitle, findTitle, removeTitle } from '../model/title-model.js'

// get 1 title ✅
// create title (with usual roles in it) ✅
// delete title ✅

//for later:
// change name
// change default workers
// etc..

export const postTitle = async (req, res) => {
  try {
    const newTitle = new Title(req.body)
    await addTitle
    res.status(201).json(newTitle)
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const getTitle = async (req, res) => {
  try {
    const id = req.params.id
    const title = await findTitle(id)
    if (!title) res.status(404).json({ message: "Title wasn't found" })
    res.json(title)
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const deleteTitle = async (req, res) => {
  try {
    const id = req.params.id
    await removeTitle(id)
    // if (!title) res.status(404).json({ message: "Title wasn't found" })
    res.json({ message: "Successfully deleted" })
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}