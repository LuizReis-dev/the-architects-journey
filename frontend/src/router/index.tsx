import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/login/Login";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
    </Routes>
  );
}
