import { config } from "../utils/oAuth.config.js"
import jwt from "jsonwebtoken"

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

export default auth