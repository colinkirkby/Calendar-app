import { Button, Row, Stack } from "react-bootstrap";
import { BsCalendar } from "react-icons/bs";
type HeaderProps = {
  showSideBar: boolean;
  setShowSideBar: (value: boolean) => void;
};
export default function AppHeader({
  showSideBar,
  setShowSideBar
}: HeaderProps) {
  return (
    <Row>
      <Stack gap={4} direction="horizontal">
        <BsCalendar size={30} />
        <span>
          <h1>Calendar</h1>
        </span>
      </Stack>
    </Row>
  );
}
