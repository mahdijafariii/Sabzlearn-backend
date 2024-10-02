const categoryModel = require('../models/category')
const getAll =async (req, res) =>{
    const getAll = await categoryModel.find({}).lean()
    res.status(200).json(getAll);
}
const addCategory =async (req, res) =>{
    const { identifier , password } = req.body;
    const user = await userModel.findOne({
        $or : [{username : identifier} , {email : identifier}]
    }).lean();
    if(!user){
        return res.status(404).json({
            message : 'User not found with this email/username!'
        });
    }
    const passwordValidator = await bcrypt.compare(password,user.password)
    if(!passwordValidator){
        return res.status(422).json({
            message : 'Password is invalid!'
        });
    }

    const accessToken = jwt.sign({id : user._id }, process.env.JWT_SECRET ,{
        expiresIn: '30 days'
    })

    return res.status(200).json({
        message : 'You login successfully',
        accessToken
    });
}


module.exports = {register , getMe , login}