import {User} from "../models/user.js"
import {Msg} from '../models/messages.js'


const allPeople = async (_, res,next) => {
    try {
        const people = await User.find({})
        res.json({ users:people})
    } catch (err) {
    console.log('Error: ', err)
    next(err)

    }
}
const singleUser =async(req,res,next)=>{
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
}

const sendMessage = async(req,res,next)=>{

    const imgName = req.file ?req.file.filename:null
    const{sender,receiver,content} = req.body

    try{
    const newMsg = await Msg.create({message: content,writer:sender,receiver:receiver,img:imgName})

    return  res.status(201).json(newMsg)


    }catch (error) {
        console.log(error);
        next(error)
    }  
}


const  getMessage  = async(req,res,next)=>{
    
    const {senderId,contactId} = req.params  
    
    try {
    const msgs  = await Msg.find({ 
        $or:[
            {writer:senderId,receiver:contactId},
            {writer:contactId,receiver:senderId},
        ]
        }).sort({createdAt:1})
        const lastMsg = await Msg.findOne({
        $or:[
            {writer:senderId,receiver:contactId},
            {writer:contactId,receiver:senderId},
        ]
        }).sort({createdAt:-1}).limit(1)

        return res.status(200).json(
    
        {messages:msgs.map((msg)=>{
        if(msg.img ==null){
            return {...msg.toJSON()}
        }else{
            return {...msg.toJSON(),img:`/uploads/${msg.img}`}
        }

        })
    
    ,lastmessage:lastMsg}) 

} 

    catch (error) {
        console.log(error);
        return next(error)
        
    }
}

const updateLastActive  = async(req,res,next)=>{
    const {receiverId}  = req.body
    try {

        const lastTime = await User.findByIdAndUpdate(receiverId,{lastActive:new Date()})
        if(!lastTime){
        return next()
        }

        res.sendStatus(200);
    } catch (error) {
    next(error)
    }
}

const getLastActive = async(req,res,next)=>{
    const {id} = req.query
    try {
      const user = await User.findById(id,'lastActive')
  
      if(!user){
        return next()
      }
      res.status(200).json({lastActive:user})
    } catch (error) {
      next(error)
    }
  
  }

export {

        allPeople,
        singleUser,
        sendMessage,
        getMessage,
        updateLastActive,
        getLastActive

}