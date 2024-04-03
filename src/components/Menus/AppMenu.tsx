import { Menu } from "antd";
import MenuItem from "antd/es/menu/MenuItem";
import { BsMenuButton, BsCalendar, BsPencil } from "react-icons/bs";
import Link from "next/link";
import type { MenuProps } from "antd";
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  HomeFilled,
  HomeOutlined,
  MailFilled,
  MailOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartFilled,
  PieChartOutlined,
  PlusCircleFilled,
  PlusOutlined,
  ProductOutlined
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
      <Link style={{ textDecoration: "none" }} href="/">
        Home
      </Link>,
      "1",
      <HomeOutlined />
    ),
    getItem(
      <Link style={{ textDecoration: "none" }} href="/calendar">
        Calendar
      </Link>,
      "2",
      <PieChartOutlined />
    ),
    getItem("Events", "sub1", <MailFilled />, [
      getItem(
        <Link style={{ textDecoration: "none" }} href="/view">
          View All
        </Link>,
        "3",
        <ProductOutlined />
      ),
      getItem(
        <Link style={{ textDecoration: "none" }} href="/new">
          New Event
        </Link>,
        "4",
        <PlusOutlined />
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
