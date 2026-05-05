import mongoose from 'mongoose'
import { Title } from './title-model.js'

// get chapters where USER is and status is (!done)
// get chapters by title

const taskSchema = new mongoose.Schema({
  workers: [{
    type: String,
    default: [],
    required: false
  }],
  deadline: {
    type: Date,
    min: '2025-01-20'
  },
  status: {
    type: String,
    enum: ["Not started", "In Progress", "Done"], // enum restricts values
    default: "Not started"
  }
}, { _id: false }) // We don't need a separate ID for every task

const chapterSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  Deadline: { //has deadline to every chapter
    type: Date,
    min: '2025-01-20',
  },
  titleId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Title',
    required: true
  },
  tasks: {
    type: Map,
    of: taskSchema
  },
})

// create 1 chapter ✅
// delete 1 chapter ✅
//retrieve 1 chapter ✅
// retrieve all chapters that user has with isPublished = false
//change 1 role (remove worker)✅
//change 1 role (add worker)✅
//change from 1 status to another✅

// Export the Model
export const Chapter = mongoose.model('Chapter', chapterSchema, 'Chapters')

export const addChapter = async (json, name, titleId) => {

  const existing = await Chapter.findOne({ name: name, titleId: titleId })
  if (existing) throw new Error("Chapter already exists for this title")

  const newChapter = new Chapter(json)
  return newChapter.save()
}

export const findChapter = async (id) => {
  return await Chapter.findOne({ _id: id }, 'name')
}

export const retrieveChapters = async () => {
  return await Chapter.find()
}

export const findChaptersByTitle = async (titleName) => {
  const title = await Title.findOne({ name: titleName })
  if (!title) return []

  return await Chapter.find({ titleId: title._id })
}

export const findChaptersByUser = async (userId) => {
  const objectId = new mongoose.Types.ObjectId(userId)
  return await Chapter.aggregate([
    //Filter documents where the user exists in any role
    {
      $match: {
        $or: [
          { "tasks.cleaner.workers": objectId },
          { "tasks.typer.workers": objectId },
          { "tasks.translator.workers": objectId },
          { "tasks.editor.workers": objectId }
        ]
      }
    },
    {
      // Look up name, returns an array
      $lookup: {
        from: "Titles",
        localField: "titleId",
        foreignField: "_id",
        as: "titleData"
      }
    },
    //dearray $lookup
    //from the mongodb docs:
    //Deconstructs an array field from the input documents to output a document for each element. 
    // Each output document is the input document with the value of the array field replaced by the element.
    { $unwind: "$titleData" },
    //create an obj that we return
    {
      $project: {
        titleName: "$titleData.name",
        chapterName: "$name",
        // ["k":"cleaner", "v":{data}]
        taskArray: { $objectToArray: "$tasks" }
      }
    },
    //unpack weird array we made (we made duplicates with chapters as well)
    { $unwind: "$taskArray" },
    // //filter it through again
    { $match: { "taskArray.v.workers": objectId } },
    {
      $project: {
        _id: 0,
        titleName: 1,
        chapterName: 1,
        role: "$taskArray.k",
        deadline: "$taskArray.v.deadline",
        status: "$taskArray.v.status"
      }
    }
  ])
}

export const removeChapter = async (name, titleId) => {
  return await Chapter.deleteOne({
    name: name,
    titleId: titleId
  })
}

export const removeWorkerFromTask = async (chapterId, role, userId) => {
  const updateKey = `tasks.${role}.workers` //dynamic key for the map
  return await Chapter.findByIdAndUpdate(
    chapterId,
    { $pull: { [updateKey]: userId } },
    { new: true }
  )
}
export const addWorkerToTask = async (chapterId, role, userId) => {
  const updateKey = `tasks.${role}.workers`
  return await Chapter.findByIdAndUpdate(
    chapterId,
    { $addToSet: { [updateKey]: userId } },
    { new: true }
  ).populate('tasks.$*.workers', 'name') //MongoDB's "join"
}
export const editRoleStatus = async (chapterId, role, status) => {
  const updateKey = `tasks.${role}.status`
  return await Chapter.findByIdAndUpdate(
    chapterId,
    { $set: { [updateKey]: status } },
    { new: true })

}

export const changePublish = async (name, titleId, isPublished) => {
  return await Chapter.updateOne({
    name: name,
    titleId: titleId
  },
  {
    isPublished: isPublished
  })
}