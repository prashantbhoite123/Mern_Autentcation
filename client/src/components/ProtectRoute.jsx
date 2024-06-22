import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { Navigate } from "react-router-dom"

const ProtectRoute = () => {
  const { currentUser } = useSelector((state) => state.user)
  return currentUser ? <Outlet /> : <Navigate to={"/sign-in"} />
}

export default ProtectRoute
