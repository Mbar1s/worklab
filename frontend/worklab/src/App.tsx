import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

//pages and components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SingleProject from "./pages/SingleProject";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  const { user } = useAuthContext();
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route
              path="/"
              element={user ? <Home /> : <Navigate to="/login" />}
            />
            <Route path="/SingleProject/:id" element={<SingleProject />} />
            <Route
              path="/signup"
              element={!user?.email ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user?.email ? <Login /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
