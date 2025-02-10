import { useEffect, useState } from "react";
import AboutUsBlock from "../components/homePage/AboutUsBlock";
import schoolLogo from "../images/apex_international_logo.jpg";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { SchoolInfo } from "../types/schoolInfo";
import NoticeBoard from "../components/homePage/NoticeBoard";
import { Link } from "react-router-dom";
import photoBanner from "../images/bannerPhoto.jpg";
import videoBanner from "../images/bannerVideo.jpg";

export interface aboutUsType {
  inspirationalQuote: {
    inspirationalQuoteAuthor: string;
    inspirationalQuoteMessage: string;
  };
  messages: {
    messageBy: string;
    messageContent: string;
    messageTitle: string;
    highlightedMessage: string;
  }[];
}

const AboutUsPage = () => {
  const [aboutusInfo, setAboutusInfo] = useState<aboutUsType | null>(null);
  const [schoolInfo, setSchoolInfo] = useState<SchoolInfo | null>(null);

  useEffect(() => {
    getAboutusInfo();
  }, []);

  const getAboutusInfo = async () => {
    try {
      console.log("Get School Info");

      const dataRef = doc(db, "WEBSITE_CONFIG", "websiteConfig");
      const docSnap = await getDoc(dataRef);
      if (docSnap.exists()) {
        setSchoolInfo(docSnap.data() as SchoolInfo);
        const data = docSnap.data() as SchoolInfo;
        setAboutusInfo(data.aboutUs);
      } else {
        console.log("No such document found");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="max-w-[1200px] flex flex-col mx-auto">
        <AboutUsBlock />

        <div className="flex flex-col md:flex-row gap-4 my-7 p-7">
          {/* Inspirational Quote */}
          <div className="w-full md:w-[25%] flex flex-col items-end">
            <div className="h-24 w-24 mb-3 bg-cover flex mx-auto">
              <img src={schoolLogo} alt="school_logo" />
            </div>
            <div className="px-3 py-3 bg-yellow-100 rounded-lg">
              <p className="text-xl text-center my-5">Inspirational Quote</p>
              <p className="text-justify">
                {aboutusInfo?.inspirationalQuote.inspirationalQuoteMessage}
              </p>
              <p className="my-3">
                -{aboutusInfo?.inspirationalQuote.inspirationalQuoteAuthor}
              </p>
            </div>
          </div>

          {/* Manager Message */}
          <div className="w-full md:w-[50%] flex flex-col items-center">
            {aboutusInfo?.messages.map((item, index) => (
              <div key={index} className="mb-10">
                <p className="py-1 mb-2 text-2xl text-center font-extrabold bg-[#ffebcd] text-[#8B0000] border-[1px] border-[#1d3989]">
                  {item.messageTitle}
                </p>
                <img
                  src={schoolLogo}
                  className={`${
                    index % 2 == 0 ? "float-right" : "float-left"
                  } m-2 border border-black max-h-[350px] max-w-[350px] bg-cover`}
                />
                <p className="text-sm md:text-base text-justify px-7">
                  {item.messageContent}
                </p>
                <p className="my-2 text-sm md:text-base text-justify px-7 font-bold">
                  {item.highlightedMessage}
                </p>
                <p className="mt-5 text-sm md:text-base px-7 font-bold">
                  ({item.messageBy})
                </p>
                <p className="text-sm md:text-base px-7">
                  {schoolInfo?.schoolName}
                </p>
              </div>
            ))}
          </div>

          {/* Notice Board */}
          <div className="w-full md:w-[25%]">
            <div>
              <p className="py-1 mb-2 text-2xl text-center font-extrabold bg-[#cdefff] text-[#1d3989] border-[1px] border-[#1d3989]">
                Notice Board
              </p>
              <NoticeBoard />
            </div>
            <div className="my-10 flex flex-col gap-3">
              <Link to={"/photogallery"}>
                <img src={photoBanner} alt="photoBanner" />
              </Link>
              <Link to={"/videogallery"}>
                <img src={videoBanner} alt="videoBanner" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AboutUsPage;
