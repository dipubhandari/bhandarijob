import JobPost from '../../model/PostJob.js'

class JobPostController {

    static JobPost = async (req, res) => {

        // getting the data from frontend
        const { description, position, valid, education, vacancyfor, category, salary, experience } = req.body

        console.log(req.body)

        // validating the data
        if (!(position && valid && salary && vacancyfor && category && education && description)) {
            res.send({ error: 'Please enter all the fields' })
        }
        else {

            const post = await JobPost.create({
                position,
                applydate: valid,
                education,
                vacancy: vacancyfor,
                category,
                salary,
                description,
                experience,
                skills: req.body.skills,
                requirements: req.body.req
            })

            if (post) {
                res.send({ success: 'You Posted a job successfully....' })
            }

        }

    }
    static JobPostApi = async () => {
        try {
            const jobpostapi = await JobPost.find()
            console.log(jobpostapi)
            res.send(jobpostapi)
        } catch (error) {

        }
    }
}



export default JobPostController