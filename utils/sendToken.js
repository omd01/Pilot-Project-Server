const sendToken =(res,formData,statusCode,message) =>{

    const token = formData.getJWTToken();

    const options ={
        httpOnly : true,
        expires : new Date(Date.now()+ process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000), 
    }

    const formDataSend = {
        _id : formData._id,
        name : formData.name,
        email : formData.email,
        phone : formData.phone,
        domains : formData.domains,
        country : formData.country,
        state : formData.state,
        city : formData.city,
        isAdmin: formData.isAdmin
        
    }

   return res
    .status(statusCode)
    .cookie("token",token,options)
    .json({success:true,message,formData:formDataSend})
;
}

module.exports = sendToken;