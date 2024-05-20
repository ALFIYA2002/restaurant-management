const Joi = require("joi")


function createUserValidator(requestData){
  try{
    const schema = Joi.object().keys({
      name:Joi.string().required(),
      password:Joi.string().required(),
      email:Joi.string().required(),
      confirmPassword:Joi.string().required(),
      userType:Joi.string().required(),
  
      deleted:Joi.boolean(),
     
    })
  
  const {error,value} = schema.validate(requestData)
  if(error){
    return {error:error.details.map((x)=>x.message).join(",")}

  }
  else if (value){
return {value:value}
  }
  else{
    return {error:"something went wrong"}
  }}
  catch(exception){
console.log(exception);
  }
}



function loginUserValidator(loginData){
try{
  const schema = Joi.object().keys({
    password:Joi.string().required(),
    email:Joi.string().required(),
    userType:Joi.string().required(),
  })
  const {error,value} = schema.validate(loginData)
  if(error){
    return {error:error.details.map((x)=>x.message).join(",")}

  }
  else if (value){
return {value:value}
  }
  else{
    return {error:"somthing error "}
  }}
catch(exception){
  console.log(exception);
    }
  }
  module.exports ={
    createUserValidator,
     loginUserValidator

  }