
import mongoose,{Schema} from "mongoose"

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

export const User =mongoose.model("User",userSchema)