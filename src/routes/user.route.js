const router = require("express").Router()
const {createUser, loginUser} = require("../controller/user.controller")

router.post("/createUser",createUser)
router.post("/loginUser", loginUser)


module.exports = router
