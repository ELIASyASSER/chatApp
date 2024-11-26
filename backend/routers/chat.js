import express from "express"
import multer from 'multer'
import { allPeople, getLastActive, getMessage, sendMessage, singleUser, updateLastActive } from "../controllers/chat.js"
import auth from "../middlewares/auth.js"
const router = express.Router()

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


router.route("/user/people").get(auth,allPeople)
router.route("/user/:id").get(singleUser)

//handling messages functionalities
router.route("/sendMsg").post(uploadMiddleware.single("img"),sendMessage)
router.route("/:senderId/:contactId").get(getMessage)

//this part has some issues so it might be deleted or refactored in future 
router.route("/lastActive").put(updateLastActive).get(getLastActive)


export default router