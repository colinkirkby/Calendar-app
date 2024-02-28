import { Flex, Layout, Row, Button } from "antd";
import { BsMenuButtonWide } from "react-icons/bs";
import styles from "./AppHeader.module.css";
import { Header } from "antd/es/layout/layout";
import { Link } from "react-router-dom";
import { HomeFilled, HomeOutlined } from "@ant-design/icons";

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 100,
  paddingInline: 48,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
  display: "flex",
  alignItems: "center"
};

type HeaderProps = {
  showSideBar: boolean;
  setShowSideBar: (value: boolean) => void;
};
export default function AppHeader({
  showSideBar,
  setShowSideBar
}: HeaderProps) {
  return (
    <Layout>
      <Header style={headerStyle}>
        <Flex
          gap="middle"
          align="start"
          style={{ justifyContent: "center", alignItems: "center" }}
        >
          <Link to="/" style={{ textDecoration: "none" }}>
            <Button
              style={{
                minWidth: "70px",
                minHeight: "70px",
                marginLeft: "-35px"
              }}
              type="primary"
              size="large"
              onClick={() => {}}
              icon={<HomeFilled style={{ fontSize: "200%" }} />}
            ></Button>
          </Link>
          <span>
            <h1>Calendar</h1>
          </span>
        </Flex>
      </Header>
    </Layout>
  );
}
