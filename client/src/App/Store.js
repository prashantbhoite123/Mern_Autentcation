import { configureStore } from "@reduxjs/toolkit"
import UserReduser from "./Feature/UserSlice"
export const store = configureStore({
  reducer: {
    user: UserReduser,
  },
})
