import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ProtectedRoutes } from "./ProtectedRoutes.jsx";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import People from "./pages/People.jsx";
import DateProfile from "./pages/DateProfile.jsx";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="bg-[#f5f5f5] min-h-screen flex flex-col">
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route element={<ProtectedRoutes />}>
              <Route path="/profile/:id" element={<Profile />} />
              <Route path="/people" element={<People />} />
              <Route path="/people/:id" element={<DateProfile />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
