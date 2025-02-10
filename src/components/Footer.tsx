import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import GoogleIcon from "@mui/icons-material/Google";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import CallIcon from "@mui/icons-material/Call";
import EmailIcon from "@mui/icons-material/Email";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Link } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { SchoolInfo } from "../types/schoolInfo";
import { useEffect, useState } from "react";

const Footer = () => {
  const [schoolData, setSchoolData] = useState<SchoolInfo | null>(null);

  const FooterLinkItems = [
    { name: "Home", link: "/" },
    { name: "About Us", link: "/aboutus" },
    { name: "Message", link: "/message" },
    { name: "Photo Gallery", link: "/photogallery" },
    { name: "Video Gallery", link: "/videogallery" },
    { name: "Our Staff", link: "/ourstaff" },
    { name: "Contact Us", link: "/contactus" },
  ];
  const FooterFollowItems = [
    {
      index: 1,
      icon: FacebookIcon,
      link: "https://www.facebook.com/https://www.facebook.com/share/v/Ue1xcZPobyJbnqs5/",
    },
    { index: 2, icon: GoogleIcon, link: "https://plus.google.com/a" },
    {
      index: 3,
      icon: YouTubeIcon,
      link: "https://www.youtube.com/ahttps://youtube.com/@apexgrd?si=KAxSYwJccm1QSiFZ",
    },
    { index: 4, icon: LinkedInIcon, link: "https://www.linkedin.com/a" },
    { index: 5, icon: InstagramIcon, link: "https://www.instagram.com/a" },
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

  return (
    <>
      <div className="w-full bg-primary-dark text-white ">
        <div className="max-w-[1500px] mx-auto p-4 grid grid-flow-row">
          {/* Upper Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-2 px-5 md:px-40 py-5 md:py-10 border-b-2 border-white">
            <div>
              <div className="p-2 text-2xl md:text-3xl flex">
                <div className="border-b-2 border-white py-2">Links</div>
              </div>
              <div className="px-3">
                <ul className="grid grid-flow-row grid-cols-2">
                  {FooterLinkItems.map((item) => (
                    <li key={item.name} className="p-1">
                      <Link to={item.link} className="hover:text-fade">
                        {item.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div>
              <div className="p-2 text-2xl md:text-3xl flex">
                <div className="border-b-2 border-white py-2">Follow</div>
              </div>
              <div className="my-3 py-2 px-1">
                <ul className="flex gap-4">
                  {FooterFollowItems.map((item) => (
                    <li key={item.index} className="">
                      <Link to={item.link}>
                        {<item.icon fontSize="medium" />}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="pb-10">
              <div className="p-2 text-2xl md:text-3xl flex">
                <div className="border-b-2 border-white py-2">
                  {schoolData?.schoolName}
                </div>
              </div>
            </div>
          </div>

          {/* Lower Row */}
          <div className="grid grid-flow-row md:grid-flow-col gap-4 md:gap-2 py-5">
            <div className="p-1 flex flex-row gap-3 md:justify-center items-center">
              <div className="text-white px-2 py-5 border-r-2 border-white hover:text-fade">
                <Link to={"#"}>
                  <CallIcon fontSize="large" />
                </Link>
              </div>
              <div className="flex flex-col ">
                <p className="text-sm text-gray-500 font-semibold ">
                  Contact Us
                </p>
                <p className="font-semibold">
                  {schoolData?.contactDetails.phoneNumbers.map((item) => (
                    <>{item} ,</>
                  ))}
                </p>
              </div>
            </div>
            <div className="p-1 flex flex-row gap-3 md:justify-center items-center">
              <div className="text-white px-2 py-5 border-r-2 border-white hover:text-fade">
                <Link to={"#"}>
                  <EmailIcon fontSize="large" />
                </Link>
              </div>
              <div className="flex flex-col ">
                <p className="text-sm text-gray-500 font-semibold ">Email Us</p>
                <p className="font-semibold">
                  {schoolData?.contactDetails.email}
                </p>
              </div>
            </div>
            <div className="px-1 flex flex-row gap-3 md:justify-center items-center">
              <div className="text-white px-2 py-5 border-r-2 border-white hover:text-fade">
                <Link to={"#"}>
                  <LocationOnIcon fontSize="large" />
                </Link>
              </div>
              <div className="flex flex-col ">
                <p className="text-sm text-gray-500 font-semibold ">Address</p>
                <p className="font-semibold">
                  {schoolData?.schoolName}
                  {", "}
                  {schoolData?.schoolAddress}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Developer Info */}
      <div className="w-full p-1 md:p-2 bg-primary flex justify-center items-center">
        <p className="text-xs md:text-sm text-yellow-400">
          Developed by : Loric Software
        </p>
      </div>
    </>
  );
};

export default Footer;
