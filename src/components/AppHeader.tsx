import { Button, Container, Row, Stack } from "react-bootstrap";
import { BsCalendar } from "react-icons/bs";
import styles from "./AppHeader.module.css";
type HeaderProps = {
  showSideBar: boolean;
  setShowSideBar: (value: boolean) => void;
};
export default function AppHeader({
  showSideBar,
  setShowSideBar
}: HeaderProps) {
  return (
    <Container>
      <Row className={styles.row}>
        <Stack gap={4} direction="horizontal">
          <Button
            onClick={() => {
              setShowSideBar(true);
            }}
          >
            <BsCalendar size={30} />
          </Button>
          <span>
            <h1>Calendar</h1>
          </span>
        </Stack>
      </Row>
    </Container>
  );
}
