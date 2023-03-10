import express from 'express'
import EmployerController from '../Controller/Employer/EmployerController.js'
import JobSeekerController from '../Controller/JobSeeker/JobSeeker.js'
import multer from 'multer'

const userRoutes = express.Router()

// company upload
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads/logo')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({ storage: storage })
// company upload


// newuser routes
userRoutes.post('/newuser', JobSeekerController.UserAccountCreation)
userRoutes.post('/login', JobSeekerController.User__Login)
userRoutes.post('/checklogin', JobSeekerController.Check__Login)
userRoutes.get('/alljobseeker', JobSeekerController.AllJobSekeer)

// individual user route

userRoutes.post('/update-jobseeker-details',JobSeekerController.UpdateJobSeekerDetail)
userRoutes.get('/jobseeker-details/:id', JobSeekerController.JobSeekerDetails)

// employer route
userRoutes.post('/account-company-owner', upload.single('logo'), EmployerController.UserAccountCreation)
userRoutes.get('/allemployer', EmployerController.AllEmployer)
userRoutes.get('/company-details/:id', EmployerController.CompanyDetail)
userRoutes.post('/update-company-details', upload.single('avatar'), EmployerController.UpdateCompanyDetail)
// userRoutes.post('/update-jobseeker-details',  JobSeekerController.UpdateJobSeekerDetail)


userRoutes.post('/change-password', EmployerController.ChangePassword)

export default userRoutes