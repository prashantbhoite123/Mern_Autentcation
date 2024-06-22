import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
  currentUser: sessionStorage.getItem("currentUser")
    ? JSON.parse(sessionStorage.getItem("currentUser"))
    : null,
  loading: false,
}

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    fetchStart: (state) => {
      state.loading = true
    },
    fetchFail: (state) => {
      state.loading = false
      sessionStorage.setItem(null)
    },
    fetchSuccess: (state, action) => {
      state.currentUser = action.payload
      sessionStorage.setItem("currentUser", JSON.stringify(action.payload))
      state.loading = false
    },
  },
})

export const { fetchFail, fetchStart, fetchSuccess } = UserSlice.actions

export default UserSlice.reducer
