import SidebarMenu, { SidebarMenuBody } from "react-bootstrap-sidebar-menu";
import { BsMenuButton, BsCalendar, BsPencil } from "react-icons/bs";

type MenuProps = {
  showSideBar: boolean;
  setShowSideBar: (value: boolean) => void;
};

export default function AppMenu({ showSideBar, setShowSideBar }: MenuProps) {
  return (
    <SidebarMenu expand={showSideBar} expanded={showSideBar} className="w-40">
      <SidebarMenu.Header>
        <SidebarMenu.Toggle>
          <BsMenuButton size={40} />
        </SidebarMenu.Toggle>
      </SidebarMenu.Header>
      <SidebarMenu.Body>
        <SidebarMenu.Nav>
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Icon>
              <BsPencil size={40} />
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title>Events</SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
          <SidebarMenu.Nav.Link>
            <SidebarMenu.Nav.Icon>
              <BsCalendar size={40} />
            </SidebarMenu.Nav.Icon>
            <SidebarMenu.Nav.Title>Calender</SidebarMenu.Nav.Title>
          </SidebarMenu.Nav.Link>
        </SidebarMenu.Nav>
      </SidebarMenu.Body>
    </SidebarMenu>
  );
}
