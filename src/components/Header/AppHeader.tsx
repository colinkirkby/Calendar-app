import { Flex, Layout, Row, Button, Image } from "antd"
import { BsMenuButtonWide } from "react-icons/bs"
import styles from "./AppHeader.module.css"
import { Header } from "antd/es/layout/layout"
import { Link } from "react-router-dom"
import { HomeFilled, HomeOutlined } from "@ant-design/icons"
import Icon from "@ant-design/icons/lib/components/Icon"

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 75,
  paddingInline: 18,
  lineHeight: "64px",
  backgroundColor: "#4096ff",
  display: "flex",
  alignItems: "center"
}

type HeaderProps = {
  isMobile: boolean
  showSideBar: boolean
  setShowSideBar: (value: boolean) => void
}
export default function AppHeader({
  isMobile,
  showSideBar,
  setShowSideBar
}: HeaderProps) {
  return (
    <div style={headerStyle}>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyItems: "end"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
            gap: "20px"
          }}
        >
          <img width={40} height={40} src="/icon.png" />
          <span>
            <h1 style={{ fontSize: "40px" }}>uFree</h1>
          </span>
        </div>
        {!isMobile && (
          <div
            style={{
              display: "flex",
              marginLeft: "80px",
              justifyContent: "end",
              gap: "80px",
              paddingTop: "20px",
              color: "#ffff"
            }}
          >
            <Link
              style={{
                textDecoration: "none",
                color: "#ffff"
              }}
              to="/"
            >
              Home
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "#ffff"
              }}
              to="/calendar"
            >
              Calendar
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "#ffff"
              }}
              to="/view"
            >
              Events
            </Link>
            <Link
              style={{
                textDecoration: "none",
                color: "#ffff"
              }}
              to="/new"
            >
              New Event
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
