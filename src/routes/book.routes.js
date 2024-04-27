const router = require("express").Router()
const {createBook, getAllBook, updateBook, deleteBook} = require("../controller/book.controller")

router.post("/createBook",createBook)
router.get("/getAllBook", getAllBook)
router.put("/updateBook/:id",updateBook)
router.delete("/deleteBook/:id", deleteBook)

module.exports = router
