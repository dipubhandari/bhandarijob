import express from 'express'
import http from 'http'
import dotenv from 'dotenv'
import userRoutes from './routes/userRoutes.js'
import bodyParser from 'body-parser'
import connection from './database/connection.js'
dotenv.config()
import cors from 'cors'


const app = express()
const server = http.createServer(app)
connection(process.env.MONGO_URL)
// middleware
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use('/', userRoutes)


server.listen(process.env.port, () => { console.log(`The app is running in port`) })