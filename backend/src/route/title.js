import express from 'express'
import { postTitle, getTitle, deleteTitle } from '../controller/title-controller.js'

export const router = express.Router()

router.post('/',postTitle)
router.get('/:id',getTitle)
router.delete('/:id', deleteTitle)
export default router
