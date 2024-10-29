import dotenv from 'dotenv/config.js'
import path from 'path'
import multer from 'multer'
import { fileURLToPath } from 'url'
import  express, { urlencoded }  from "express"
import cookieParser from"cookie-parser"
import cors from "cors"
import jwt  from "jsonwebtoken"
import queryString  from "query-string"
import axios  from "axios"
import mongoose  from 'mongoose'
import {User} from "./models/user.js"
import {Msg} from './models/messages.js'
import { errorHandle } from './middlewares/errors.js'

const  app = express()

const connection = async(url)=>{
  try {
    return mongoose.connect(url)
  } catch (error) {
    console.log(error.message);
  }
}

const config = {
  clientId: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
    tokenUrl: 'https://oauth2.googleapis.com/token',
    redirectUrl: process.env.REDIRECT_URL,
    clientUrl: process.env.CLIENT_URL,
    tokenSecret: process.env.TOKEN_SECRET,
    tokenExpiration: 36000,
    postUrl: 'https://jsonplaceholder.typicode.com/posts',
}

const authParams = queryString.stringify({
    client_id: config.clientId,
    redirect_uri: config.redirectUrl,
    response_type: 'code',
    scope: 'openid profile email',
    access_type: 'offline',
    state: 'standard_oauth',
    prompt: 'consent',

  })
const getTokenParams = (code) =>
    queryString.stringify({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    grant_type: 'authorization_code',
    redirect_uri: config.redirectUrl,
})
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
app.use("/uploads",express.static(path.join(__dirname,'uploads')))

app.use(cors({

    origin:[config.clientUrl],
    credentials:true
}))

app.use(express.json())
app.use(urlencoded({extended:true}))
app.use(cookieParser())
// app.use(express.urlencoded({extended:false}))
const storage = multer.diskStorage({
  destination:function(req,file,cb){
    cb(null,"./uploads")
  },
  filename:function(req,file,cb){
    const parts = file.originalname.split(".")
    const ext = parts[parts.length-1]
    cb(null,`${Date.now()}.${ext}`)
  }
})
const uploadMiddleware = multer({storage})


// Verify auth
const auth = (req, res, next) => {
    try {
      const token = req.cookies.token
      if (!token) return res.status(401).json({ message: 'Unauthorized' })
      jwt.verify(token, config.tokenSecret)
      return next()
    } catch (err) {
      console.log('Error: ', err)
      res.status(401).json({ message: 'Unauthorized' })
    }
  }

app.get('/auth/url', (_, res) => {
    res.json({
        url: `${config.authUrl}?${authParams}`,
    })
    console.log(_.query);
    
})

app.get('/auth/token', async (req, res) => {
    const { code } = req.query
    if (!code) return res.status(400).json({ message: 'Authorization code must be provided' })
    
      try {
      // Get all parameters needed to hit authorization server
      const tokenParam = getTokenParams(code)
      // Exchange authorization code for access token (id token is returned here too)
      const {

        data: { id_token },
      } = await axios.post(`${config.tokenUrl}?${tokenParam}`)
      if (!id_token) return res.status(400).json({ message: 'Auth error' })
      // Get user info from id token
      const { email, name, picture } = jwt.decode(id_token)

      let user = await User.findOne({email:email})

      if(!user){
        user = await User.create({name:name,email:email,picture:picture})

      }


      // Sign a new token
      const token = jwt.sign({ user }, config.tokenSecret, {

        expiresIn: config.tokenExpiration,
      })

      // Set cookies for user
      res.cookie('token', token , {
        maxAge: 900_000,
        httpOnly: true,
      })
      // You can choose to store user in a DB instead
      res.json({

        user,
      })
    } catch (err) {
      console.log('Error: ', err)
      res.status(500).json({ message: err.message || 'Server error' })
    }
  })

  app.get('/auth/logged_in', (req, res) => {

    try {
      // Get token from cookie
      const token = req.cookies.token
      if (!token) return res.json({ loggedIn: false })
      const { user } = jwt.verify(token, config.tokenSecret)
    
      const newToken = jwt.sign({ user }, config.tokenSecret, {
        expiresIn: config.tokenExpiration,
      })
      // Reset token in cookie
      res.cookie('token', newToken, {

        maxAge: 900000,
        httpOnly: true,
      
      })
      res.json({ loggedIn: true, user })
    } catch (err) {
      res.json({ loggedIn: false })
    }
  })

  app.post('/auth/logout', (_, res) => {

    // clear cookie
    res.clearCookie('token').json({ message: 'Logged out' })
  
  })

  app.get('/user/people', auth, async (_, res) => {
    try {
      const people = await User.find({})
      
      // const { data } = await axios.get(config.postUrl)
      res.json({ users:people})
    } catch (err) {
      console.log('Error: ', err)
    }
  
  })
    //single user
  app.get('/user/:id',async(req,res,next)=>{

  const {id} = req.params
  
  try {

    const singleUser = await User.findOne({_id: id})
    if(!singleUser){

      return next()

    }
    return res.status(200).json(singleUser)
    
  } catch (error) {
    
    console.log(error.message);
    
    return next(error)
  }

})

app.post("/sendMsg",uploadMiddleware.single("img"),async(req,res,next)=>{
  
  const imgName = req.file ?req.file.originalname:null
  const{sender,receiver,content} = req.body

  try{
    const newMsg = await Msg.create({message: content,writer:sender,receiver:receiver,img:imgName})
    
    return  res.status(201).json(newMsg)

    
  }catch (error) {
    console.log(error);
    return next(error)
  }  
})



app.get('/:senderId/:contactId',async(req,res,next)=>{
  const {senderId,contactId} = req.params  
  
  try {
    const msgs  = await Msg.find({ 
      $or:[
        {writer:senderId,receiver:contactId},
        {writer:contactId,receiver:senderId},
      ]
    }).sort({createdAt:1})
    
    return res.status(200).json(msgs.map((msg)=>{
      return {...msg.toJSON(),img:`/uploads/${msg.img}`}
    })) 

  
  } 
  catch (error) {
    console.log(error);
    return next(error.message)
    
  }
})

app.use(errorHandle)

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