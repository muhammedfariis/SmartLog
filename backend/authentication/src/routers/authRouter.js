import express from "express"
import authComposer from "../composers/composer.js"

const auth = authComposer()
const router = express.Router()

router.post("/register" , auth.register)
router.post("/login" , auth.login)
router.get("/users" , auth.getAllUsers)
router.get("/admin" , auth.adminExists)

export default router