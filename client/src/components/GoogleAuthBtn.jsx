import React from "react"
import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth"
import { app } from "../firebase"
import { fetchStart, fetchFail, fetchSuccess } from "../App/Feature/UserSlice"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const GoogleAuthBtn = () => {
  const { loading } = useSelector((state) => state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleClick = async () => {
    try {
      dispatch(fetchStart())
      const Provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, Provider)
      const user = result.user

      const res = await fetch("/api/user/google-auth", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: user.displayName,
          email: user.email,
          profilePic: user.photoURL,
        }),
      })
      const data = await res.json()
      if (data.success === false) {
        toast.error(data.message)
        dispatch(fetchFail())
        return
      }
      dispatch(fetchSuccess(data))
      toast.success(`welcome ${data.name}`)
      navigate("/")
    } catch (error) {
      dispatch(fetchFail())
      toast.error(error.message)
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={loading}
      className="flex w-full justify-center rounded-md bg-red-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-red-400 disabled:cursor-not-allowed"
    >
      {loading ? "LOADING..." : "continue with google"}
    </button>
  )
}

export default GoogleAuthBtn
