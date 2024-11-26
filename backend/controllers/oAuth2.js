import axios from "axios";
import jwt from "jsonwebtoken"
import { User } from "../models/user.js";
import { authParams, config, getTokenParams } from "../utils/oAuth.config.js";


const authUrl = (_, res) => {
    res.json({
        url: `${config.authUrl}?${authParams}`,
    })
}

const authToken =  async (req, res) => {
    const { code } = req.query
    if (!code) return next()
    // res.status(400).json({ message: 'Authorization code must be provided' })

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
      next(err)
    //   res.status(500).json({ message: err.message || 'Server error' })
    }
}

const authLoggedIn =  (req, res) => {

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
}
const authLoggedOut =  (_, res) => {

    // clear cookie

    res.clearCookie('token').json({ message: 'Logged out' })
}

export {
    authUrl,
    authToken,
    authLoggedIn,
    authLoggedOut
}