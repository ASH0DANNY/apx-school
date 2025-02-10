import { Link } from "react-router-dom";
import school_logo from "../../images/apex_international_logo.jpg";
import { useEffect, useState } from "react";
import CallIcon from "@mui/icons-material/Call";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GoogleIcon from "@mui/icons-material/Google";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { NavbarLargeScreen, NavbarSmallScreen } from "./Navbar";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../Firebase";
import { SchoolInfo } from "../../types/schoolInfo";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [schoolData, setSchoolData] = useState<SchoolInfo | null>(null);

  const FollowIcons = [
    { index: 1, icon: FacebookIcon },
    { index: 2, icon: InstagramIcon },
    { index: 3, icon: GoogleIcon },
    { index: 4, icon: YouTubeIcon },
    { index: 5, icon: LinkedInIcon },
  ];

  useEffect(() => {
    getSchoolInfo();
  }, []);

  const getSchoolInfo = async () => {
    try {
      console.log("Get School Info");

      const dataRef = doc(db, "WEBSITE_CONFIG", "websiteConfig");
      const docSnap = await getDoc(dataRef);
      if (docSnap.exists()) {
        setSchoolData(docSnap.data() as SchoolInfo);
        console.log("School Data:", docSnap.data());
      } else {
        console.log("No such document found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleNavOpen = () => {
    setNavOpen(true);
  };
  const handleNavClose = () => {
    setNavOpen(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div className="fixed w-full bg-white shadow-md z-50">
        {/* Latest News */}
        <div
          className={`w-full px-1 md:px-8 bg-secondary flex justify-center items-center ${
            isVisible ? "visible" : "hidden"
          }`}
        >
          <div className="min-w-22 md:min-w-28 p-2 bg-primary text-white font-semibold text-xs md:text-base flex justify-center items-center">
            Latest News
          </div>
          <div className="px-3 py-2 w-3/4 text-white overflow-hidden flex justify-center items-center">
            <div className="inline-block animate-marquee whitespace-nowrap text-sm text-yellow-500 font-semibold">
              {schoolData?.latestNews}
            </div>
          </div>
        </div>

        {/* Social Media info */}
        <div
          className={`bg-primary w-full p-1 text-white ${
            isVisible ? "visible" : "hidden"
          }`}
        >
          <div className="grid grid-flow-row md:grid-flow-col text-xs md:text-base">
            <div className="flex justify-center items-center">
              <p>{schoolData?.contactDetails.email}</p>
            </div>
            <div className="flex justify-center items-center">
              <p>
                Follow us
                {FollowIcons.map((item) => (
                  <>
                    {"  "}
                    <Link key={item.index} to={"#"}>
                      <item.icon fontSize="small" />
                    </Link>
                  </>
                ))}
              </p>
            </div>
          </div>
        </div>

        {/* School Header */}
        <div className="w-full max-w-[1300px] mx-auto px-3 py-1 bg-white grid grid-flow-row md:grid-flow-col gap-4">
          <div className="flex justify-center items-center p-1">
            <div className="flex justify-center items-center">
              <img
                src={school_logo}
                alt="apex_logo"
                className={` ${
                  isVisible ? "h-[68px] w-[70px]" : "h-[48px] w-[50px]"
                } transition-all duration-1000 ease-in-out`}
              />
            </div>
            <div
              className={`${
                isVisible ? "text-xl md:text-4xl" : "text-xl md:text-3xl"
              } text-red-600 font-extrabold flex justify-center items-center pl-4`}
            >
              {schoolData?.schoolName}
            </div>

            {/* Menu Button */}
            <div className="flex flex-row-reverse items-center visible md:hidden m-1">
              <div className="p-0">
                {!navOpen ? (
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    className="p-0"
                    onClick={handleNavOpen}
                  >
                    <MenuIcon />
                  </Button>
                ) : (
                  <Button
                    color="error"
                    variant="contained"
                    size="small"
                    className="p-0"
                    onClick={handleNavClose}
                  >
                    <CloseIcon />
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Contact section */}
          <div
            className={`visible lg:block ${
              isVisible ? "visible" : "hidden md:visible"
            }`}
          >
            <div className="grid grid-flow-col">
              <div className="p-1 mt-2 flex flex-row gap-3 md:justify-center items-center">
                <p className="text-red-800">
                  <CallIcon fontSize="large" />
                </p>
                <div className="flex flex-col ">
                  <p className="text-xs md:text-sm text-gray-500 font-semibold ">
                    Contact Us
                  </p>
                  <p className="text-xs md:text-sm text-primary font-semibold">
                    {schoolData?.contactDetails.phoneNumbers.map((item) => (
                      <>
                        {item}
                        {", "}
                      </>
                    ))}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Bar */}
        <div className="w-full max-w-[1200px] mx-auto bg-white">
          <NavbarLargeScreen
            isVisible={isVisible}
            handleNavClose={handleNavClose}
          />
        </div>

        {navOpen ? <NavbarSmallScreen handleNavClose={handleNavClose} /> : null}
      </div>
    </>
  );
};

export default Header;
