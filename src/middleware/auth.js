const jwt = require("jsonwebtoken");
const user = require("../models/user.model");
const userModel = require("../models/user.model");
require('dotenv').config();

exports.auth = async (req, res,next) => {
    

        try {


            let token = (req.headers.authorization.split(" ").[1] );

            if (!token) {
                return response.status(400).json({
                    success: false,
                    message: "unkown user"
                })
            }



            let deocodeToken = await jwt.verify(token, process.env.JWT_SECRET);
        


            if (!deocodeToken) {
                return response.status(400).json({
                    success: false,
                    message: "unkown user"
                })
            }

            let userFound = await userModel.findOne({ _id: deocodeToken._id }).lean();

            if (!userFound) {
                return response.status(400).json({
                    success: false,
                    message: "unkown user"
                })
            }

            req.userid = userFound._id


            

            next()

        } catch (error) {
            
            return response.status(400).json({
                success: false,
                message: "invalid user"
            })
        }
    
}