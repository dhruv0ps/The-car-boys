import { Sidebar } from "flowbite-react";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { FaUsers,FaUser,FaBoxOpen } from 'react-icons/fa';
import { HiChartBar } from 'react-icons/hi';
import { Link } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import React from "react";

type NavSideBarProps = {
    isSidebarOpen: boolean;
    setIsSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

const sidebarTheme = {
    "root": {
        "base": "h-full",
        "collapsed": {
            "on": "w-16",
            "off": "w-64"
        },
        "inner": "h-full overflow-y-auto overflow-x-hidden rounded bg-gray-100 px-3 py-4 dark:bg-gray-800"
    },
    "collapse": {
        "button": "group flex w-full items-center rounded-lg p-2 text-base font-normal text-gray-900 transition duration-75 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
        "icon": {
            "base": "h-6 w-6 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
            "open": {
                "off": "",
                "on": "text-gray-900"
            }
        },
        "label": {
            "base": "ml-3 flex-1 whitespace-nowrap text-left",
            "icon": {
                "base": "h-6 w-6 transition delay-0 ease-in-out",
                "open": {
                    "on": "rotate-180",
                    "off": ""
                }
            }
        },
        "list": "space-y-2 py-2"
    },
    "cta": {
        "base": "mt-6 rounded-lg bg-gray-100 p-4 dark:bg-gray-700",
        "color": {
            "blue": "bg-cyan-50 dark:bg-cyan-900",
            "dark": "bg-dark-50 dark:bg-dark-900",
            "failure": "bg-red-50 dark:bg-red-900",
            "gray": "bg-alternative-50 dark:bg-alternative-900",
            "green": "bg-green-50 dark:bg-green-900",
            "light": "bg-light-50 dark:bg-light-900",
            "red": "bg-red-50 dark:bg-red-900",
            "purple": "bg-purple-50 dark:bg-purple-900",
            "success": "bg-green-50 dark:bg-green-900",
            "yellow": "bg-yellow-50 dark:bg-yellow-900",
            "warning": "bg-yellow-50 dark:bg-yellow-900"
        }
    },
    "item": {
        "base": "flex items-center justify-center rounded-lg p-2 text-base font-normal text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700",
        "active": "bg-gray-100 dark:bg-gray-700",
        "collapsed": {
            "insideCollapse": "group w-full pl-8 transition duration-75",
            "noIcon": "font-bold"
        },
        "content": {
            "base": "flex-1 whitespace-nowrap px-3"
        },
        "icon": {
            "base": "h-6 w-6 flex-shrink-0 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white",
            "active": "text-gray-700 dark:text-gray-100"
        },
        "label": "",
        "listItem": ""
    },
    "items": {
        "base": ""
    },
    "itemGroup": {
        "base": "mt-4 space-y-2 border-t border-gray-200 pt-4 first:mt-0 first:border-t-0 first:pt-0 dark:border-gray-700"
    },
    "logo": {
        "base": "mb-5 flex items-center pl-2.5",
        "collapsed": {
            "on": "hidden",
            "off": "self-center whitespace-nowrap text-xl font-semibold dark:text-white"
        },
        "img": "mr-3 h-6 sm:h-7"
    }
}
const renderChevronIcon = (theme: any, open: boolean) => {
    const IconComponent = open ? HiOutlineMinusSm : HiOutlinePlusSm;
    // Using optional chaining and providing a default style if theme.collapse is undefined
    const iconClass = twMerge(
      theme?.collapse?.label?.icon?.open?.[open ? "on" : "off"] || "text-gray-500"
    );
    
    return <IconComponent aria-hidden className={iconClass} />;
};

const NavSideBar: React.FC<NavSideBarProps> = ({ isSidebarOpen }) => {
    return (
        <Sidebar
            theme={sidebarTheme}
            aria-label="Sidebar"
            className={`${isSidebarOpen ? "" : "hidden"} h-[calc(100vh-4rem)] overflow-hidden w-screen sm:w-[18rem] sm:overflow-auto  border-r border-gray-300 shadow-lg    `}
        >
            <Sidebar.Items>
                <Sidebar.ItemGroup>
                    {/* Dashboard Link */}
                    <Sidebar.Item href="/" icon={HiChartBar}>
                        Dashboard
                    </Sidebar.Item>

                    {/* Leads Section */}
                    <Sidebar.Collapse
                        icon={FaUser}
                        label="Leads"
                        renderChevronIcon={(theme, open) => renderChevronIcon(theme, open)}
                    >
                        {/* <Link to="/leads/view"><Sidebar.Item>View Leads</Sidebar.Item></Link> */}
                        <Link to="/leads/add"><Sidebar.Item>Add Leads</Sidebar.Item></Link>
                    </Sidebar.Collapse>

                    {/* Inventory Section */}
                    <Sidebar.Collapse
                        icon={FaBoxOpen}
                        label="Inventory"
                        renderChevronIcon={(theme, open) => renderChevronIcon(theme, open)}
                    >
                        {/* <Link to="/inventory/view"><Sidebar.Item>View Inventory</Sidebar.Item></Link> */}
                        <Link to="/inventory/add"><Sidebar.Item>Add Car</Sidebar.Item></Link>
                    </Sidebar.Collapse>

                    {/* Users Section */}
                    <Sidebar.Collapse
                        icon={FaUsers}
                        label="Users"
                        renderChevronIcon={(theme, open) => renderChevronIcon(theme, open)}
                    >
                        {/* <Link to="/users/view"><Sidebar.Item>View Users</Sidebar.Item></Link> */}
                        <Link to="/users/add"><Sidebar.Item>Add Users</Sidebar.Item></Link>
                    </Sidebar.Collapse>
                </Sidebar.ItemGroup>
            </Sidebar.Items>
        </Sidebar>
    );
};

export default NavSideBar;
