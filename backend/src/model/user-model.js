import { dbClient } from './connect.js'
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true, 
    unique: true // Prevents duplicate usernames
  },
  hashed_password: { 
    type: String, 
    required: true 
  },
  roles: { 
    type: [String], // Array of strings
    default: [] 
  }
});

// Export the Model
export const User = mongoose.model('User', userSchema, 'Users');
const userCollection = dbClient.db('Mangolate').collection('Users')

export const findUserByName = async (name) => {
  return await User.findOne({ name });
}

export const getUsers = async () => {
  return await User.find();
}

export const addUser = async (json) =>{
  return await userCollection.insertOne(json)
}

export const removeUser = async (name) => {
  return await userCollection.deleteOne({name})
}

export const updateRolesByName = async (name, newRoles) => {
  // findOneAndUpdate takes: (filter, update, options)
  return await User.findOneAndUpdate(
    { name: name },
    { $set: { roles: newRoles } }, // $set ensures only this field changes
    { new: true, runValidators: true } // 'new: true' returns the updated document
  );
};

export const retrieveUsersByRoles = async (roles) =>{
  //return await User.find({ roles: { $in: roles } });
  return await User.find(
    { roles: { $in: roles } }, 
    'name -_id')
}