import { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Disclosure, Menu, Transition } from "@headlessui/react";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useAuth } from "../contexts/AuthContext";
import { useToggle } from "../contexts/ToggleContext";
import LoginModal from "./login/LoginModal";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

const NavBar = () => {
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
    { name: "Profile", href: "#", current: false },
    { name: "Configuration", href: "#", current: false },
    { name: "Sign out", href: "/", current: false },
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

  useEffect(() => {
    setNavIsAuthenticated([
      { name: "People", href: "/people", current: false },
      {
        name: "Profile",
        href: user ? `/profile/${user._id}` : "#",
        current: false,
      },
      { name: "Configuration", href: "#", current: false },
      { name: "Sign out", href: "/", current: false },
    ]);
  }, [user]);

  return (
    <>
      <Disclosure
        as="nav"
        className="bg-[#FF3B30] fixed left-0 top-0 right-0 z-50 w-full rounded-bl-md rounded-br-md"
      >
        {({ open }) => (
          <>
            {isAuthenticated ? (
              <>
                <div className="mx-auto max-w-7xl px-6">
                  <div className="relative flex h-16 items-center justify-between">
                    {/* Dropdown button*/}
                    <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                      <Disclosure.Button className="relative bg-[#FF9500] hover:bg-[#FFCC00] focus:ring-white focus:outline-none focus:ring-2 focus:ring-inset inline-flex items-center justify-center font-bold p-2 rounded-md">
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

                    <div className="flex flex-1 items-center justify-center gap-x-8">
                      <div className="flex flex-shrink-0 items-center gap-2">
                        {/* Logo */}
                        <Link to="/people" onClick={changeCurrent}>
                          <img
                            className="h-8 w-auto"
                            src="/potHearts.png"
                            alt="logoApp"
                          />
                        </Link>

                        {/* Title */}
                        <h1 className="hidden sm:block md:hidden text-[#FFCC00] text-3xl font-bold">
                          Cooking Date
                        </h1>
                      </div>

                      {/* Links */}
                      <div className="hidden md:block">
                        <div className="flex space-x-2">
                          {navIsAuthenticated.map((item) => (
                            <Link
                              id="desde los links del navbar"
                              key={item.name}
                              to={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-[#FFCC00] hover:bg-[#FF9500]"
                                  : "bg-[#FF9500] hover:bg-[#FFCC00]",
                                "font-bold p-2 rounded-md"
                              )}
                              aria-current={item.current ? "page" : undefined}
                              onClick={(t) => {
                                changeCurrent(item.name);
                                if (item.name === "Logout") logout();
                                toggleModal(t);
                              }}
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center">
                      {/* Notifications button */}
                      <button
                        type="button"
                        className="relative bg-[#FF9500] hover:bg-[#FFCC00] focus:ring-white focus:outline-none focus:ring-2 focus:ring-offset-2 p-2 rounded-full"
                      >
                        <BellIcon className="h-6 w-6" aria-hidden="true" />
                      </button>

                      {/* Profile dropdown */}
                      {user ? (
                        <Menu as="div" className="relative ml-3">
                          <div>
                            <Menu.Button className="relative focus:ring-white focus:outline-none focus:ring-2 flex rounded-full">
                              <img
                                className="h-10 w-10 rounded-full"
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
                            <Menu.Items className="absolute bg-[#FF3B30] right-0 z-10 w-48 space-y-2 p-2 mt-4 rounded-md">
                              <Menu.Item>
                                {({ active }) => (
                                  <Link
                                    to={`/profile/${user._id}`}
                                    className={classNames(
                                      active ? "bg-[#FFCC00]" : "",
                                      "block font-bold p-2 rounded-md bg-[#FF9500]"
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
                                      active ? "bg-[#FFCC00]" : "",
                                      "block font-bold p-2 rounded-md bg-[#FF9500]"
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
                                      active ? "bg-[#FFCC00]" : "",
                                      "block font-bold p-2 rounded-md bg-[#FF9500]"
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
                  <div className="space-y-2 p-2">
                    {navIsAuthenticated.map((item) => (
                      <Disclosure.Button
                        id="desde el menu desplegable"
                        key={item.name}
                        as="p"
                        className={classNames(
                          item.current
                            ? "bg-[#FFCC00] hover:bg-[#FF9500]"
                            : "bg-[#FF9500] hover:bg-[#FFCC00]",
                          "block font-bold p-2 rounded-md"
                        )}
                        aria-current={item.current ? "page" : undefined}
                        onClick={(t) => {
                          changeCurrent(item.name);
                          if (item.name === "Logout") logout();
                          toggleModal(t);
                        }}
                      >
                        <Link to={item.href}>{item.name}</Link>
                      </Disclosure.Button>
                    ))}
                  </div>
                </Disclosure.Panel>
              </>
            ) : (
              <>
                <div className="mx-auto max-w-7xl px-6">
                  <div className="relative flex h-16 items-center justify-between">
                    {/* Dropdown button*/}
                    <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
                      <Disclosure.Button className="relative bg-[#FF9500] hover:bg-[#FFCC00] focus:ring-white focus:outline-none focus:ring-2 focus:ring-inset inline-flex items-center justify-center font-bold p-2 rounded-md">
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

                    <div className="flex flex-1 items-center justify-center gap-x-8">
                      <div className="flex flex-shrink-0 items-center gap-2">
                        {/* Logo */}
                        <Link to="/" onClick={changeCurrent}>
                          <img
                            className="h-8 w-auto"
                            src="/potHearts.png"
                            alt="logoApp"
                          />
                        </Link>

                        {/* Title */}
                        <h1 className="hidden sm:block md:hidden text-[#FFCC00] text-3xl font-bold">
                          Cooking Date
                        </h1>
                      </div>

                      {/* Links */}
                      <div className="hidden md:block">
                        <div className="flex space-x-2">
                          {navigation.map((item) => (
                            <Link
                              id="desde los links del navbar"
                              key={item.name}
                              to={item.href}
                              className={classNames(
                                item.current
                                  ? "bg-[#FFCC00] hover:bg-[#FF9500]"
                                  : "bg-[#FF9500] hover:bg-[#FFCC00]",
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
                            ? "bg-[#FFCC00] hover:bg-[#FF9500]"
                            : "bg-[#FF9500] hover:bg-[#FFCC00]",
                          "block font-bold p-2 rounded-md"
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

export default NavBar;
