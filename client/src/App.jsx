import { BrowserRouter, Routes, Route } from "react-router";

import Home from "./pages/Home";
import Register from "./components/Register";
import Login from "./components/Login";
import Courses from "./pages/Courses";
import Purchases from "./pages/Purchases";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/users">
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="courses" element={<Courses />} />
            <Route path="purchasedCourses" element={<Purchases />} />
          </Route>

          <Route path="/admin">
            <Route path="register" element={<Register />} />
            <Route path="login" element={<Login />} />
            <Route path="courses" element={<Courses />} />
          </Route>

          <Route path="/logout" element={<Logout />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
