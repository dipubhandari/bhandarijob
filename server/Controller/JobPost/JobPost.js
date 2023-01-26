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
                jobdescription: description,
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

        const jobdetail = await Job_Model.findOne({ _id: url })

        if (!jobdetail) {
            res.status(400).send('No result found')
        }
        else {
            //  getting owner information/detail
            const owner = await Employer_Model.findOne({ email: jobdetail.owneremail })

            if (owner) {
                console.log(jobdetail)
                console.log(owner)

                res.send({ companydetail: owner, jobdetail: jobdetail })

            }
            else {
                res.send('No result found')
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