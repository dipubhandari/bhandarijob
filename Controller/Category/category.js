import Category_Model from '../../model/category.js'
class Category {

    // categori api send

    static CategoryApi = async (req, res) => {
        try {

            // getting the data
            const { name } = req.body

            const categories = await Category_Model.find()

            res.send(categories)

        } catch (error) {

        }
    }

    // creating the category api

    static NewCategory = async (req, res) => {
        try {
            const name = req.body.name
            // 
            const newcat = await Category_Model.create({
                name
            })
            res.send('Created')

        } catch (error) {
        }
    }

}

export default Category