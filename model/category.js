import mongoose from "mongoose"

const Category_Schema = new mongoose.Schema({
    name: { type: String, required: true },
    createdAt: { type: Date, default: Date.now() }
})

const Category_Model = mongoose.model('category', Category_Schema)

export default Category_Model