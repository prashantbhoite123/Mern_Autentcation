import express from "express"
import {
  deleteUser,
  getProfile,
  logout,
  postLogin,
  postRegister,
  userUpdate,
} from "../controllers/user.controllers.js"
import { isAuthentication } from "../middlewares/auth.middlewares.js"
const router = express.Router()

router.post("/register", postRegister)
router.post("/login", postLogin)
router.get("/profile", isAuthentication, getProfile)
router.get("/logout", isAuthentication, logout)

router.put("/update/:id", isAuthentication, userUpdate)
router.delete("/delete/:id", isAuthentication, deleteUser)

export default router
