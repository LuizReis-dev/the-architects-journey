import { Route, Routes } from "react-router-dom"
import Login from "../pages/auth/login/Login"
import Signup from "../pages/auth/signup/Signup"
import NotFound from "../pages/notfound/NotFound"
import TempChat from "../pages/temp-chat/TempChat"

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/temp-chat" element={<TempChat />} />
      <Route path="/*" element={<NotFound />} />
    </Routes>
  )
}
