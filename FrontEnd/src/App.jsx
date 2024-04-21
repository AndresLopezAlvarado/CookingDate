import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { MiscellanyProvider } from "./contexts/MiscellanyContext.jsx";
import { ProfileProvider } from "./contexts/ProfileContext.jsx";
import { PeopleProvider } from "./contexts/PeopleContext.jsx";
import { ToggleProvider } from "./contexts/ToggleContext.jsx";
import { NotificationsProvider } from "./contexts/NotificationsContext.jsx";
import { ProtectedRoutes } from "./ProtectedRoutes.jsx";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import People from "./pages/People.jsx";
import PeopleProfile from "./pages/PeopleProfile.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <AuthProvider>
      <ProfileProvider>
        <PeopleProvider>
          <MiscellanyProvider>
            <BrowserRouter>
              <div className="bg-white text-black min-h-screen w-screen p-4 flex flex-col">
                <ToggleProvider>
                  <NotificationsProvider>
                    <NavBar />
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route element={<ProtectedRoutes />}>
                        <Route path="/profile/:id" element={<Profile />} />
                        <Route path="/people" element={<People />} />
                        <Route path="/people/:id" element={<PeopleProfile />} />
                      </Route>
                    </Routes>
                    <Footer />
                  </NotificationsProvider>
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
