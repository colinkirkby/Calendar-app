import { Menu } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import { BsMenuButton, BsCalendar, BsPencil } from "react-icons/bs";
import { Link } from "react-router-dom";
import type { MenuProps } from "antd";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined
} from "@ant-design/icons";
type MenuValProps = {
  showSideBar: boolean;
  setShowSideBar: (value: boolean) => void;
};

export default function AppMenu({ showSideBar, setShowSideBar }: MenuValProps) {
  type MenuItem = Required<MenuProps>["items"][number];

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type
    } as MenuItem;
  }
  const items: MenuItem[] = [
    getItem(
      <Link style={{ textDecoration: "none" }} to="/calendar">
        Calendar
      </Link>,
      "1",
      <PieChartOutlined />
    ),
    getItem("Events", "sub1", <MailOutlined />, [
      getItem(
        <Link style={{ textDecoration: "none" }} to="/view">
          View All
        </Link>,
        "2"
      ),
      getItem(
        <Link style={{ textDecoration: "none" }} to="/new">
          New Event
        </Link>,
        "3"
      )
    ])
  ];
  return (
    <div style={{ minWidth: 256, maxWidth: 256, zIndex: 1000 }}>
      <Menu
        mode="inline"
        style={{ borderRadius: 10 }}
        defaultSelectedKeys={["1"]}
        defaultOpenKeys={["sub1"]}
        items={items}
      />
    </div>
  );
}
