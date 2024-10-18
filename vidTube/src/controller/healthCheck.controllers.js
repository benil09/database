import { APIresponse } from "../utils/APIresponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const healthCheck = asyncHandler(async(req,res)=>{
    res.status(200)
    .json(new APIresponse(200,"OK","Health check Passed"));

}

)

export {healthCheck}