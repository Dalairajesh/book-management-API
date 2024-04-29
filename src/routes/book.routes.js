const router = require("express").Router()
const auth = require("../middleware/auth")
const {createBook, getAllBook, updateBook, deleteBook} = require("../controller/book.controller")

router.post("/createBook",auth,createBook)
router.get("/getAllBook", auth,getAllBook)
router.put("/updateBook/:id",auth,updateBook)
router.delete("/deleteBook/:id",auth, deleteBook)

module.exports = router
