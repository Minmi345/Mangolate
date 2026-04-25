import mongoose from 'mongoose'

// get chapters where USER is and status is (!done)
// get chapters by title

const taskSchema = new mongoose.Schema({
  workers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
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

export const addChapter = async (json) =>{
  const  newChapter = new Chapter(json)
  return newChapter.save()
}

export const findChapter = async(id) =>{
  return await Chapter.findOne({_id:id},'name')
}

//chapter 1
// clean : Vika
// type : Htoss
// translate: Htoss
export const findChaptersByUser = async(userId) =>{
  const objectId = new mongoose.Types.ObjectId(userId);
  return await Chapter.find({"tasks.$*.workers": {$in:objectId}},'name tasks')
}

export const removeChapter = async(id) =>{
  return await Chapter.deleteOne({_id: id})
}

export const removeWorkerFromTask = async(chapterId, role, userId) =>{
  const updateKey = `tasks.${role}.workers` //dynamic key for the map
  return await Chapter.findByIdAndUpdate(
    chapterId,
    { $pull: { [updateKey]: userId } }, 
    { new: true }
  )
}
export const addWorkerToTask = async(chapterId, role, userId) =>{
  const updateKey = `tasks.${role}.workers`
  return await Chapter.findByIdAndUpdate(
    chapterId,
    { $addToSet: { [updateKey]: userId } }, 
    { new: true }
  ).populate('tasks.$*.workers', 'name') //MongoDB's "join"
}
export const editRoleStatus = async(chapterId, role, status) =>{
  const updateKey = `tasks.${role}.status`
  return await Chapter.findByIdAndUpdate(
    chapterId,
    { $set: { [updateKey]: status } }, 
    { new: true })

}