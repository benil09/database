
import mongoose,{Schema} from "mongoose"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema=new Schema(
    {
        username : {
            type : String,
            required : true,
            unique : true,
            lowercase:true,
            trim:true,
            index:true,

        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true,

        },
        fullName:{
            type:String,
            required:true,
            trim:true,
            index:true
        },
        avatar:{
            type:String, //clurdnary URL
            default:"https://res.cloudinary.com/dqzjxgj6l/image/uploadv1643721119/avatar",
            required:true,   
        },
        CoverImage:{
            type:String, //clurdnary URL
        },
        watchHistory:[
            {
                type:Schema.Types.ObjectId,
                ref:"Video"
            }
        ],
        Password:{
            type: String,
            required:[true,"this is a required field"]
        },
        refreshToken:{
            type:String,
        }
    },
    {timestamps:true}
)


userSchema.pre("save",async function (next){
    if(!this.modified("password")) return next()
    this.password=bcrypt.hash(this.password,10)


  
})



userSchema.methods.isPasswordCorrect = async function (password){
    await   bcrypt.compare(password,this.password)
}

userSchema.methods.generateAccessToken = function(){
    // short lived access token
    jwt.sign({
       _id: this._id,
       email:this.email,
       username:this.username,
       username:this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {expiresIn:process.env.ACCESS_TOKEN_EXPIRY}
)
}
userSchema.methods.isPasswordCorrect = async function (password){
    await   bcrypt.compare(password,this.password)
}

userSchema.methods.generateRefreshToken = function(){
    // short lived access token
    jwt.sign({
       _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {expiresIn:process.env.REFRESH_TOKEN_EXPIRY}
)
}


export const User =mongoose.model("User",userSchema)