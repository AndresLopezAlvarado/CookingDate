import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { MiscellanyProvider } from "./contexts/MiscellanyContext.jsx";
import { ProfileProvider } from "./contexts/ProfileContext.jsx";
import { PeopleProvider } from "./contexts/PeopleContext.jsx";
import { ToggleProvider } from "./contexts/ToggleContext.jsx";
import { ProtectedRoutes } from "./ProtectedRoutes.jsx";
import NavBarPrueba from "./components/NavBarPrueba.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import People from "./pages/People.jsx";
import PeopleProfile from "./pages/PeopleProfile.jsx";

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <PeopleProvider>
          <MiscellanyProvider>
            <BrowserRouter>
              <div className="bg-lime-400 min-h-screen p-4 flex flex-col">
                <ToggleProvider>
                  <NavBarPrueba />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route element={<ProtectedRoutes />}>
                      <Route path="/profile/:id" element={<Profile />} />
                      <Route path="/people" element={<People />} />
                      <Route path="/people/:id" element={<PeopleProfile />} />
                    </Route>
                  </Routes>
                </ToggleProvider>
              </div>
            </BrowserRouter>
          </MiscellanyProvider>
        </PeopleProvider>
      </ProfileProvider>
    </AuthProvider>
  );
}

export default App;
