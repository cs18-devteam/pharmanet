const { getRequestData } = require("../../common/getRequestData");
const { response, responseJson } = require("../../common/response");
const view = require("../../common/view");
const Users = require("../../models/UserModel");

function getMinutesFromNow(sqlDateTime) {
  if (!sqlDateTime) return null;

  let dateMs;

  if (typeof sqlDateTime === "string") {
    // Convert SQL DATETIME string to JS Date
    // Handles "YYYY-MM-DD HH:MM:SS" or ISO strings
    let dateStr = sqlDateTime.includes('T') ? sqlDateTime : sqlDateTime.replace(' ', 'T');
    if (!dateStr.endsWith('Z')) dateStr += 'Z';
    dateMs = new Date(dateStr).getTime();
  } else if (sqlDateTime instanceof Date) {
    dateMs = sqlDateTime.getTime();
  } else if (typeof sqlDateTime === "number") {
    // Assume timestamp in ms
    dateMs = sqlDateTime;
  } else {
    throw new Error("Unsupported type for sqlDateTime");
  }

  const nowMs = Date.now();
  const diffMinutes = (nowMs - dateMs) / (1000 * 60);

  return diffMinutes;
}





exports.renderVerifyEmail = async (req , res)=>{
  try{
    if(!req.userId) throw new Error("can't find id of user");
    const [user] = await Users.getById(req.userId); 

    if(!user) throw new Error("User not found");


    return response(res , view('verify.email' , {
      ...user,
      header : view('component.header' , {
        name:"Verify Your Email",
      })
    }) , 200);
  }catch(e){
    console.log(e);
    return response(res , view('404') , 404);
  }
}

exports.verifyEmail = async (req , res) =>{
  try{

    const {otp} = JSON.parse(await getRequestData(req));
    if(!otp) throw new Error("otp not found");

    const [user] = await Users.getById(req.userId);
    if(!user) throw new Error("user not found");


    // console.log(getMinutesFromNow(user.emailOTPCreatedAt));
    // if(5 < getMinutesFromNow(user.emailOTPCreatedAt)) throw new Error("OTP not valid");

    if(otp == user.emailOTP){
      await Users.update({
        id: user.id,
        emailOTP : null,
        verified: true,
        // emailOTPInvalidAt : null,
      })

      return responseJson(res , 200 , {
        status:"success",
        message : "email address verified",
      })  
    }else{
      throw new Error("otp invalid");
    }

  }catch(e){
    console.log(e);
    return responseJson( res ,400 ,{
      status:"error",
      message : e.message,
    })
  }
}




exports.forgotPassword = async (req , res)=>{
  try{
      return response(res , view('forgotpassword.email' , {
        header : view('component.header' , {
          name:"Recovery Account",
        })
      }) , 200);
    }catch(e){
      console.log(e);
      return response(res , view('404') , 404);
    }
}