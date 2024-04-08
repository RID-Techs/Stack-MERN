const express = require('express')
const auth = require('../Middleware/auth')
const router = express.Router()
const { PostUsers, GetUsers, GetSpecifiUser, ModifyUser, DeleteUser } = require('../Controllers/userController')

router.post("/", auth, PostUsers)
router.get("/users", auth, GetUsers)
router.get("/users/:id", auth, GetSpecifiUser)
router.put("/users/:id", auth, ModifyUser)
router.delete("/users/:id", auth, DeleteUser)

module.exports = router;