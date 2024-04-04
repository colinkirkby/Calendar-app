import { Card, Col, Layout, Row } from "antd";
import Image from "next/image";
import Page from "./[slug]";
import banner from "../assets/banner.png";

import LandingHeader from "src/components/Header/LandingHeader";
import { Content } from "antd/es/layout/layout";
import AppMenu from "src/components/Menus/AppMenu";
import { useEffect, useState } from "react";
import BannerRow from "src/components/LandingPage/BannerRow";
export default function HomePage() {
  const [isMobile, setIsMobile] = useState(false);

  const [windowSize, setWindowSize] = useState(1080);

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

  const isAuth = false;
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
        {!isMobile && isAuth && <AppMenu />}
        <Content
          style={{
            marginInline: "auto",
            justifyContent: "center",
            display: "flex",
            maxWidth: "1431px"
          }}
        >
          <Col>
            <Row>
              <Card title="Welcome To ScheduleForge"></Card>
              <Image
                src={banner}
                objectFit="contain"
                alt=""
                width={windowSize}
              />
            </Row>
            <BannerRow />
          </Col>
        </Content>
      </Row>
    </Layout>
  );
}
