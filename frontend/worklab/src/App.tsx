import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages and components
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import SingleProject from "./pages/SingleProject";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/SingleProject/:id" element={<SingleProject />} />
          </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
