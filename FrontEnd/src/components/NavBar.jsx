import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";
import LoginModal from "./login/LoginModal.jsx";
import RegisterModal from "./register/RegisterModal.jsx";
import { VITE_FRONTEND_URL } from "../../config.js";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavBar = () => {
  const { logout, isAuthenticated, user } = useAuth();
  const [isOpenLogin, setIsOpenLogin] = useState(false);
  const [isOpenRegister, setIsOpenRegister] = useState(false);

  const toggleModalLogin = () => {
    setIsOpenLogin(!isOpenLogin);
  };

  const toggleModalRegister = () => {
    setIsOpenRegister(!isOpenRegister);
  };

  return (
    <nav className="bg-lime-900 mb-4 rounded-b-md fixed left-0 top-0 right-0 z-50">
      <div className="mx-auto px-4">
        <div className="relative p-2 md:p-3 lg:p-4 flex items-center justify-between">
          <img
            className="h-9 sm:h-10 lg:h-16 w-auto rounded-md"
            src={`${VITE_FRONTEND_URL === '' ? '../src/assets/potHearts.png' : VITE_FRONTEND_URL + '/src/assets/potHearts.png'}`}
            // src="../src/assets/potHearts.png"
            alt="position"
          />

          <div className="w-full flex justify-end sm:justify-between">
            {isAuthenticated ? (
              <>
                <Link
                  to="/people"
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-lime-500 font-bold mx-4 hidden sm:block"
                >
                  Cooking Date
                </Link>

                <div className="flex items-center justify-center space-x-2">
                  <button
                    type="button"
                    className="h-8 w-8 md:h-9 md:w-9 lg:h-11 lg:w-11 p-1 rounded-full bg-lime-700 text-lime-500 hover:text-lime-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <BellIcon aria-hidden="true" />
                  </button>

                  <Menu as="div" className="flex items-center justify-center">
                    <Menu.Button className="rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      {user.image ? (
                        <img
                          className="h-8 w-8 md:h-9 md:w-9 lg:h-11 lg:w-11 rounded-full"
                          src={user.image.url}
                          alt="userPhoto"
                        />
                      ) : (
                        <img
                          className="h-8 w-8 md:h-9 md:w-9 lg:h-11 lg:w-11 rounded-full"
                          src="../src/assets/noProfilePhoto.png"
                          alt="noProfilePhoto"
                        />
                      )}
                    </Menu.Button>

                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="absolute -right-4 top-11 sm:top-12 md:top-14 lg:top-20 z-10 mt-2 w-48 rounded-md bg-lime-800 p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <Menu.Item>
                          {({ active }) => (
                            <Link
                              to={`/profile/${user._id}`}
                              className={classNames(
                                active
                                  ? "bg-lime-400 text-lime-900 rounded-md"
                                  : "",
                                "block px-4 py-2 text-sm bg-lime-700 text-lime-500 rounded-md"
                              )}
                            >
                              Profile
                            </Link>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="/"
                              onClick={() => {
                                logout();
                              }}
                              className={classNames(
                                active
                                  ? "bg-lime-400 text-lime-900 rounded-md"
                                  : "",
                                "block px-4 py-2 mt-1 text-sm bg-lime-700 text-lime-500 rounded-md"
                              )}
                            >
                              Sign out
                            </a>
                          )}
                        </Menu.Item>
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/"
                  className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl text-lime-500 font-bold mx-4 hidden sm:block"
                >
                  Cooking Date
                </Link>

                <div className="flex space-x-4">
                  <Link
                    onClick={toggleModalLogin}
                    className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl bg-lime-700 hover:bg-lime-600 text-lime-500 hover:text-lime-900 font-bold rounded-md h-min px-3 py-2"
                  >
                    Login
                  </Link>

                  <Link
                    onClick={toggleModalRegister}
                    className="text-sm sm:text-md md:text-lg lg:text-xl xl:text-2xl bg-lime-700 hover:bg-lime-600 text-lime-500 hover:text-lime-900 font-bold rounded-md h-min px-3 py-2"
                  >
                    Register
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <LoginModal
        isOpen={isOpenLogin}
        toggleModalLogin={toggleModalLogin}
        toggleModalRegister={toggleModalRegister}
      />

      <RegisterModal
        isOpen={isOpenRegister}
        toggleModalLogin={toggleModalLogin}
        toggleModalRegister={toggleModalRegister}
      />
    </nav>
  );
};

export default NavBar;
