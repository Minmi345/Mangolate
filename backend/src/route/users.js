import express from 'express'
import { getUser, getUsers, insertUser, patchUserRoles,verifyUser, deleteUser, getUsersByRoles} from '../controller/user-controller.js'
import { getChaptersByUser } from '../controller/chapter-controller.js'

export const router = express.Router()

router.get('/', getUsers)  

router.get('/role', getUsersByRoles)

router.get('/:username', getUser) 
router.get('/:id/chapters', getChaptersByUser) 
// router.post('/verify', verifyUser) 

router.post('/', insertUser)

router.patch('/:username', patchUserRoles)

router.delete('/:username', deleteUser)

export default router