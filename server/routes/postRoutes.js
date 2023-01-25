import express from 'express'
import JobPostController from '../Controller/JobPost/JobPost.js'
const postRoutes = express.Router()

postRoutes.post('/post', JobPostController.JobPost)


export default postRoutes