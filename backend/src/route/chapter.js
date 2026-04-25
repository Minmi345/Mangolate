import express from 'express'


export const router = express.Router()

router.post('/',postChapter)
router.get('/:id',getChapter)
router.delete('/:id', deleteChapter)
export default router
