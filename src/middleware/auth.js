const jwt = require("jsonwebtoken")
const userModel = require("../models/user.model");
require('dotenv').config();

auth = async (req, res,next) => {
    

        try {


            let token = req.headers.authorization.split(" ")[1] ;
            if (!token) {
                return res.status(400).json({
                    success: false,
                    message: "unkown user"
                })
            }



            let deocodeToken = await jwt.verify(token, process.env.JWT_SECRET);
        


            if (!deocodeToken) {
                return res.status(400).json({
                    success: false,
                    message: "unkown user"
                })
            }

            let userFound = await userModel.findOne({ _id: deocodeToken.result._id }).lean();

            if (!userFound) {
                return response.status(400).json({
                    success: false,
                    message: "unkown user"
                })
            }

            req.userid = userFound._id


            

            next()

        } catch (error) {
            
            return res.status(400).json({
                success: false,
                message: "invalid user"
            })
        }
    
}

module.exports = auth