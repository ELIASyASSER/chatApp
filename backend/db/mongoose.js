import mongoose from "mongoose";
const connection = async(url)=>{
    try {
      return mongoose.connect(url)
    } catch (error) {
      console.log(error.message);
    }
  }

  export default connection