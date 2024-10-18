import mongoose,{Schema} from "mongoose"
import mongooseAgreegatePaginate from "mongoose-agreegate-paginate-v2"


const videoSchema = new Schema({
    videoFile:{
        type:String, //cloudnary url
        required:true,


    },
    thumbnail:{
        type:String, //cloudnary url
        required:true,

    },
    title:{
        type:String,
        required:true,

    },
    description:{
        type:String,
        required:true

    },
    duration:{
        type:Nimber,
        required:true

    },
    views:{
        type:Nimber,
        default:0

    },
    isPublished:{
        type:boolean,
        default:true,

    },
    owner:{
        type:Schema.Types.ObjectId,
        ref:"User"

    }

},{timestamps:true})

videoSchema.plugin(mongooseAgreegatePaginate)


export const Video = mongoose.model("video",videoSchema)