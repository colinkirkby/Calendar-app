import { Button, Col, Typography } from "antd";
import { HomePageProps } from "../../oldPages/dashboard";
import { dateSort } from "../EventList/EventsList";
import { useEffect, useState } from "react";
import { CEvent } from "../../oldPages/App";
import { EventCard } from "../EventList/EventCard";
import dayjs from "dayjs";

export default function UpcomingEvents({ events, genNew }: HomePageProps) {
  const [upcomingEvents, setUpcomingEvents] = useState<CEvent[]>([]);
  const [gen, setGent] = useState<boolean>(false);
  const curr = dayjs();
  useEffect(() => {
    let tempEvents = events;
    setUpcomingEvents(
      tempEvents
        .sort(dateSort)
        .filter(cEvent => {
          return (
            cEvent.startDate.startOf("day").isAfter(curr.startOf("day")) ||
            cEvent.startDate.startOf("day").isSame(curr.startOf("day"))
          );
        })
        .slice(0, 5)
    );
    console.log(upcomingEvents);
  }, [events, gen]);

  return (
    <Col style={{ marginTop: "30px" }}>
      <h1>Upcoming Events</h1>
      {upcomingEvents.length > 0
        ? upcomingEvents.map(cEvent => {
            return (
              <div style={{ paddingTop: "5px" }}>
                <EventCard
                  id={cEvent.id}
                  title={cEvent.title}
                  tags={cEvent.tags}
                  startDate={cEvent.startDate}
                  endDate={cEvent.endDate}
                />
              </div>
            );
          })
        : !gen && (
            <Button
              onClick={() => {
                genNew(30);
                setGent(true);
              }}
            >
              {" "}
              Generate Demo Events
            </Button>
          )}
    </Col>
  );
}
