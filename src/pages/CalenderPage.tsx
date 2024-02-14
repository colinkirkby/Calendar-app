import { Button, Card, Container, Form, Stack } from "react-bootstrap";
import { useCallback, useState } from "react";
import { SelectDatepicker } from "react-select-datepicker";
const WeekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MonThs = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];
export default function CalendarPage() {
  const currentDate = new Date();

  const [selected, setSelectedDate] = useState<Date>(currentDate);

  const onDateChange = useCallback((value: Date | null) => {
    value && setSelectedDate(value);
  }, []);

  return (
    <Container className="m b-4 ">
      <Form>
        <Form.Group>
          <Form.Label>Date</Form.Label>
          <SelectDatepicker
            selectedDate={selected}
            onDateChange={onDateChange}
          />
        </Form.Group>
      </Form>
      <Stack
        className="flex-wrap "
        style={{ marginInline: "110px" }}
        direction="horizontal"
      >
        {[...Array(35)].map((e, i) => (
          <DateBox />
        ))}
      </Stack>
    </Container>
  );
}
function DateBox() {
  return (
    <Card style={{ minWidth: "150px", minHeight: "150px" }}>
      <Card.Img variant="top" src="holder.js/100px180" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
      </Card.Body>
    </Card>
  );
}
