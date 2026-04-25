import { findUserByName, addUser } from '../model/user-model.js'
import bcrypt from 'bcryptjs'
import { User } from '../model/user-model.js'
import mongoose, { Mongoose } from 'mongoose'
import { getUsers as getUsersFromDb, updateRolesByName, removeUser, retrieveUsersByRoles } from '../model/user-model.js'

// create 1 chapter
// delete 1 chapter
//retrieve 1 chapter
//change 1 role
//change from 1 status to another

// get chapters where USER is and status is (!done)
// get chapters by title