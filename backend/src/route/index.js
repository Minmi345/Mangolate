import express from 'express'
import { router as helloRoute } from './hello.js'
import { router as userRoute } from './users.js'
import { router as titleRoute } from './title.js'
import { router as chapterRoute } from './chapter.js'

export const router = express.Router()
router.use('/', helloRoute)
router.use('/users', userRoute)
router.use('/titles', titleRoute)
router.use('/chapters', chapterRoute)