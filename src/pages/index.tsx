import { Card, Col, Layout, Row } from "antd";
import Image from "next/image";
import Page from "./[slug]";
import banner from "../assets/banner.png";
import comm from "../../public/landingAssets/comm.webp";

import LandingHeader from "src/components/Header/LandingHeader";
import { Content } from "antd/es/layout/layout";
import AppMenu from "src/components/Menus/AppMenu";
import { useEffect, useState } from "react";
import BannerRow, { BannerCard } from "src/components/LandingPage/BannerRow";

import {
  AnalyticsCardLeft,
  AnalyticsCardButtonLeft
} from "src/components/LandingPage/AnalyticsCard";
export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);

  const [windowSize, setWindowSize] = useState(1080);

  const img1Path = "../assets/banner.png";

  const bannerCards: BannerCard[] = [
    {
      title: "Streamlined Team Communication",
      content:
        "Keep your team in sync with real-time messaging and notifications. Collaborate efficiently with individual and group chat features",
      img: "landingAssets/comm.webp" // Replace with your actual image path
    },
    {
      title: "Actionable Workforce Insights",
      content:
        "Make informed decisions with comprehensive statistics on work patterns, staff performance, and schedule adherence.",
      img: "landingAssets/insight.webp" // Replace with your actual image path
    },
    {
      title: "Accurate Time Tracking",
      content:
        "Track work hours accurately and seamlessly. Integrate with payroll systems to ensure every minute is accounted for.",
      img: "landingAssets/clock.webp" // Replace with your actual image path
    }
    // ... more BannerCard objects
  ];

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);

      setWindowSize(window.innerWidth > 1440 ? 1440 : window.innerWidth);
    };

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {});
  return (
    <Layout
      style={{
        background: "#FFFFFFFF",
        margin: "auto",
        marginBottom: "30%"
      }}
    >
      <LandingHeader />
      <Row gutter={5} style={{ flexWrap: "nowrap" }}>
        <Content
          style={{
            marginInline: "auto",
            justifyContent: "center",
            display: "flex",
            maxWidth: "1431px",
            marginTop: "50px"
          }}
        >
          <Col>
            <AnalyticsCardButtonLeft
              imagePath="landingAssets/banner.png"
              headerText="Unlock the power of seamless scheduling with StreamLine"
              bodyText="Experience the future of workforce management with our Automated Schedule Planning. Save hours with a click, as StreamLine crafts your optimal staffing blueprint, balancing business needs with employee preferences"
              buttonText="Watch 2-Min Demo Video"
              buttonPath="https://link_to_demo_video"
              footerText=""
              leftAlign={true}
            />
            <BannerRow cards={bannerCards} />
          </Col>
        </Content>
      </Row>
    </Layout>
  );
}
