import JobPost from '../../model/PostJob.js'
import Employer_Model from '../../model/employer.js'
import Job_Model from '../../model/PostJob.js'

class JobPostController {

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
            console.log(owner)
            const post = await JobPost.create({
                owneremail: owner.email,
                companyname: owner.companyname,
                logo: owner.logo,
                position,
                applydate: valid,
                education,
                vacancy: vacancyfor,
                category,
                salary,
                description,
                experience,
                skills: req.body.skill,
                requirements: req.body.req
            })

            if (post) {
                res.send({ success: 'You Posted a job successfully....' })
                console.log(post)
            }

        }

    }
    static GetNaukariDetails = async (req, res) => {
        const url = req.params.id
        console.log(url)
        const jobdetail = await Job_Model.find({ _id: url })
        console.log(jobdetail)
        if (!jobdetail) {
            res.status(400).send('No result found')
        }
        else {
            // getting the company details who posted this job
            const companydetail = await Employer_Model.find({ email: owneremail })
            if (companydetail) {
                const jobdetails = { ...companydetail, ...jobdetail }
                console.log(jobdetails)
                res.send(jobdetails)

            }
        }
    }
    static JobPostApi = async (req, res) => {
        try {
            const jobpostapi = await JobPost.find().sort({ createdAt: 'desc' })

            res.send(jobpostapi)
        } catch (error) {

        }
    }
}



export default JobPostController