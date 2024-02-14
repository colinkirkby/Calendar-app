import { Card, Container, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./PageStyles.module.css";

export default function HomePage() {
  return (
    <Container>
      <Stack
        className="flex-wrap justify-content-center align-items-center"
        direction="horizontal"
        gap={4}
      >
        <Card
          as={Link}
          to="/calendar"
          className={`h-100 text-reset text-decoration-none ${styles.card}`}
        >
          <Card.Body>
            <h1>Calendar</h1>
          </Card.Body>
        </Card>

        <Card
          as={Link}
          to="/view"
          className={`h-100 text-reset text-decoration-none ${styles.card}`}
        >
          <Card.Body>
            <h1>Events</h1>
          </Card.Body>
        </Card>
      </Stack>
    </Container>
  );
}
