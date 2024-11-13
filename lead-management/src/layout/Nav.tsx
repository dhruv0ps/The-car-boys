import { Dropdown, Navbar } from "flowbite-react";
import { HiLogout } from "react-icons/hi";
import { MdMenu, MdMenuOpen } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import logo from "../assets/react.svg";

export default function NavBar({ toggleSidebar, isSidebarOpen }: any) {
  const navigate = useNavigate();

  return (
    <Navbar className="bg-white border-b border-gray-300 shadow-sm px-4 py-4 lg:py-3 lg:px-6 rounded-md">
      <div className="flex items-center justify-between w-full">
        {/* Brand Logo */}
        <Navbar.Brand href="/" className="flex items-center">
          <img src={logo} className="h-10 w-10 mr-2" alt="App Logo" />
          <span className="text-lg font-semibold text-gray-800">The Car Boys</span>
        </Navbar.Brand>

        {/* Right-Side Dropdown and Menu Icons */}
        <div className="flex items-center md:order-2 space-x-4">
          {/* User Dropdown */}
          <Dropdown
            arrowIcon={false}
            inline
            label={
              <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center relative overflow-hidden">
                <svg
                  className="w-12 h-12 text-gray-700 -left-1 absolute"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
            }
          >
            <Dropdown.Header>
              <span className="block text-base font-medium text-gray-800">User </span>
              <span className="block truncate text-sm text-gray-500">user@example.com</span>
            </Dropdown.Header>
            <Dropdown.Divider />
            <Dropdown.Item
              icon={HiLogout}
              onClick={() => {
                navigate("/login");
              }}
              className="hover:bg-gray-300 transition duration-200"
            >
              Sign out
            </Dropdown.Item>
          </Dropdown>

          {/* Menu Icon for Toggling Sidebar */}
          <button
            className="text-gray-700 hover:text-gray-900 lg:hidden focus:outline-none"
            onClick={() => toggleSidebar()}
            aria-label="Toggle sidebar"
          >
            {isSidebarOpen ? (
              <MdMenuOpen className="text-3xl transition duration-200" />
            ) : (
              <MdMenu className="text-3xl transition duration-200" />
            )}
          </button>
        </div>
      </div>
    </Navbar>
  );
}