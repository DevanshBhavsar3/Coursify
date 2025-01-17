import { BrowserRouter, Routes, Route } from "react-router";

import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Courses from "./components/Courses";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/users/register" element={<Register />} />
          <Route path="/admin/register" element={<Register />} />
          <Route path="/users/login" element={<Login />} />
          <Route path="/admin/login" element={<Login />} />
          <Route path="/courses" element={<Courses />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
