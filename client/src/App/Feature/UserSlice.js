import { createSlice, nanoid } from "@reduxjs/toolkit"

const initialState = {
  currentUser: null,
  loading: false,
}

const UserSlice = createSlice({
  name: "User",
  initialState,
  reducers: {
    fetchStart: (state, action) => {
      state.loading = true
    },
    fetchFail: (state, action) => {
      state.loading = false
      localStorage.setItem(null)
    },
    fetchSuccess: (state, action) => {
      state.currentUser = action.payload
      localStorage.setItem("currentUser", JSON.stringify(action.payload))
      state.loading = false
    },
  },
})

export const { fetchFail, fetchStart, fetchSuccess } = UserSlice.actions

export default UserSlice.reducer
