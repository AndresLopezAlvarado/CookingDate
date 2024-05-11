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
import ChatProvider from "./contexts/ChatContext.jsx";
import Chat from "./pages/Chat.jsx";
import Chats from "./pages/Chats.jsx";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProfileProvider>
          <PeopleProvider>
            <ChatProvider>
              <MiscellanyProvider>
                <div className="bg-white text-black min-h-screen w-screen p-4 flex flex-col">
                  <ToggleProvider>
                    <NotificationsProvider>
                      <NavBar />
                      <Routes>
                        <Route path="/" element={<Home />} />
                        <Route element={<ProtectedRoutes />}>
                          <Route path="/profile/:id" element={<Profile />} />
                          <Route path="/people" element={<People />} />
                          <Route
                            path="/people/:id"
                            element={<PeopleProfile />}
                          />
                          <Route path="/chat/:id" element={<Chat />} />
                          <Route path="/chats" element={<Chats />} />
                        </Route>
                      </Routes>
                      <Footer />
                    </NotificationsProvider>
                  </ToggleProvider>
                </div>
              </MiscellanyProvider>
            </ChatProvider>
          </PeopleProvider>
        </ProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
