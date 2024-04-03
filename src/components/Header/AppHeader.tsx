import { Flex, Layout, Row, Button, Image } from "antd";
import { BsMenuButtonWide } from "react-icons/bs";
import styles from "./AppHeader.module.css";
import { Header } from "antd/es/layout/layout";
import Link from "next/link";
import { HomeFilled, HomeOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/Icon";

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 100,
  paddingInline: 28,
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
          <Image preview={false} width={70} height={70} src="/icon.png"></Image>
          <span>
            <h1 style={{ fontSize: "40px" }}>uFree</h1>
          </span>
        </Flex>
      </Header>
    </Layout>
  );
}
