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
          <div className="bg-lime-600 p-8 sm:p-10 md:p-12 lg:p-14 xl:p-16 min-h-screen flex">
            <NavBar />
            <div className="bg-orange-900 p-4 md:p-6 xl:p-8 mt-20 rounded-md w-full">
              <div className="bg-orange-400 p-4 md:p-6 xl:p-8 h-full rounded-md flex flex-col items-center justify-center text-center">
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
