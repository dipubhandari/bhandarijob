import JobPost from '../../model/PostJob.js'

class JobPostController {

    static JobPost = async (req, res) => {

        // getting the data from frontend
        const { description, position, applydate, education, vacancy, category, salary, experience } = req.body

        console.log(req.body)

        // validating the data
        if (!(position && applydate && education && vacancy && category && salary && description && experience)) {
            res.send({error:'Please enter all the fields'})
        }
        else {
            
        }

    }
}



export default JobPostController