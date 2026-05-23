import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import main from './config/config.js'
import UserRoutes from "./routes/UserRoutes.js"
import ContactRoutes from './routes/ContactRoutes.js'
import dns from 'dns'

dotenv.config()

const app = express()
dns.setServers(["1.1.1.1", "8.8.8.8"])

main()

app.use(cors())
app.use(express.json())

app.use( "/auth",UserRoutes)

app.use("/contacts",ContactRoutes)

const PORT = process.env.PORT || 4500;

app.listen(PORT, () => {console.log(`Server Running On Port ${PORT}`)});