import express from 'express'
import Category from '../Controller/Category/category.js'

const categoryRoutes = express.Router()


categoryRoutes.get('/api/categories', Category.CategoryApi)
categoryRoutes.post('/api/createcategory', Category.NewCategory)


export default categoryRoutes