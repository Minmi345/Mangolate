import { findUserByName, addUser } from '../model/user-model.js'
import bcrypt from 'bcryptjs';
import { User } from '../model/user-model.js';
import mongoose, { Mongoose } from 'mongoose';
import { getUsers as getUsersFromDb, updateRolesByName, removeUser, retrieveUsersByRoles } from '../model/user-model.js';

export const getUser = async (req, res) => {
  try {
    const name = req.params.username

    const user = await User.findOne({ name })

    if (!user) return res.status(404).json({ message: "User not found" })
    res.json(user)
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await getUsersFromDb()
    if (!users) return res.status(404).json({ message: "The collection of users is empty" })

    res.json(users)
  }
  catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const insertUser = async (req, res) => {
  try {
    const { name, password, roles } = req.body

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = new User({
      name,
      hashed_password: hashedPassword,
      roles
    })

    await newUser.save()
    res.status(201).json({ message: "User created!", user: newUser })
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const deleteUser = async (req, res) => {
  try {
    const name = req.params.username
    console.log("Attempting to delete:", name)
    const result = await removeUser(name)
    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "Successfully deleted" })
  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}

export const patchUserRoles = async (req, res) => {
  try {
    const { username } = req.params;
    const { roles } = req.body;

    // Validation: check if roles is actually an array
    if (!Array.isArray(roles)) {
      return res.status(400).json({ message: "Roles must be an array of strings" });
    }

    const updatedUser = await updateRolesByName(username, roles);

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" })
    }

    res.json({
      message: "Roles updated successfully",
      user: updatedUser
    })
  } catch (error) {
    res.status(500).json({ error: error.message })
  }
}

export const getUsersByRoles = async (req, res) => {
  try {
    const roles = req.body.roles

    if (!Array.isArray(roles)) {
      return res.status(400).json({ message: "Roles must be an array of strings" })
    }

    const users = await retrieveUsersByRoles(roles)
      console.log("Im here!")
    
    if (!users){
      return res.status(404).json({ message: "Users with this specific role were not found" })
    }
    res.json(users)

  }
  catch (error) {
    res.status(400).json({ error: error.message })
  }
}