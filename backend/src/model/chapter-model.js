import mongoose from 'mongoose'

// get chapters where USER is and status is (!done)
// get chapters by title

const taskSchema = new mongoose.Schema({
  workers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
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
    required: true,
    unique: true // Prevents duplicate titles
  },
  isPublished: {
    type: Boolean,
    default: false
  },
  Deadline: { //has deadline to every chapter
    type: Date,
    min: '2025-01-20',
  },
  TitleId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Title',
    required: true
  },
  Tasks: {
    type: taskSchema
  },
})

// create 1 chapter ✅
// delete 1 chapter ✅
//retrieve 1 chapter ✅
// retrieve all chapters that user has with isPublished = false
//change 1 role
//change from 1 status to another

// Export the Model
export const Chapter = mongoose.model('Chapter', chapterSchema, 'Chapters')

export const addChapter = async (json) =>{
  return await Chapter.save(json)
}

export const findChapter = async(id) =>{
  return await Chapter.findOne({_id:id},'name')
}

export const removeChaper = async(id) =>{
  return await Chapter.deleteOne({_id: id})
}