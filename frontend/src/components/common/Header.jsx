import React, { useContext, useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import commonContext from "../../contexts/common/commonContext";
import AccountForm from "../form/Accountform";
import { AiOutlineShoppingCart } from "react-icons/ai";
import useOutsideClose from "../../hooks/useOutsideClose";
import httpClient from "../../httpClient";
import { RiFileList3Line } from "react-icons/ri";
import Profile from "./Profile";
import { FiMail } from "react-icons/fi";
import { FiPhoneCall } from "react-icons/fi";
import { CiMenuFries } from "react-icons/ci";
import { MdClose } from "react-icons/md";
import { IoWalletOutline } from "react-icons/io5";
import logo from "../../assets/header.png";
import { useDarkMode } from "../../contexts/DarkMode/DarkModeContext";
import { FaMoon, FaSun } from "react-icons/fa";

const Header = () => {
  const { toggleForm, userLogout, toggleProfile } = useContext(commonContext);
  const [isSticky, setIsSticky] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const curPath = location.pathname;
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const windowWidth = window.innerWidth;
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  const { isDarkMode, toggleDarkMode } = useDarkMode();

  useEffect(() => {
    const handleIsSticky = () =>
      window.scrollY >= 50 ? setIsSticky(true) : setIsSticky(false);
    const handleIsScrolled = () =>
      window.scrollY >= 1 ? setIsScrolled(true) : setIsScrolled(false);

    window.addEventListener("scroll", handleIsSticky);
    window.addEventListener("scroll", handleIsScrolled);

    // Add event listener to close dropdown when clicking outside
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSideBarOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleIsSticky);
      window.removeEventListener("scroll", handleIsScrolled);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSticky, isScrolled]);

  const updatestatus = () => {
    httpClient.put("/doc_status", { email: localStorage.getItem("email") });
    userLogout();
  };

  const dropdownRef = useRef();
  const sidebarRef = useRef();

  const handleLoginClick = () => {
    setIsSignup(false);
    toggleForm(true);
  };

  const handleRegisterClick = () => {
    setIsSignup(true);
    toggleForm(true);
  };

  return (
    <>
      {localStorage.getItem("username") &&
        localStorage.getItem("username") !== "undefined" &&
        localStorage.getItem("usertype") === "patient" && (
          <div
            className={`overflow-x-hidden flex justify-between items-center py-4 px-40 border-b-[1px] border-blue-8 h-full transition-all duration-300 ease-out max-lg:px-5 max-sm:px-4 max-sm:py-4 max-xs:p-2 dark:bg-black-3 dark:text-white-1 dark:hover:text-blue-2 dark:border-grey-3 ${
              isScrolled ? "opacity-0 h-0 p-0" : ""
            }`}
          >
            <div
              className={`flex justify-center items-center flex-wrap text-grey-3 transition-transform duration-500 max-lg:justify-start dark:hover:text-white-1 dark:text-blue-2 ${
                isScrolled
                  ? "-translate-x-full opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              <Link
                to="/"
                className="flex justify-center items-center transition-all duration-300 ease-out hover:text-[#333] mr-[20px] max-xs:mr-0 dark:text-white-1 dark:text-opacity-80 dark:hover:text-opacity-100"
              >
                <FiMail className="text-[0.9em] leading-[1.4rem] mr-[5px]" />
                <p className="text-[0.9em] leading-[1.4rem]">
                  medicare489@gmail.com
                </p>
              </Link>
              <Link
                to="/"
                className="flex justify-center items-center transition-all duration-300 ease-out hover:text-[#333] dark:text-white-1 dark:text-opacity-80 dark:hover:text-opacity-100"
              >
                <FiPhoneCall className="text-[0.9em] leading-[1.4rem] mr-[5px]" />
                <p className="text-[0.9em] leading-[1.4rem]">+91 12345 67890</p>
              </Link>
            </div>
            <div
              className={`transition-transform duration-500 ${
                isScrolled
                  ? "translate-x-full opacity-0"
                  : "translate-x-0 opacity-100"
              }`}
            >
              <Link
                to="/doctors"
                className="text-blue-5 font-bold transition-all duration-300 ease-out hover:text-blue-7 dark:text-white-1 dark:text-opacity-80 dark:hover:text-opacity-100"
              >
                Appointment
              </Link>
            </div>
          </div>
        )}
      <header
        id=""
        className={`z-[1000] w-full text-blue-8 md:px-4 pt-6 pb-6 transition-colors duration-0 ease-linear h-full bg-[#f5f5f5] dark:text-white-1 overflow-x-hidden ${
          isSticky
            ? "top-0 sticky bg-blue-1 dark:bg-black-2"
            : "dark:bg-black-6"
        } `}
      >
        <div className="max-w-[1440px] mx-auto max-sm:px-2 px-4 max-xl:max-w-[1280px] max-lg:max-w-[1024px] max-md:max-w-[768px] max-sm:max-w-full h-full overflow-x-hidden relative">
          <div className="flex flex-row justify-between items-center w-full">
            <div className="flex-shrink-0 max-w-[180px]">
              <Link to="/">
                <img
                  src={logo}
                  alt=""
                  className="w-full md:max-h-[45px] hover:text-blue-9"
                />
              </Link>
            </div>

            {!localStorage.getItem("username") && (
              <div className="flex items-center gap-4">
                <div className="space-x-4 items-center md:flex md:justify-end">
                  <button
                    type="button"
                    onClick={handleLoginClick}
                    className="py-[0.7rem] max-md:py-2 max-md:px-4 px-6 rounded-[4px] text-white-1 bg-blue-4 transition-colors duration-300 cursor-pointer hover:bg-blue-6 max-md:text-sm dark:bg-blue-25 dark:hover:bg-blue-31"
                  >
                    Login
                  </button>
                  <button
                    type="button"
                    onClick={handleRegisterClick}
                    className="max-md:hidden py-[0.7rem] px-6 rounded-[4px] text-white-1 bg-blue-4 transition-colors duration-300 cursor-pointer hover:bg-blue-6 max-md:text-sm dark:bg-blue-25 dark:hover:bg-blue-31"
                  >
                    Register
                  </button>
                </div>
                <div className="cursor-pointer">
                  {isDarkMode ? (
                    <FaSun
                      className="w-7 h-7 max-sm:w-6 max-sm:h-6 text-white-1 hidden dark:block bg-blue-3 p-[0.3rem] max-sm:p-1 rounded-full align-middle dark:bg-blue-25 dark:hover:bg-blue-31"
                      onClick={toggleDarkMode}
                    />
                  ) : (
                    <FaMoon
                      className="w-7 h-7 max-sm:w-6 max-sm:h-6 bg-white-1 text-blue-3 dark:hidden p-[0.3rem] max-sm:p-1 rounded-full"
                      onClick={toggleDarkMode}
                    />
                  )}
                </div>
              </div>
            )}

            {localStorage.getItem("username") !== null &&
            localStorage.getItem("username") !== undefined ? (
              windowWidth >= 800 ? (
                <div className="flex flex-row items-center justify-end space-x-8 flex-grow ml-8">
                  <div
                    className={`hover:text-blue-9 content-none transition-all duration-300 text-[0.9em] pt-[13px] pb-2 inline-flex items-center dark:hover:text-blue-2 ${
                      curPath === "/home"
                        ? "text-blue-9 border-b-[2px] border-blue-9 dark:text-blue-32 dark:border-blue-5"
                        : "dark:text-white-1 text-blue-8"
                    }`}
                  >
                    <span
                      onClick={() => navigate("/home")}
                      className="cursor-pointer font-bold"
                    >
                      HOME
                    </span>
                  </div>

                  {localStorage.getItem("usertype") === "patient" && (
                    <div
                      className={`hover:text-blue-9 content-none transition-all duration-300 text-[0.9em] pt-[13px] pb-2 inline-flex items-center dark:hover:text-blue-2 ${
                        curPath === "/doctors"
                          ? "text-blue-9 border-b-[2px] border-blue-9 dark:text-blue-32 dark:border-blue-5"
                          : "dark:text-white-1 text-blue-8"
                      }`}
                    >
                      <span
                        onClick={() => navigate("/doctors")}
                        className="cursor-pointer font-bold"
                      >
                        DOCTORS
                      </span>
                    </div>
                  )}

                  {localStorage.getItem("usertype") === "patient" && (
                    <div
                      className={`hover:text-blue-9 content-none transition-all duration-300 text-[0.9em] pt-[13px] pb-2 inline-flex items-center dark:hover:text-blue-2 ${
                        curPath === "/analysis"
                          ? "text-blue-9 border-b-[2px] border-blue-9 dark:text-blue-32 dark:border-blue-5"
                          : "dark:text-white-1 text-blue-8"
                      }`}
                    >
                      <span
                        onClick={() => navigate("/analysis")}
                        className="cursor-pointer font-bold"
                      >
                        ANALYSIS
                      </span>
                    </div>
                  )}

                  {localStorage.getItem("usertype") === "patient" && (
                    <div
                      className={`hover:text-blue-9 content-none transition-all duration-300 text-[0.9em] pt-[13px] pb-2 inline-flex items-center dark:hover:text-blue-2 min-w-[130px] whitespace-nowrap ${
                        curPath === "/medical-diagnosis"
                          ? "text-blue-9 border-b-[2px] border-blue-9 dark:text-blue-32 dark:border-blue-5"
                          : "dark:text-white-1 text-blue-8"
                      }`}
                    >
                      <a
                        href="https://rajkhanke-medical-diagnosis-assistant.hf.space/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-pointer font-bold w-full"
                      >
                        MEDICAL DIAGNOSIS
                      </a>
                    </div>
                  )}

                  {localStorage.getItem("usertype") === "patient" && (
                    <div
                      className={`hover:text-blue-9 content-none transition-all duration-300 text-[0.9em] pt-[13px] pb-2 inline-flex items-center dark:hover:text-blue-2 ${
                        curPath === "/features"
                          ? "text-blue-9 border-b-[2px] border-blue-9 dark:text-blue-32 dark:border-blue-5"
                          : "dark:text-white-1 text-blue-8"
                      }`}
                    >
                      <span
                        onClick={() => navigate("/features")}
                        className="cursor-pointer font-bold"
                      >
                        FEATURES
                      </span>
                    </div>
                  )}

                  <div
                    className={`hover:text-blue-9 content-none transition-all duration-300 text-[0.9em] pt-[13px] pb-2 inline-flex items-center dark:hover:text-blue-2 ${
                      curPath === "/about"
                        ? "text-blue-9 border-b-[2px] border-blue-9 dark:text-blue-32 dark:border-blue-5"
                        : "dark:text-white-1 text-blue-8"
                    }`}
                  >
                    <span
                      onClick={() => navigate("/about")}
                      className="cursor-pointer font-bold"
                    >
                      ABOUT
                    </span>
                  </div>

                  {/* Account Dropdown */}
                  <div
                    className="relative hover:text-blue-9 transition-all duration-300 text-[0.9em] pt-[13px] pb-2 text-blue-8 dark:text-white-1 dark:hover:text-blue-2 inline-block"
                    ref={dropdownRef}
                  >
                    <span
                      className="cursor-pointer font-bold"
                      onClick={() => setShowDropdown(!showDropdown)}
                    >
                      ACCOUNT
                    </span>
                    {showDropdown && (
                      <div
                        className={`fixed top-[8rem] right-[12%] lg:right-[8%] md:right-[5%] w-[17rem] bg-blue-6 p-6 text-[0.9rem] rounded-[3px] text-[#eee] border-[1px] border-grey-3 z-[100] transition-all duration-200 ease-in-out shadow-md dark:bg-blue-31 max-md:hidden`}
                      >
                        <h4 className="font-semibold space-x-[0.5px] text-blue-2">
                          <span className="text-[1em] opacity-95 hover:opacity-100 text-white-1">
                            Hello! &nbsp;
                          </span>
                          <span className="dark:text-white-1/75">
                            {localStorage.getItem("username")}
                          </span>
                        </h4>
                        <p className="text-[0.8rem] mt-2">
                          Have a great health!!
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          <button
                            type="button"
                            className="py-[0.8rem] px-4 rounded-[4px] border-[1px] transition-all duration-300 hover:text-blue-1 hover:border-blue-5 hover:bg-blue-5 text-blue-1 border-blue-3"
                            onClick={() => {
                              setShowDropdown(false);
                              toggleProfile(true);
                            }}
                          >
                            Profile
                          </button>
                          <button
                            type="button"
                            className="py-[0.8rem] px-4 rounded-[4px] border-[1px] transition-all duration-300 hover:text-blue-1 hover:border-blue-5 hover:bg-blue-5 text-blue-1 border-blue-3"
                            onClick={() => {
                              setShowDropdown(false);
                              localStorage.getItem("usertype") === "doctor"
                                ? updatestatus()
                                : userLogout();
                              navigate("/");
                            }}
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="cursor-pointer flex justify-end items-center">
                    {isDarkMode ? (
                      <FaSun
                        className="w-7 h-7 max-sm:w-6 max-sm:h-6 text-white-1 hidden dark:block bg-blue-8 p-[0.3rem] max-sm:p-1 rounded-full align-middle dark:bg-blue-25 dark:text-white-1"
                        onClick={toggleDarkMode}
                      />
                    ) : (
                      <FaMoon
                        className="w-7 h-7 max-sm:w-6 max-sm:h-6 bg-white-1 text-blue-8 dark:hidden p-[0.3rem] max-sm:p-1 rounded-full"
                        onClick={toggleDarkMode}
                      />
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex justify-end items-center mt-2 z-[101]">
                  <div className="cursor-pointer">
                    {isDarkMode ? (
                      <FaSun
                        className="w-7 h-7 max-sm:w-6 max-sm:h-6 text-white-1 hidden dark:block bg-blue-8 p-[0.3rem] max-sm:p-1 rounded-full align-middle dark:bg-blue-25 dark:text-white-1"
                        onClick={toggleDarkMode}
                      />
                    ) : (
                      <FaMoon
                        className="w-7 h-7 max-sm:w-6 max-sm:h-6 bg-white-1 text-blue-8 dark:hidden p-[0.3rem] max-sm:p-1 rounded-full"
                        onClick={toggleDarkMode}
                      />
                    )}
                  </div>
                  <div
                    id="sidebar"
                    className="w-auto h-7 max-sm:relative ml-8 max-sm:ml-3"
                  >
                    <div
                      className="text-[1.5em] cursor-pointer font-bold dark:font-extrabold"
                      onClick={() => setSideBarOpen((prev) => !prev)}
                    >
                      {isSideBarOpen ? <MdClose /> : <CiMenuFries />}
                    </div>
                    <div
                      className={`relative transition-all duration-300 ease-in ${
                        isSideBarOpen
                          ? "visible opacity-100"
                          : "hidden opacity-0"
                      }`}
                      ref={sidebarRef}
                    >
                      <nav className="absolute flex flex-col top-[30px] right-0 gap-4 bg-blue-1 z-[99] py-4 px-12 rounded-[20px] dark:bg-gray-800 min-w-[180px]">
                        <div
                          className={`hover:text-blue-9 content-none transition-all duration-300 text-[0.9em] pt-[13px] pb-2 inline-flex items-center ${
                            curPath === "/home"
                              ? "text-blue-9 border-b-[2px] border-blue-9 dark:text-blue-32 dark:border-blue-5"
                              : "dark:text-white-1 text-blue-8"
                          }`}
                        >
                          <span
                            onClick={() => {
                              navigate("/home");
                              setSideBarOpen((prev) => !prev);
                            }}
                            className="cursor-pointer font-bold text-center w-full"
                          >
                            HOME
                          </span>
                        </div>

                        {localStorage.getItem("usertype") === "patient" && (
                          <div
                            className={`hover:text-blue-9 content-none transition-all duration-300 text-[0.9em] pt-[13px] pb-2 inline-flex items-center ${
                              curPath === "/doctors"
                                ? "text-blue-9 border-b-[2px] border-blue-9 dark:text-blue-32 dark:border-blue-5"
                                : "dark:text-white-1 text-blue-8"
                            }`}
                          >
                            <span
                              onClick={() => {
                                navigate("/doctors");
                                setSideBarOpen((prev) => !prev);
                              }}
                              className="cursor-pointer font-bold text-center w-full"
                            >
                              DOCTORS
                            </span>
                          </div>
                        )}

                        {localStorage.getItem("usertype") === "patient" && (
                          <div
                            className={`hover:text-blue-9 content-none transition-all duration-300 text-[0.9em] pt-[13px] pb-2 inline-flex items-center whitespace-nowrap min-w-[180px] ${
                              curPath === "/medical-diagnosis"
                                ? "text-blue-9 border-b-[2px] border-blue-9 dark:text-blue-32 dark:border-blue-5"
                                : "dark:text-white-1 text-blue-8"
                            }`}
                          >
                            <a
                              href="https://rajkhanke-medical-diagnosis-assistant.hf.space/"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="cursor-pointer font-bold text-center w-full"
                              onClick={() => setSideBarOpen(false)}
                            >
                              MEDICAL DIAGNOSIS
                            </a>
                          </div>
                        )}

                        {localStorage.getItem("usertype") === "patient" && (
                          <div
                            className={`hover:text-blue-9 content-none transition-all duration-300 text-[0.9em] pt-[13px] pb-2 inline-flex items-center ${
                              curPath === "/analysis"
                                ? "text-blue-9 border-b-[2px] border-blue-9 dark:text-blue-32 dark:border-blue-5"
                                : "dark:text-white-1 text-blue-8"
                            }`}
                          >
                            <span
                              onClick={() => {
                                navigate("/analysis");
                                setSideBarOpen((prev) => !prev);
                              }}
                              className="cursor-pointer font-bold text-center w-full"
                            >
                              ANALYSIS
                            </span>
                          </div>
                        )}

                        {localStorage.getItem("usertype") === "patient" && (
                          <div
                            className={`hover:text-blue-9 content-none transition-all duration-300 text-[0.9em] pt-[13px] pb-2 inline-flex items-center ${
                              curPath === "/features"
                                ? "text-blue-9 border-b-[2px] border-blue-9 dark:text-blue-32 dark:border-blue-5"
                                : "dark:text-white-1 text-blue-8"
                            }`}
                          >
                            <span
                              onClick={() => {
                                navigate("/features");
                                setSideBarOpen((prev) => !prev);
                              }}
                              className="cursor-pointer font-bold text-center w-full"
                            >
                              FEATURES
                            </span>
                          </div>
                        )}

                        <div
                          className={`hover:text-blue-9 content-none transition-all duration-300 text-[0.9em] pt-[13px] pb-2 inline-flex items-center ${
                            curPath === "/about"
                              ? "text-blue-9 border-b-[2px] border-blue-9 dark:text-blue-32 dark:border-blue-5"
                              : "dark:text-white-1 text-blue-8"
                          }`}
                        >
                          <span
                            onClick={() => {
                              navigate("/about");
                              setSideBarOpen((prev) => !prev);
                            }}
                            className="cursor-pointer font-bold text-center w-full"
                          >
                            ABOUT
                          </span>
                        </div>

                        <div
                          className={`hover:text-blue-9 content-none transition-all duration-300 text-[0.9em] pt-[13px] pb-2 inline-flex items-center text-blue-8 dark:text-white-1 w-full`}
                        >
                          <span
                            className="font-bold text-center w-full cursor-pointer"
                            onClick={() => {
                              setSideBarOpen(false);
                              setShowDropdown(true);
                            }}
                          >
                            ACCOUNT
                          </span>
                        </div>
                      </nav>
                    </div>
                    {showDropdown && (
                      <div
                        className={`fixed top-[4rem] right-2 w-[17rem] bg-blue-6 p-6 text-[0.9rem] rounded-[3px] text-[#eee] border-[1px] border-grey-3 z-[100] transition-all duration-200 ease-in-out shadow-md dark:bg-blue-31 md:hidden`}
                        ref={dropdownRef}
                      >
                        <h4 className="font-semibold space-x-[0.5px] text-blue-2">
                          <span className="text-[1em] opacity-95 hover:opacity-100 text-white-1">
                            Hello! &nbsp;
                          </span>
                          <span className="dark:text-white-1/75">
                            {localStorage.getItem("username")}
                          </span>
                        </h4>
                        <p className="text-[0.8rem] mt-2">
                          Have a great health!!
                        </p>
                        <div className="flex flex-wrap gap-2 mt-4">
                          <button
                            type="button"
                            className="py-[0.8rem] px-4 rounded-[4px] border-[1px] transition-all duration-300 hover:text-blue-1 hover:border-blue-5 hover:bg-blue-5 text-blue-1 border-blue-3 bg-blue-3"
                            onClick={() => {
                              setShowDropdown(false);
                              toggleProfile(true);
                            }}
                          >
                            Profile
                          </button>
                          <button
                            type="button"
                            className="py-[0.8rem] px-4 rounded-[4px] border-[1px] transition-all duration-300 hover:text-blue-1 hover:border-blue-5 hover:bg-blue-5 text-blue-1 border-blue-3"
                            onClick={() => {
                              setShowDropdown(false);
                              localStorage.getItem("usertype") === "doctor"
                                ? updatestatus()
                                : userLogout();
                              navigate("/");
                            }}
                          >
                            Logout
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )
            ) : null}
          </div>
        </div>
      </header>

      <AccountForm isSignup={isSignup} setIsSignup={setIsSignup} />
      <Profile />
    </>
  );
};

export default Header;
