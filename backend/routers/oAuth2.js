import express from "express"
import { authLoggedIn, authLoggedOut, authToken, authUrl } from "../controllers/oAuth2.js"
const router  = express.Router()

router.get("/auth/url",authUrl)
router.get("/auth/token",authToken)
router.get("/auth/logged_in",authLoggedIn)
router.post("/auth/logout",authLoggedOut)


export default router 