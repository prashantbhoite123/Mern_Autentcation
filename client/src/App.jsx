import React from "react"
import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import Header from "./components/Header"
import SignUp from "./pages/SignUp"
import SignIn from "./pages/SignIn"
import { Toaster } from "react-hot-toast"

function App() {
  return (
    <Router>
      <Toaster />
      <Header />
      <Routes>
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/sign-in" element={<SignIn />} />
      </Routes>
    </Router>
  )
}

export default App
