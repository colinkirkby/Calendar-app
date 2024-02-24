import { useEffect, useState } from "react";
import { HomePageProps } from "../../pages/HomePage";
import { CEvent } from "../../App";
import EventsList, { dateSort } from "../EventsList";
import dayjs from "dayjs";
import isoWeek from "dayjs/plugin/isoWeek";
import { Badge, Card, Col, Flex, Row, Tag } from "antd";
dayjs.extend(isoWeek);

type DayWithEvents = {
  date: dayjs.Dayjs;
  cEvents: CEvent[];
};

function getCurrentWeekDays(): DayWithEvents[] {
  let days: DayWithEvents[] = [];
  const startOfWeek = dayjs().startOf("week");

  for (let i = 0; i < 7; i++) {
    let day: DayWithEvents = {
      date: startOfWeek.add(i, "day"),
      cEvents: [] // assuming you'll populate this later
    };

    days.push(day);
  }

  return days;
}

export function filterDatesInCurrentWeek(events: CEvent[]) {
  const startOfWeek = dayjs().startOf("week");
  const endOfWeek = dayjs().endOf("week");

  return events.filter(cEvent => {
    const current = dayjs(cEvent.date);
    return (
      (current.isAfter(startOfWeek) && current.isBefore(endOfWeek)) ||
      current.isSame(startOfWeek) ||
      current.isSame(endOfWeek)
    );
  });
}

export default function ThisWeek({ events, availableTags }: HomePageProps) {
  const [eventsThisWeek, setEventsThisWeek] = useState<CEvent[]>();
  const [weekArray, setWeekArray] = useState<DayWithEvents[]>([]);
  useEffect(() => {
    const newEventsThisWeek = filterDatesInCurrentWeek(events);

    const newWeekArray = getCurrentWeekDays().map(day => {
      return {
        ...day,
        cEvents: newEventsThisWeek.filter(
          cEvent => cEvent.date.isSame(day.date, "day") // Make sure to compare only the day, not time
        )
      };
    });

    setEventsThisWeek(newEventsThisWeek); // Now set the events for the week
    setWeekArray(newWeekArray);
  }, [events]);
  return (
    <Col style={{ marginTop: "30px" }}>
      <h1>This Week</h1>
      <Row gutter={16}>
        {weekArray.map(day => {
          return (
            <Card
              style={{ width: "150px" }}
              title={day.date.format("ddd, DD MMM ").toString()}
            >
              <Flex vertical>
                {day.cEvents.length > 0 &&
                  day.cEvents.map(cEvent => {
                    return (
                      <Tag
                        style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                      >
                        {cEvent.title}
                      </Tag>
                    );
                  })}
              </Flex>
            </Card>
          );
        })}
      </Row>
    </Col>
  );
}
