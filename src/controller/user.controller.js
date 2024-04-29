const Joi = require('joi')
const userModel = require('../models/user.model')
const {ObjectId} = require('mongodb')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require("jsonwebtoken")

const userOperation = {
   createUser: async function (req, res) {
     try {
        const userSchema = Joi.object({
            name:Joi.string().required(),
            email:Joi.string().required(),
            password:Joi.string().required()
        })
        const { error,value } = userSchema.validate(req.body,{abortEarly:false})
        if(error){
            return res.status(400).json({
                statusCode:400,
                error:error.details[0].message
           })
        }

        const findUser = await userModel.findOne({email:req.body.email}).lean()
            if(findUser !=null){
                res.status(409).json({
                    "statusCode":409,
                    msg:"User Already Exist"
                })
            }else{

        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(req.body.password, salt);
 

        const result = await userModel.create({
            name:req.body.name,
            email:req.body.email,
            password:hash

        })
        
          

        res.status(201).json({
            "statusCode":201,
            "msg":"created successfully",
            "data":result
        })
    }
     } catch (error) {
        res.status(500).json({ statusCode:500, error: error.message });
     }
   },


   loginUser: async function(req, res) {
      try {
        
        const {email, password} = req.body
        const findPasssword =await userModel.findOne({email:email})
         const result = await bcrypt.compareSync(password,findPasssword.password)
         if(!result) {
            return res.status(401).json({
                success:401,
                message:"UnAuthorized",
            })
         }

         const userDetails = await userModel.findOne({email:email})

         result.password = undefined;

          const jsontoken =await jwt.sign({result : userDetails}, process.env.JWT_SECRET,{expiresIn:"1h"})
           return res.json({
               success:200,
               message:"login successfully",
               token:jsontoken
           })
            
         
      
     } catch (error) {
        res.status(500).json({ statusCode:500, error: error.message });
      }
   }
}

module.exports = userOperation