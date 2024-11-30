/*
  now we need to refactor error handling next time and make it modular
  
*/

import dotenv from 'dotenv/config.js'
import path from 'path'
import { fileURLToPath } from 'url'
import  express, { urlencoded }  from "express"
import cookieParser from"cookie-parser"
import cors from "cors"
import { config } from './utils/oAuth.config.js'
import { errorHandle } from './middlewares/errors.js'

//routers
import chattingRouter from './routers/chat.js'
import authLogic from './routers/oAuth2.js'
import connection from './db/mongoose.js'

const  app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

//middlewares
app.use("/uploads",express.static(path.join(__dirname,'uploads')))
app.use("/imgUploads",express.static(path.join(__dirname,'imgUploads')))

app.use(cors({
    origin:[config.clientUrl],
    credentials:true
}))
app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cookieParser())

//routers
app.use("",authLogic)
app.use("",chattingRouter)


//error handling
app.use(errorHandle)

//server starter function

async function start() {
  const PORT  = process.env.PORT || 4000

  try {
    
    await connection(process.env.MONGO_URI)
    console.log('database connected ');
    app.listen(PORT,()=>{
            console.log("server is listening ");
    })
  } catch (error) {
    console.log(error.message );
    process.exit(1)

  }
  
}

start()


