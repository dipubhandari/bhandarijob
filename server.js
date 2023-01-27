import express from 'express'
import http from 'http'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import bodyParser from 'body-parser'
import connection from './database/connection.js'
dotenv.config()
import cors from 'cors'
import mongoose from 'mongoose'
import postRoutes from './routes/postRoutes.js'
import categoryRoutes from './routes/categoryRoute.js'
import path from 'path'

const app = express()
connection(process.env.MONGO_URL)
const server = http.createServer(app)

// app.use(formData.parse())

app.use(cors())

app.use(express.static(process.cwd() + '/uploads/logo'))

app.use('/uploads/logo', express.static(path.join(process.cwd(), './uploads/logo')))

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use(bodyParser.urlencoded({ extended: true }))

app.use(bodyParser.json())

// app.use('/', postRoutes)

app.use('/', userRoutes)

app.use('/', categoryRoutes)

app.use('/', postRoutes)



app.use(express.static(path.join(process.cwd(), '/build')))

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), "./build/index.html"))
})

// deploy code


server.listen(process.env.port, () => { console.log(`The app is running in port`) })
