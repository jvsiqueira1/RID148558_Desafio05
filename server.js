import express from 'express'
import { routers } from './src/routes/index.js'
import cors from 'cors'

const app = express()

const port = process.env.PORT || 3000

const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(routers)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`)
})