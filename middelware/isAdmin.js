module.exports = async (req,res,next)=>{
    const isAdmin = req.user.role === "ADMIN";
    if(isAdmin){
        next();
    }
    else {
        res.status(403).json({
            message : "Only admins have access to this route!"
        })
    }
}