import express from 'express'
import { router } from './route/index.js'
import { errorHandler } from '../middleware/errorHandler.js'
import logger from 'morgan'
import cors from 'cors'

export const app = express()
app.use(express.json())

//from Deema lecture
app.use(cors())

// Use the morgan logger
app.use(logger('dev', { immediate: true }))

app.use('/', router)

// 404 handler
app.use(errorHandler.notFoundDefault)

// Global error handler
app.use(errorHandler.errorDefault)
