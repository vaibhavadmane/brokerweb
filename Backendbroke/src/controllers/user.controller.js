import  {asyncHandler}  from "../utils/asynchandler.js";
import {ApiError}  from "../utils/apiError.js"
import {User} from "../model/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

// import bcrypt from 'bcryptjs';

import jwt from "jsonwebtoken"
// import mongoose from "mongoose";

const generateAccessAndRefereshTokens = async(userId) =>{
      try {
          const user = await User.findById(userId)
          const accessToken = user.generateAccessToken()
          const refreshToken = user.generateRefreshToken()
  
          user.refreshToken = refreshToken
          await user.save({ validateBeforeSave: false })
  
          return {accessToken, refreshToken}
  
  
      } catch (error) {
          throw new ApiError(500, "Something went wrong while generating referesh and access token")
      }
  }


const registerUser=asyncHandler( async (req,res)=>{
         // get details from frontend 
        // validation - not empty
       // check account allready exist check via email
      // check for avatar
     //upload them to cloudinary,avatar
    //create user object-create entry in database
   //remove password and refresh token field from response 
  //check user creation 
 //return res 


const {username,email,fullname,password}=req.body



if(
[username,email,fullname,password].some((field)=>field?.trim()==="")  //it is like a map function (some)
){
    throw new ApiError(400,"All fields are required")
}
//some validation required like @gmail.com is present or not 


 const existedUser=await User.findOne({
      $or:[{username},{email}]   //check already use exist or not 
 })    

 if(existedUser){
      throw new ApiError(409,"user and email is already exist")
 }

const avatarLocalPath=req.files?.avatar[0]?.path;

 
if(!avatarLocalPath){
      throw new ApiError(400,"avatarpath file is required")
}
console.log(avatarLocalPath);

const avatar=await uploadOnCloudinary(avatarLocalPath)

if(!avatar){
      throw new ApiError(400,"avatar file is required")
}



const user= await User.create({
      username,
      email,
      fullname,
      avatar:avatar.url,
      password
})
const createdUser=await User.findById(user.id).select("-password")

if (!createdUser) {
      throw new ApiError(500,"something went wrong while registring the user")
}

return res.status(201).json(
      new ApiResponse(200,createdUser,"User register sucessfully")
)

})

//user log in start
const loginUser=asyncHandler(async(req,res)=>{
    //req.body -->data
    //email or username based 
    //find user
    //pass check
    const {email,username,password}=req.body
    if(!email){
      throw new ApiError(400,"email is required");
    }
   const user= await User.findOne({
      $or:[{email},{username}]
    })
    if(!user){
      throw new ApiError(404,"user does not exist")
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if(!isPasswordValid){
      throw new ApiError(401,"invalid user credential");
    }

    // const {accessToken, refreshToken} = await generateAccessAndRefereshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }


    return res.status(200)
    // .cookie("accessToken", accessToken, options)
    // .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
          200, 
          {
              user: loggedInUser,
            
          },
          "User logged In Successfully"
      )
  )
})

//user log out
const logOutUser=asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
      req.user._id,
      {
            $set:{
                  refreshToken:undefined
            }
      },
      {
            new:true
      }
)
const options = {
      httpOnly: true,
      secure: true
  }

  return res
  .status(200)
  .clearCookie("accessToken",options)
  .clearCookie("refreshToken",options)
  .json(new ApiResponse(200,{},"user loged out"))

})

const refreshAccessToken=asyncHandler(async (req,res)=>{
     const incomingRefreshToken= req.cookies.refreshToken || req.body.refreshToken
     if (!incomingRefreshToken) {
       throw new ApiError(401,"unothorised request")
     }   

  try {
       const decordedToken=  jwt.verify(
          incomingRefreshToken,process.env.REFRESH_TOKEN_SECRET
         )
    
       const user=await  User.findById(decordedToken?._id)
       if (user) {
          throw new ApiError(401,"invalid refreshtoken")
        }
        if (incomingRefreshToken!=user?.refreshToken) {
          throw new ApiError(401," refreshtoken is expired or use")
        }
    
        const option={
          httpOnly:true,
          secure:true
        }
       const {accessToken,newrefreshToken}= await generateAccessAndRefereshTokens(user.id)
        return res.status(200).cookie("accessToken",accessToken,option).cookie("refreshToken",newrefreshToken,option)
        .json(
          ApiResponse(
                200,
                {accessToken,newrefreshToken},
                "access token refresh token success"
          )
        )
  } catch (error) {
      throw new ApiError(401,error?.message || "invalide accesstokens")
  }
})




export {registerUser,loginUser,logOutUser ,refreshAccessToken}