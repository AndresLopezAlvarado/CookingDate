import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";
import { useToggle } from "../contexts/ToggleContext";
import LoginModal from "./login/LoginModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavBarPrueba = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { isOpen, toggleModal } = useToggle();

  const [navigation, setNavigation] = useState([
    { name: "Products", href: "#", current: false },
    { name: "Information", href: "#", current: false },
    { name: "Security", href: "#", current: false },
    { name: "Help", href: "#", current: false },
    { name: "Download", href: "#", current: false },
    { name: "Language", href: "#", current: false },
    { name: "Sign in", href: "#", current: false },
  ]);

  const [navIsAuthenticated, setNavIsAuthenticated] = useState([
    { name: "People", href: "/people", current: false },
    { name: "Profile", href: "/profile", current: false },
    { name: "Configuration", href: "#", current: false },
    { name: "Logout", href: "/", current: false },
  ]);

  const changeCurrent = (itemName) => {
    const updatedNavigation = navigation.map((item) => {
      if (item.name === itemName) return { ...item, current: true };
      else return { ...item, current: false };
    });

    const updatedNavIsAuthenticated = navIsAuthenticated.map((item) => {
      if (item.name === itemName) return { ...item, current: true };
      else return { ...item, current: false };
    });

    setNavigation(updatedNavigation);
    setNavIsAuthenticated(updatedNavIsAuthenticated);
  };

  return (
    <>
      <Disclosure
        as="nav"
        className="bg-lime-900 fixed left-0 top-0 right-0 z-50 rounded-bl-md rounded-br-md"
      >
        {({ open }) => (
          <>
            {isAuthenticated ? (
              <>
                <div className="mx-auto max-w-7xl px-6">
                  <div className="relative flex h-16 items-center justify-between">
                    {/* Mobile menu button*/}
                    <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                      <Disclosure.Button className="relative bg-lime-700 hover:bg-lime-500 text-lime-300 hover:text-lime-900 p-2 rounded-md  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-white">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>

                    <div className="flex flex-1 items-start justify-center gap-x-8">
                      <div className="flex flex-shrink-0 items-center gap-2">
                        <Link to="/" onClick={changeCurrent}>
                          <img
                            className="h-8 w-auto"
                            src="/potHearts.png"
                            alt="logoApp"
                          />
                        </Link>

                        <h1 className="text-lime-300 text-3xl font-bold md:hidden">
                          Cooking Date
                        </h1>
                      </div>

                      <div className="hidden md:block">
                        <div className="flex space-x-2">
                          {navIsAuthenticated.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-lime-950 hover:bg-lime-500 text-lime-300 hover:text-lime-900"
                                  : "bg-lime-700 hover:bg-lime-500 text-lime-300 hover:text-lime-900",
                                "font-bold p-2 rounded-md"
                              )}
                              aria-current={item.current ? "page" : undefined}
                              onClick={(t) => {
                                changeCurrent(item.name);
                                // toggleModal(t);
                              }}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center">
                      <button
                        type="button"
                        className="relative bg-lime-700 text-lime-300 hover:bg-lime-500 hover:text-lime-900 p-2 rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2"
                      >
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">View notifications</span>
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      {user ? (
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                              <span className="absolute -inset-1.5" />
                              <span className="sr-only">Open user menu</span>
                              <img
                                className="h-8 w-8 rounded-full"
                                src={
                                  user.profilePicture
                                    ? user.profilePicture.url
                                    : "/noProfilePhoto.png"
                                }
                                alt="profilePicture"
                              />
                            </Menu.Button>
                          </div>

                          <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                          >
                            <Menu.Items className="absolute bg-lime-800 right-0 z-10 w-48 space-y-1 mt-2 p-1 rounded-md">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to={`/profile/${user._id}`}
                                    className={classNames(
                                      active ? "bg-lime-500 text-lime-900" : "",
                                      "block font-bold px-4 p-2 rounded-md bg-lime-700 text-lime-300"
                                    )}
                                  >
                                    Profile
                                  </Link>
                                )}
                              </Menu.Item>

                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="#"
                                    className={classNames(
                                      active ? "bg-lime-500 text-lime-900" : "",
                                      "block font-bold px-4 p-2 rounded-md bg-lime-700 text-lime-300"
                                    )}
                                  >
                                    Settings
                                  </a>
                                )}
                              </Menu.Item>

                              <Menu.Item>
                                {({ active }) => (
                                  <a
                                    href="/"
                                    onClick={logout}
                                    className={classNames(
                                      active ? "bg-lime-500 text-lime-900" : "",
                                      "block font-bold px-4 p-2 rounded-md bg-lime-700 text-lime-300"
                                    )}
                                  >
                                    Sign out
                                  </a>
                                )}
                              </Menu.Item>
                            </Menu.Items>
                          </Transition>
                        </Menu>
                      ) : null}
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-gray-900 text-white"
                            : "text-gray-300 hover:bg-gray-700 hover:text-white",
                          "block rounded-md px-3 py-2 text-base font-medium"
                        )}
                        aria-current={item.current ? "page" : undefined}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            ) : (
              <>
                <div className="mx-auto max-w-7xl px-6">
                  <div className="relative flex h-16 items-center justify-between">
                    {/* Mobile menu button*/}
                    <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                      <Disclosure.Button className="relative inline-flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white bg-lime-700 hover:bg-lime-500 text-lime-300 hover:text-lime-900 font-bold p-2 rounded-md">
                        <span className="absolute -inset-0.5" />
                        <span className="sr-only">Open main menu</span>
                        {open ? (
                          <XMarkIcon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        ) : (
                          <Bars3Icon
                            className="block h-6 w-6"
                            aria-hidden="true"
                          />
                        )}
                      </Disclosure.Button>
                    </div>

                    <div className="flex flex-1 items-start justify-center gap-x-8">
                      <div className="flex flex-shrink-0 items-center gap-2">
                        <Link to="/" onClick={changeCurrent}>
                          <img
                            className="h-8 w-auto"
                            src="/potHearts.png"
                            alt="logoApp"
                          />
                        </Link>

                        <h1 className="text-lime-300 text-3xl font-bold md:hidden">
                          Cooking Date
                        </h1>
                      </div>

                      <div className="hidden md:block">
                        <div className="flex space-x-2">
                          {navigation.map((item) => (
                            <Link
                              key={item.name}
                              to={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-lime-950 hover:bg-lime-500 text-lime-300 hover:text-lime-900"
                                  : "bg-lime-700 hover:bg-lime-500 text-lime-300 hover:text-lime-900",
                                "font-bold p-2 rounded-md"
                              )}
                              aria-current={item.current ? "page" : undefined}
                              onClick={(t) => {
                                changeCurrent(item.name);
                                toggleModal(t);
                              }}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <Disclosure.Panel className="md:hidden">
                  <div className="space-y-1 px-2 pb-3 pt-2">
                    {navigation.map((item) => (
                      <Disclosure.Button
                        key={item.name}
                        as="a"
                        href={item.href}
                        className={classNames(
                          item.current
                            ? "bg-lime-950 hover:bg-lime-500 text-lime-300 hover:text-lime-900"
                            : "bg-lime-700 hover:bg-lime-500 text-lime-300 hover:text-lime-900",
                          "block rounded-md px-3 p-2 text-base font-bold"
                        )}
                        aria-current={item.current ? "page" : undefined}
                        onClick={(t) => {
                          changeCurrent(item.name);
                          toggleModal(t);
                        }}
                      >
                        {item.name}
                      </Disclosure.Button>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            )}
          </>
        )}
      </Disclosure>

      <LoginModal isOpen={isOpen.login} toggleModal={toggleModal} />
    </>
  );
};

export default NavBarPrueba;
