import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./components/protectedRoutes";
import Pages from "./pages";
import Admin from "./pages/admin";
import Welcome from "./pages/welcome";
import { getUser } from "./redux/auth"
import {getRole} from "./redux/role"

function App() {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(getUser())
    dispatch(getRole())
  }, [])

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/welcome"
          element={<PublicRoute comp={<Welcome />} redirect="/" />}
        />
        <Route
          path="/admin"
          element={<PrivateRoute comp={<Admin />} redirect="/welcome" />}
        />
        <Route
          path="/*"
          element={<PrivateRoute comp={<Pages />} redirect="/welcome" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
