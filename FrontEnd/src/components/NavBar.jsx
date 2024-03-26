import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, Transition } from "@headlessui/react";
import { BellIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";
import LoginModal from "./login/LoginModal.jsx";
import RegisterModal from "./register/RegisterModal.jsx";

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
    <nav className="bg-lime-900 mb-4 rounded-md fixed left-8 right-8 sm:left-10 sm:right-10 md:left-12 md:right-12 lg:left-14 lg:right-14 xl:left-16 xl:right-16 z-50">
      <div className="mx-auto px-4">
        <div className="relative flex h-16 items-center justify-between">
          <img
            className="h-10 w-auto rounded-md"
            src="../src/assets/potHearts.png"
            alt="position"
          />

          <div className="w-full flex justify-end sm:justify-between">
            {isAuthenticated ? (
              <>
                <Link
                  to="/people"
                  className="text-3xl text-lime-500 font-bold mx-4 hidden sm:block"
                >
                  Cooking Date
                </Link>

                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="h-8 w-8 p-1 rounded-full bg-lime-700 text-lime-500 hover:text-lime-900 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <BellIcon aria-hidden="true" />
                  </button>

                  <Menu as="div">
                    <Menu.Button className="rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      {user.image ? (
                        <img
                          className="h-8 w-8 rounded-full"
                          src={user.image.url}
                          alt="userPhoto"
                        />
                      ) : (
                        <img
                          className="h-8 w-8 rounded-full"
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
                      <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-lime-800 p-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
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
                <Link to="/" className="text-3xl text-lime-500 font-bold mx-4">
                  Cooking Date
                </Link>

                <div className="flex space-x-4">
                  <Link
                    onClick={toggleModalLogin}
                    className="bg-lime-700 hover:bg-lime-600 text-lime-500 hover:text-lime-900 font-bold rounded-md px-3 py-2"
                  >
                    Login
                  </Link>

                  <Link
                    onClick={toggleModalRegister}
                    className="bg-lime-700 hover:bg-lime-600 text-lime-500 hover:text-lime-900 font-bold rounded-md px-3 py-2"
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
