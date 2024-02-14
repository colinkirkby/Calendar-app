import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import { BsMenuButton, BsCalendar, BsPencil } from "react-icons/bs";
import { Link } from "react-router-dom";

type MenuProps = {
  showSideBar: boolean;
  setShowSideBar: (value: boolean) => void;
};

export default function AppMenu({ showSideBar, setShowSideBar }: MenuProps) {
  return (
    <Sidebar
      onBackdropClick={() => setShowSideBar(false)}
      toggled={showSideBar}
      breakPoint="always"
    >
      <Menu>
        <MenuItem component={<Link to="/" />}> Home </MenuItem>
        <SubMenu label="Events">
          <MenuItem component={<Link to="/view" />}> View All </MenuItem>
          <MenuItem component={<Link to="/new" />}> New Event </MenuItem>
        </SubMenu>
        <MenuItem component={<Link to="/calendar" />}> Calendar </MenuItem>
      </Menu>
    </Sidebar>
  );
}
