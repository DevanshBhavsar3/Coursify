import { BrowserRouter, Routes, Route } from "react-router";

import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Courses from "./pages/Courses";
import Purchases from "./pages/Purchases";

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
          <Route path="/users/courses" element={<Courses />} />
          <Route path="/admin/courses" element={<Courses />} />
          <Route path="/users/purchasedCourses" element={<Purchases />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
