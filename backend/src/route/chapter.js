import express from 'express'
import {postChapter, getChapter, deleteChapter, deleteWorkerFromTask, putWorkerToTask, patchRoleStatus} from '../controller/chapter-controller.js'

export const router = express.Router()

router.post('/',postChapter)
router.get('/:id',getChapter)
router.delete('/:id', deleteChapter)
router.delete('/:chapterId/tasks/:role/workers/:userId',deleteWorkerFromTask)
router.patch('/:chapterId/tasks/:role/workers/:userId',putWorkerToTask)
router.patch('/:chapterId/tasks/:role/:status',patchRoleStatus)
export default router
