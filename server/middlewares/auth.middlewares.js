import { User } from "../models/user.models.js"
import { errorHandlor } from "../utils/error.handolloer.js"
import jwt from "jsonwebtoken"

export const isAuthentication = async (req, res, next) => {
  try {
    const { token } = req.cookies
    if (!token) {
      return next(errorHandlor(400, "You Can login frist"))
    }
    const decode = jwt.verify(token, process.env.SECRET_KEY)

    const user = await User.findById(decode._id)
    if (!user) {
      return next(errorHandlor(400, "invalid cookie id"))
    }

    req.user = user
    next()
  } catch (error) {
    console.log(`Error While Authentication :${error}`)
  }
}
