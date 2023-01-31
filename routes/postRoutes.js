import express from 'express'
import JobPostController from '../Controller/JobPost/JobPost.js'
const postRoutes = express.Router()
import multer from 'multer'


// company upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './resume')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })
// company upload
// application api
postRoutes.get('/application/:employer/:postid', JobPostController.GetApplication)
// post a job by acompany
postRoutes.post('/post', JobPostController.JobPost)
// postRoutes.post('/api/jobpost', JobPostController.JobPostApi)
postRoutes.get('/api/jobpost', JobPostController.JobPostApi)
// upload reusme or apply for job
postRoutes.post('/apply', upload.single('resume'), JobPostController.Apply)
// application api
postRoutes.get('/api/applications', JobPostController.Application)
// search route
postRoutes.post('/api/jobpost', JobPostController.Search)
// job detail page
postRoutes.get('/job-post-detail/:id', JobPostController.GetNaukariDetails)
// jo post
postRoutes.get('/api/companyjobs/:id', JobPostController.GetPost)

export default postRoutes