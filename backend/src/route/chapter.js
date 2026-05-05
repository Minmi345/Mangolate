import express from 'express'
import {postChapter, getChapter,patchPublish,getChapters, getChaptersByTitle, deleteChapter, deleteWorkerFromTask, putWorkerToTask, patchRoleStatus} from '../controller/chapter-controller.js'

export const router = express.Router()

router.post('/',postChapter)
router.get('/:id',getChapter)
router.get('/',getChapters)
router.get('/title/:name',getChaptersByTitle)
router.delete('', deleteChapter)
router.delete('/:chapterId/tasks/:role/workers/:userId',deleteWorkerFromTask)
router.patch('/:chapterId/tasks/:role/workers/:userId',putWorkerToTask)
router.patch('/:chapterId/tasks/:role/:status',patchRoleStatus)
router.patch('/publish/',patchPublish)
export default router
