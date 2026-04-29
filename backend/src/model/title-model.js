import mongoose from 'mongoose'

const titleSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true // Prevents duplicate titles
  },
  roles: { 
    type: [String], // Array of strings
    default: ["cleaner", "typer", "tranlator", "editor"]
  },
  //could be several admins
  admins: [{
    type : mongoose.Schema.Types.ObjectId,
    ref : 'User'
  }],
  isOngoing: {
    type : Boolean,
    default : true
  },
  defaultWorkers:{
    type : Map,
    of: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    default: {}
  },
  usualDeadline: {
    type: Number,
    default: 7
  }
})

// Export the Model
export const Title = mongoose.model('Title', titleSchema, 'Titles')

export const addTitle = async (json) =>{
  return await Title.save(json)
}
export const retrieveTitles = async () => {
  return await Title.find()
}

export const findTitle = async(id) =>{
  return await Title.findOne({_id:id},'name')
}

export const removeTitle = async(id) =>{
  return await Title.deleteOne({_id: id})
}