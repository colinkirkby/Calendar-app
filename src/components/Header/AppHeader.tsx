import { Flex, Layout, Row, Button, Image } from "antd"
import { BsMenuButtonWide } from "react-icons/bs"
import styles from "./AppHeader.module.css"
import { Header } from "antd/es/layout/layout"
import { Link } from "react-router-dom"
import { HomeFilled, HomeOutlined } from "@ant-design/icons"
import Icon from "@ant-design/icons/lib/components/Icon"
import { useState } from "react"

const headerStyle: React.CSSProperties = {
  textAlign: "center",
  color: "#fff",
  height: 68,
  paddingInline: 18,
  background: `linear-gradient(180deg, rgba(255, 255, 255, 0.15) 0%, rgba(0, 0, 0, 0.0) 110%), #4096ff`,
  boxShadow: "0 4px 5px 0 rgba(0,0,0,0.15)",
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
  const [activeIndex, setActiveIndex] = useState(0)
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
              flexDirection: "column",
              marginLeft: "80px",
              marginTop: "42px"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                marginLeft: "80px",
                justifyContent: "end",
                gap: "80px",

                color: "#ffff"
              }}
            >
              <Link
                style={{
                  textDecoration: "none",
                  color: "#ffff"
                }}
                to="/"
                onClick={() => {
                  setActiveIndex(-7)
                }}
              >
                Home
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#ffff"
                }}
                to="/calendar"
                onClick={() => {
                  setActiveIndex(92)
                }}
              >
                Calendar
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#ffff"
                }}
                to="/view"
                onClick={() => {
                  setActiveIndex(190)
                }}
              >
                Events
              </Link>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#ffff"
                }}
                to="/new"
                onClick={() => {
                  setActiveIndex(290)
                }}
              >
                New Event
              </Link>
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ width: "40px" }} />
              <div
                style={{
                  width: "25%",
                  backgroundColor: "#ffff",
                  height: "4px",
                  borderRadius: "2px",
                  transition: "transform .7s ease-in-out ",
                  transform: `translateY(0%) translateX(${activeIndex}%)`
                }}
              ></div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
