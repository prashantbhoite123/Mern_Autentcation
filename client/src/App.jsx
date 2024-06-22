import React from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Header from "./components/Header"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import { Toaster } from "react-hot-toast"
import Home from "./pages/Home"
import Profile from "./pages/Profile"
import ProtectRoute from "./components/ProtectRoute"

function App() {
  return (
    <Router>
      <Toaster />
      <Header />
      <Routes>
        <Route element={<ProtectRoute />}>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Router>
  )
}

export default App
