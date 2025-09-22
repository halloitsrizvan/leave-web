import React, { useState, useEffect, useRef } from 'react'
import { FaHome, FaPlusCircle,FaSignInAlt, FaClipboardList, FaUsers, FaInfoCircle, FaUser, FaShoppingBag, FaSignOutAlt, FaChevronUp, FaChevronDown, FaTimes, FaBars } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { MdOutlinePreview } from "react-icons/md";
import {useUser} from '../../Store/UserContext'
import './Header.css';
function Header() {
    const [isOpen, setIsOpen] = useState(false);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    const {currentUser,logout,userData}=useUser()
    const handleLogout = async () => {
        try {
          await logout();
          navigate('/');
          setIsDropdownOpen(false);
          setIsOpen(false);
        } catch(error) {
          console.error('Error logging out:', error);
        }
      };
    
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
        if (isOpen) {
            setIsDropdownOpen(false);
        }
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const navigateTo = (path) => {
        navigate(path);
        setIsOpen(false);
        setIsDropdownOpen(false);
    };
  return (
    <div >
        <header className="fixed w-full bg-gradient-to-r from-indigo-600 to-purple-700 shadow-xl font-sans z-50">
            <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                {/* Logo Section */}
                <div className="flex items-center">
                    <a 
                        href="#" 
                        className="text-2xl md:text-3xl font-extrabold text-white hover:text-yellow-300 transition-colors duration-300 transform "
                       
                    >
                        Student's <span className="text-yellow-300">Leave</span>
                    </a>
                </div>

                {/* Desktop Navigation */}
                <nav className=" hidden md:flex space-x-4 lg:space-x-6 items-center">
                    <NavItem 
                        icon={<FaHome className="mr-1  " />}
                        text="Dashboard"
                       
                        onClick={() => navigateTo('/')}
                        
                    />
                   
                    <NavItem 
                        icon={<FaClipboardList className="mr-1" />}
                        text="Leave Status"
                        onClick={() => navigateTo('/leave-status')}
                    />
                   
                    <NavItem 
                        icon={<FaInfoCircle className="mr-1" />}
                        text="Massage"
                        onClick={() => navigateTo('/massage')}
                    />

                     <a 
                        href="#" 
                        className="hover:no-underline flex items-center text-white hover:text-yellow-300 text-base lg:text-lg font-medium transition-colors duration-300 relative group"
                        onClick={(e) => { e.preventDefault(); handleLogout(); }}
                    >
                        <FaSignInAlt></FaSignInAlt>
                        Logout
                        
                        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
                    </a>
                    
                    <div className="relative group ml-4" ref={dropdownRef}>
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center text-white hover:text-yellow-300 text-base lg:text-lg font-medium transition-colors duration-300 focus:outline-none"
                        >
                            <FaUser className="mr-2" />
                            {currentUser?.displayName || 'Admin'}
                            <span className="ml-2 transform transition-transform duration-200">
                                {isDropdownOpen ? <FaChevronUp /> : <FaChevronDown />}
                            </span>
                        </button>
                        
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 ring-1 ring-black ring-opacity-5 z-50 animate-fade-in">
                              {userData.isAdmin==true &&
                                <DropdownItem 
                                    icon={<FaShoppingBag />}
                                    text="Teachers' Page"
                                    onClick={() => navigateTo('/teachers-panel')}
                                />}

                                <div className="border-t border-gray-200 my-1"></div>
                                <DropdownItem 
                                    icon={<FaSignOutAlt />}
                                    text="Logout"
                                    onClick={() => {
                                        handleLogout()
                                        navigateTo('/');
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <div className="md:hidden flex items-center">
                    <button
                        onClick={toggleMenu}
                        className="text-white hover:text-yellow-300 focus:outline-none p-2 rounded-md transition-colors duration-300"
                        aria-label="Toggle menu"
                    >
                        {isOpen ? <FaTimes className="text-xl" /> : <FaBars className="text-xl" />}
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <nav className="md:hidden bg-indigo-700 border-t border-indigo-500 py-3 animate-slide-down">
                    <div className="flex flex-col items-center space-y-3 px-4">
                        <MobileNavItem 
                            icon={<FaHome />}
                            text="Dashboard"
                            onClick={() => navigateTo('/')}
                        />
                       
                        <MobileNavItem 
                            icon={<FaClipboardList />}
                            text="Leave Status"
                            onClick={() => navigateTo('/leave-status')}
                        />
                        <MobileNavItem 
                            icon={<FaUsers />}
                            text="Massage"
                            onClick={() => navigateTo('/massage')}
                        />
                       <a 
                            href="#" 
                            className="flex items-center w-full px-4 py-2 text-white hover:text-yellow-300 font-medium rounded-md transition-colors duration-300"
                            onClick={(e) => { e.preventDefault(); handleLogout(); }}
                        >
                            <span className="mr-3"><FaSignInAlt></FaSignInAlt></span>
                            Logout
                        </a>
                        <MobileNavItem 
                            icon={<FaUser />}
                            text={`Logged as: ${currentUser?.displayName || 'Admin'}`}
                            onClick={toggleDropdown}
                        />
                        <MobileNavItem 
                            icon={<FaShoppingBag />}
                            text="Admin Page"
                            onClick={() => navigateTo('/admin-panel')}
                        />
                    </div>
                </nav>
            )}
        </header>
    </div>
  )
}
const NavItem = ({ icon, text, onClick }) => (
    <a 
        href="#" 
        className="hover:no-underline flex items-center text-white hover:text-yellow-300 text-base lg:text-lg font-medium transition-colors duration-300 relative group"
        onClick={(e) => { e.preventDefault(); onClick(); }}
    >
        {icon}
        {text}
        <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-yellow-300 transition-all duration-300 group-hover:w-full"></span>
    </a>
);

const DropdownItem = ({ icon, text, onClick }) => (
    <a 
        href="#" 
        className="flex items-center px-4 py-2 text-gray-800 hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
        onClick={(e) => { e.preventDefault(); onClick(); }}
    >
        <span className="mr-2">{icon}</span>
        {text}
    </a>
);

// Reusable component for mobile nav items
const MobileNavItem = ({ icon, text, onClick }) => (
    <a 
        href="#" 
        className="flex items-center w-full px-4 py-2 text-white hover:text-yellow-300 font-medium rounded-md transition-colors duration-300"
        onClick={(e) => { e.preventDefault(); onClick(); }}
    >
        <span className="mr-3">{icon}</span>
        {text}
    </a>
);
export default Header