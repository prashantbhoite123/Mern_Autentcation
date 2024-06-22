import { User } from "../models/user.models.js"
import { errorHandlor } from "../utils/error.handolloer.js"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

export const postRegister = async (req, res, next) => {
  try {
    const { name, email, password } = req.body
    const user = await User.findOne({ email })
    if (user) {
      return next(errorHandlor(400, "User allready existed"))
    }

    const hasspassword = bcryptjs.hashSync(password, 10)

    await User.create({ name, email, password: hasspassword })
    res
      .status(200)
      .json({ success: true, message: "User Registere Successfully" })
  } catch (error) {
    console.log(`Error While Register User :${error}`)
  }
}

export const postLogin = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const validuser = await User.findOne({ email })
    if (!validuser) {
      return next(errorHandlor(400, "You can register Frist "))
    }
    const ismatchPassword = bcryptjs.compareSync(password, validuser.password)
    if (!ismatchPassword) {
      return next(errorHandlor(400, "Invalid email or password"))
    }

    const token = jwt.sign({ _id: validuser._id }, process.env.SECRET_KEY)

    const { password: abc, ...userdata } = validuser._doc

    res
      .cookie("token", token, {
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
        secure: true,
        sameSite: "None",
      })
      .status(200)
      .json(userdata)
  } catch (error) {
    console.log(`Error While Login user :${error}`)
  }
}

export const getProfile = (req, res) => {
  const { user } = req
  const { password, ...rest } = user._doc
  res.status(200).json(rest)
}

export const logout = (req, res, next) => {
  try {
    res
      .clearCookie("token")
      .status(200)
      .json({ success: true, message: "user logout successfully" })
  } catch (error) {
    next(error.message)
  }
}

export const userUpdate = async (req, res, next) => {
  if (req.params.id !== req.user.id) {
    return next(errorHandlor(400, "You can update only your Account"))
  }
  console.log(req.params.id)
  console.log(req.user._id)
  try {
    if (req.body.email) {
      const existedUser = await User.findOne({ email: req.body.email })

      if (existedUser) {
        return next(errorHandlor(400, "User already existed"))
      }
    }

    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10)
    }
    const { id } = req.params
    const newUpdated = await User.findByIdAndUpdate(
      id,
      {
        $set: {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password,
        },
      },
      { new: true }
    )
    const { password, ...rest } = newUpdated._doc
    res.status(200).json({
      success: true,
      message: "User Updated Successfully",
      rest,
    })
  } catch (error) {
    console.log(`Error While updateUser :${error}`)
  }
}

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params
    if (!id) {
      return next(errorHandlor(400, "you can delete only your Account"))
    }
    await User.findByIdAndDelete(id)
    res
      .clearCookie("token")
      .status(200)
      .json({ success: true, message: "User Deleted Successfully" })
  } catch (error) {
    console.log(`Error While Delete User :${error}`)
  }
}
