import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext.jsx";
import { PetsProvider } from "./contexts/PetsContext.jsx";
import { ProtectedRoutes } from "./ProtectedRoutes.jsx";
import NavBar from "./components/NavBar.jsx";
import Home from "./pages/Home.jsx";
import Profile from "./pages/Profile.jsx";
import DateProfile from "./pages/DateProfile.jsx";
import Pets from "./pages/Pets.jsx";
import FindPet from "./pages/FindPet.jsx";
import People from "./pages/People.jsx";

function App() {
  return (
    <AuthProvider>
      <PetsProvider>
        <BrowserRouter>
          <div className="bg-lime-600 container mx-auto p-8 rounded-md">
            <NavBar />
            <div className="bg-orange-900 p-4 mt-20 rounded-md">
              <div className="bg-orange-400 p-4 rounded-md flex flex-col items-center justify-center text-center">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route element={<ProtectedRoutes />}>
                    <Route path="/profile/:id" element={<Profile />} />
                    <Route path="/people" element={<People />} />
                    <Route path="/people/:id" element={<DateProfile />} />
                    <Route path="/findPet/:id" element={<FindPet />} />
                  </Route>
                </Routes>
              </div>
            </div>
          </div>
        </BrowserRouter>
      </PetsProvider>
    </AuthProvider>
  );
}

export default App;
