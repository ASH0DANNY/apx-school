import { useEffect, useState } from "react";
import { db } from "../../Firebase";
import { doc, getDoc } from "firebase/firestore";
import { SchoolInfo } from "../../types/schoolInfo";

const NoticeBoard = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [schoolData, setSchoolData] = useState<SchoolInfo | null>(null);
  const [noticeBoardContent, setNoticeBoardContent] = useState<
    { createdAt: Date; noticeContent: string }[]
  >([]);
  const messageHeight = 100;

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

  useEffect(() => {
    if (schoolData?.noticeBoard) {
      //sorting messages according to createdAt
      let sortedMessage = schoolData.noticeBoard
        .map((item) => ({
          createdAt: item.createdAt,
          noticeContent: item.noticeContent,
        }))
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
      console.log(sortedMessage);

      setNoticeBoardContent(sortedMessage);
    }
  }, [schoolData]);

  useEffect(() => {
    const interval = setInterval(() => {
      setScrollPosition((prev) => {
        if (!noticeBoardContent || prev <= -messageHeight) {
          return noticeBoardContent.length * messageHeight; // Reset to the bottom once the first message is scrolled
        }
        return prev - 1;
      });
    }, 35); // Adjust the speed of scroll here (lower is faster)

    return () => clearInterval(interval);
  }, [noticeBoardContent?.length]);

  return (
    <div className="relative overflow-hidden bg-secondary text-white h-56 p-4 rounded-md shadow-lg w-full max-w-3xl mx-auto">
      <div
        className="absolute w-full"
        style={{
          transform: `translateY(${scrollPosition}px)`,
          transition: "transform 0.1s linear",
        }}
      >
        {noticeBoardContent?.map((message, index) => (
          <div key={index} className="py-2 text-sm md:text-base font-medium">
            {message.noticeContent}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NoticeBoard;
