export const errorHandle =(err,req,res,nex)=>{
    let StatusCode = err.statusCode || 500
    let msg = err.message || "Internal Server Error"
    res.status(StatusCode).json({error:msg})
}
