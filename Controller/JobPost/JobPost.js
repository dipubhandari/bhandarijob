import JobPost from '../../model/PostJob.js'
import Employer_Model from '../../model/employer.js'
import Job_Model from '../../model/PostJob.js'
import JobSeeker_Model from '../../model/JobSeeker.js'
import Apply_Model from '../../model/Apply_Model.js'
import fs from 'fs'

class JobPostController {



    // delete application
    static DeleteApplication = async (req, res) => {
        const id = req.body.applicationid
        const remove = await Apply_Model.findByIdAndDelete(id)
        if (remove) {
            res.send({ success: 'Remove Sucessfully....' })
        }
    }

    // download

    static Download = async (req, res) => {
        const id = req.params.id


        console.log(req.params.id)
        // find the resume
        const resume = await Apply_Model.findOne({ _id: id })

        const fileName = `resume`
        const fileURL = `${process.cwd()}/resume/${resume.resume}`
        const stream = fs.createReadStream(fileURL);
        res.set({
            'Content-Disposition': `attachment; filename='${fileName}'`,
            'Content-Type': 'application/pdf',
        });
        stream.pipe(res);
    }
    // download
    // get application data to show in employer sashboard
    static GetApplication = async (req, res) => {

        const post = req.params.postid
        const employer = req.params.employer
        const emp = await Employer_Model.findOne({ _id: employer })
        const application = await Apply_Model.find({ owner: emp.email, appliedjob: post })

        if (application) {
            res.send(application)
        }

    }


    static GetPost = async (req, res) => {

        const id = req.params.id


        const user = await Employer_Model.findOne({ _id: id })

        const useremail = user.email


        const post = await Job_Model.find({ owneremail: useremail })

        if (post) {
            res.send(post)
        }
        else {
            res.send('something gone wrong')
        }

    }
    //apply

    static Apply = async (req, res) => {
        try {

            const jobseeker = req.body.jobseeker
            const jobpostId = req.body.jobpost
            const resume = req.file.filename



            if (!(jobseeker && jobpostId && resume)) {
                res.send({ error_msg: 'Login or detail is not in correct format..' })
            }
            //   getting the user
            const user = await JobSeeker_Model.findOne({ _id: jobseeker })
            // check if already applied

            const checkApplied = user.jobapplied
            let exist = false
            user.jobapplied.forEach((item, id) => {
                if (item == jobpostId) {
                    exist = true
                }
            })
            if (exist) {
                res.send({ error_msg: 'Already Applied' })
            }
            else {
                const userapplication = [...checkApplied, jobpostId]
                const updateuser = await JobSeeker_Model.updateOne({
                    _id: jobseeker
                }, { jobapplied: userapplication })

                if (updateuser) {
                    const owner = await Job_Model.findOne({ _id: req.body.jobpost })
                    const apply = await Apply_Model.create({
                        name: user.name,
                        email: user.email,
                        resume: resume,
                        owner: owner.owneremail,
                        appliedjob: jobpostId
                    })
                    if (apply) {

                        res.send({ success: "Applied successful" })
                    }
                    else {


                        res.send({ error_msg: 'Try Again..' })
                    }
                }
                else {
                }
            }




        } catch (error) {

        }

    }




    // all application api create
    static Application = async (req, res) => {
        const applications = await Apply_Model.find()
        if (applications) {
            res.send(applications)
        }
        else {
            res.send('Something gone wrong')
        }
    }
    // search

    static Search = async (req, res) => {

        const skills = req.body.skills || []
        const keyword = req.body.keyword || ''
        const location = req.body.location || ''
        const category = req.body.category || ''



    }

    // search
    static JobPost = async (req, res) => {

        // getting the data from frontend
        const { description, position, valid, education, vacancyfor, category, salary, experience, token } = req.body



        // validating the data
        if (!(position && valid && salary && vacancyfor && category && education && description)) {
            res.send({ error: 'Please enter all the fields...' })
        }
        else {
            // getting the user who posted the postbased on token id

            const owner = await Employer_Model.findOne({ _id: token })
            const post = await JobPost.create({
                owneremail: owner.email,
                companyname: owner.companyname,
                logo: owner.logo,
                position,
                applydate: valid,
                education,
                vacancy: vacancyfor,
                category,
                address: owner.address,
                salary,
                jobdescription: description,
                experience,
                skills: req.body.skill,
                requirements: req.body.req
            })

            if (post) {
                res.send({ success: 'You Posted a job successfully....' })
            }

        }

    }


    static GetNaukariDetails = async (req, res) => {

        const url = req.params.token
        console.log(url)
        const jobdetail = await Job_Model.findOne({ _id: url })

        if (!jobdetail) {
            res.status(400).send('No result found')
        }
        else {
            //  getting owner information/detail
            const owner = await Employer_Model.findOne({ email: jobdetail.owneremail })
            owner.password = null
            var dateObj = jobdetail.applydate;
            var month = dateObj.getUTCMonth() + 1;
            var day = dateObj.getUTCDate();
            var year = dateObj.getUTCFullYear();

            const newdate = year + "/" + month + "/" + day;
            jobdetail.applydate = newdate
            console.log(newdate)
            console.log(jobdetail)
            if (owner) {

                res.send({ companydetail: owner, jobdetail })

            }
            else {
                res.send('No result found')
            }


        }
    }
    static JobPostApi = async (req, res) => {
        try {
            const jobpostapi = await JobPost.find().sort({ createdAt: 'desc' }).limit(16)

            res.send(jobpostapi)
        } catch (error) {

        }
    }

}



export default JobPostController