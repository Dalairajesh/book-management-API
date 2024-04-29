const Joi = require('joi')
const bookModel = require('../models/book.models')
const {ObjectId} = require('mongodb')


const bookOperation = {

     createBook: async function(req, res) {
        try {

            const bookSchema = Joi.object({
                title:Joi.string().required(),
                author:Joi.string().required(),
                publicationYear:Joi.number().required()
            })
            const { error,value } = bookSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    statusCode:400,
                    error:error.details[0].message
               })
            }
            const findBook = await bookModel.findOne({title:req.body.title}).lean()
            if(findBook !=null){
                res.status(409).json({
                    "statusCode":409,
                    msg:"Already Exist"
                })
            }else{

            const result = await bookModel.create({
                title:req.body.title,
                author:req.body.author,
                publicationYear:req.body.publicationYear

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

     getAllBook: async function(req, res){
        try {
            let {limit , skip,author, publicationYear} = req.query;
            limit = +limit ||10;
            skip = +skip ?? 0;
    
          let findQuery = {}

          if(publicationYear) {
            findQuery.publicationYear = publicationYear
          }

          if(author) {
            findQuery.author = {$regex:author,$options:"i"}
          }
            
            const result = await bookModel.find(findQuery).limit(limit).skip(skip).lean();
            const count = await bookModel.countDocuments(findQuery);
            const page = parseInt(req.query.skip) || 1;
            res.status(200).json({
                "data":result,
                "page":page,
                "limit":limit,
                "totalPages": Math.ceil(count / limit),
                "totalResults": count,
                "statusCode":200,
                
            })
          } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
          }
     },

     updateBook: async function(req, res) {
        try {
            const bookSchema = Joi.object({
                title:Joi.string().required(),
                author:Joi.string().required(),
                publicationYear:Joi.number().required()
            })
            const { error,value } = bookSchema.validate(req.body,{abortEarly:false})
            if(error){
                return res.status(400).json({
                    statusCode:400,
                    error:error.details[0].message
               })
            }

            const findBook = await bookModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findBook ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await bookModel.findByIdAndUpdate({_id:new ObjectId(req.params.id)},{
                title:req.body.title,
                author:req.body.author,
                publicationYear:req.body.publicationYear
                },{new:true})
                res.status(201).json({
                    "statusCode":201,
                    "msg":"updated successfully",
                    "data":result
                })
            }
        } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
        }
     },

     filterByBook: async function(req, res) {
            try {
                const {author, publicationYear} = req.query

            } catch (error) {
                res.status(500).json({ statusCode:500, error: error.message });
            }
     },

     deleteBook: async function(req, res) {
        try {
            const findBook = await bookModel.findById({_id:new ObjectId(req.params.id)}).lean()
            
            if(findBook ==null){
                res.status(404).json({
                    "statusCode":404,
                    msg:"Not Found"
                })
            }else{
               const result = await bookModel.deleteOne({_id:new ObjectId(req.params.id)})
                res.status(201).json({
                    "statusCode":201,
                    "msg":"Delete successfully",
                    "data":result
                })
            }
        } catch (error) {
            res.status(500).json({ statusCode:500, error: error.message });
        }
     }



}


module.exports = bookOperation
