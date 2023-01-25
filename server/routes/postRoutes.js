import express from 'express'
import JobPostController from '../Controller/JobPost/JobPost.js'
const postRoutes = express.Router()

postRoutes.post('/post', JobPostController.JobPost)
postRoutes.get('/api/jobpost', JobPostController.JobPostApi)


export default postRoutes