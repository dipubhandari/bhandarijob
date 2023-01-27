import express from 'express'
import JobPostController from '../Controller/JobPost/JobPost.js'
const postRoutes = express.Router()

postRoutes.post('/post', JobPostController.JobPost)
// postRoutes.post('/api/jobpost', JobPostController.JobPostApi)
postRoutes.get('/api/jobpost', JobPostController.JobPostApi)

postRoutes.post('/api/jobpost', JobPostController.Search)

postRoutes.get('/job-post-detail/:id', JobPostController.GetNaukariDetails)

export default postRoutes