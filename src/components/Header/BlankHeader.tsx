import { Flex, Layout, Row, Button, Image } from "antd";
import { BsMenuButtonWide } from "react-icons/bs";
import styles from "./AppHeader.module.css";
import { Header } from "antd/es/layout/layout";
import Link from "next/link";
import { HomeFilled, HomeOutlined } from "@ant-design/icons";
import Icon from "@ant-design/icons/lib/components/Icon";

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "rgb(20 121 209)",
  height: 150,
  paddingInline: 28,
  lineHeight: "64px",
  backgroundColor: "#FFF",
  display: "flex",
  alignItems: "center",
  padding: 10
};

export default function BlankHeader() {
  return (
    <Layout>
      <Header style={headerStyle}>
        <Flex
          gap="middle"
          align="flex-end"
          justify="space-between"
          style={{
            alignItems: "center",
            width: "1640px",
            margin: "auto",
            paddingRight: "40px"
          }}
        >
          <Link href={"/"}>
            <Flex
              gap="middle"
              align="start"
              style={{ justifyContent: "center", alignItems: "center" }}
            >
              <Image
                preview={false}
                width={100}
                height={100}
                src="/iconShadow.png"
              ></Image>

              <span>
                <h1 style={{ fontSize: "40px" }}>StreamLine</h1>
              </span>
            </Flex>
          </Link>
        </Flex>
      </Header>
    </Layout>
  );
}
