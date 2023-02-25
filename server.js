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
import chatRoutes from './routes/chatRoute.js'


// instance
const app = express()
const server = http.createServer(app)

// db connection
const DATABASE_URL = process.env.MONGO_URL || 'mongodb://localhost:27017'
connection(DATABASE_URL)
// middlewares
app.use(cors())

app.use(express.static(process.cwd() + '/uploads/logo'))

app.use('/uploads/logo', express.static(path.join(process.cwd(), './uploads/logo')))

app.use(express.urlencoded({ extended: false }))

app.use(express.json())

app.use(bodyParser.json({ limit: "50mb" }))

app.use(express.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))


app.use('/', userRoutes)
app.use('/', categoryRoutes)
app.use('/', postRoutes)
app.use('/api/chat', chatRoutes)

app.get('/', (req, res) => {
    res.sendFile(path.join(process.cwd(), "./build/index.html"))
})

app.get('*', (req, res) => {
    res.sendFile(path.join(process.cwd(), "./build/index.html"))
})

app.use(express.static(path.join(process.cwd(), '/build')))




// listen the app
server.listen(process.env.port, () => { console.log(`The app is running in port`) })
