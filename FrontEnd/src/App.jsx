import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { ProfileProvider } from "./contexts/ProfileContext.jsx";
import { ProtectedRoutes } from "./ProtectedRoutes.jsx";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import People from "./pages/People.jsx";
import DateProfile from "./pages/DateProfile.jsx";

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <BrowserRouter>
          <div className="bg-lime-400 min-h-screen p-4 flex flex-col">
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
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
