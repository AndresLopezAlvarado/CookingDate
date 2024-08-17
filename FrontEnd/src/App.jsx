import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ProfileProvider } from "./contexts/ProfileContext";
import { PeopleProvider } from "./contexts/PeopleContext";
import { ChatProvider } from "./contexts/ChatContext";
import { MiscellanyProvider } from "./contexts/MiscellanyContext";
import { ToggleProvider } from "./contexts/ToggleContext";
import { NotificationsProvider } from "./contexts/NotificationsContext";
import { ProtectedRoutes } from "./ProtectedRoutes";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import People from "./pages/People";
import Person from "./pages/Person";
import Footer from "./components/Footer";
import Chat from "./pages/Chat";
import Chats from "./pages/Chats";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ProfileProvider>
          <PeopleProvider>
            <ChatProvider>
              <MiscellanyProvider>
                <ToggleProvider>
                  <NotificationsProvider>
                    <ChakraProvider>
                      <div className="bg-white text-black min-h-screen w-screen p-4 flex flex-col">
                        <div className="bg-sky-500 flex-1 flex flex-col">
                          <NavBar />
                          <Routes>
                            <Route element={<Home />} path="/" />
                            <Route element={<ProtectedRoutes />}>
                              <Route
                                element={<Profile />}
                                path="/profile/:id"
                              />
                              <Route element={<People />} path="/people" />
                              <Route element={<Person />} path="/people/:id" />
                              <Route element={<Chat />} path="/chat/:id" />
                              <Route element={<Chats />} path="/chats" />
                            </Route>
                          </Routes>
                        </div>

                        <div>
                          <Footer />
                        </div>
                      </div>
                    </ChakraProvider>
                  </NotificationsProvider>
                </ToggleProvider>
              </MiscellanyProvider>
            </ChatProvider>
          </PeopleProvider>
        </ProfileProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
