import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { PrivateRoute, PublicRoute } from "./components/protectedRoutes";
import Admin from "./pages/admin";
import Welcome from "./pages/welcome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<PublicRoute comp={<Welcome />} redirect="admin" />}
        />
        <Route
          path="dashboard"
          element={
            <PrivateRoute
              comp={
                <h1>
                  Dash
                  <br />
                  <Link to="/admin">admin</Link>
                </h1>
              }
              redirect="/admin"
            />
          }
        />
        <Route
          path="admin"
          element={<PrivateRoute comp={<Admin />} redirect="/" />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
