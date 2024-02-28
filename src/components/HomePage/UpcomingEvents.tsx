import { Col, Typography } from "antd";
import { HomePageProps } from "../../pages/HomePage";
import { dateSort } from "../EventList/EventsList";
import { useEffect, useState } from "react";
import { CEvent } from "../../App";
import { EventCard } from "../EventList/EventCard";

export default function UpcomingEvents({ events }: HomePageProps) {
  const [upcomingEvents, setUpcomingEvents] = useState<CEvent[]>([]);
  useEffect(() => {
    let tempEvents = events;
    setUpcomingEvents(tempEvents.sort(dateSort).slice(0, 5));
    console.log(upcomingEvents);
  }, events);

  return (
    <Col style={{ marginTop: "30px" }}>
      <h1>Upcoming Events</h1>
      {upcomingEvents.length > 0 &&
        upcomingEvents.map(cEvent => {
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
        })}
    </Col>
  );
}
