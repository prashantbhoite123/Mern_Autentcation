import React from "react"
import { useSelector, useDispatch } from "react-redux"
import { toast } from "react-hot-toast"
import { logoutUser } from "../App/Feature/UserSlice"

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleLogout = async () => {
    try {
      const res = await fetch("/api/user/logout")
      const data = await res.json()

      if (data.success === false) {
        toast.error(data.message)
        throw new Error(data.message)
      }
      dispatch(logoutUser())
      window.location.reload()
    } catch (error) {
      toast.error(error.message)
    }
  }

  const handleDelete = async () => {
    try {
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      })
      const data = await res.json()
      if (data.success === false) {
        toast.error(data.message)
        throw new Error(data.message)
      }
      dispatch(logoutUser())
      window.location.reload()
    } catch (error) {
      toast.error(data.message)
    }
  }

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-20 border-4 rounded-full w-auto"
          src={currentUser.profilePic}
          alt="Your Company"
          title="logo"
        />
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6">
          <div>
            <div className="mt-2">
              <input
                name="email"
                readOnly
                type="text"
                defaultValue={currentUser.name}
                className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="mt-2">
              <input
                name="text"
                readOnly
                type="email"
                defaultValue={currentUser.email}
                className="block w-full rounded-md border-0 py-2 px-2 text-gray-900 shadow-sm ring-1 ring-inset  placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-indigo-400 disabled:cursor-not-allowed"
            >
              update profile
            </button>
          </div>
          <hr />
        </form>

        <div className="flex justify-between">
          <button
            onClick={handleDelete}
            className="text-red-600 font-bold"
            type="button"
          >
            Delete Profile
          </button>
          <button
            onClick={handleLogout}
            className="text-blue-700 font-bold"
            type="submit"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
