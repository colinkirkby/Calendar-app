import { Button, Col, Typography } from "antd"
import { HomePageProps } from "../../pages/HomePage"
import { dateSort } from "../EventList/EventsList"
import { useEffect, useState } from "react"
import { CEvent } from "../../App"
import { EventCard } from "../EventList/EventCard"
import dayjs from "dayjs"

export default function UpcomingEvents({ events, genNew }: HomePageProps) {
  const [upcomingEvents, setUpcomingEvents] = useState<CEvent[]>([])
  const [gen, setGent] = useState<boolean>(false)
  const curr = dayjs()
  useEffect(() => {
    let tempEvents = events
    setUpcomingEvents(
      tempEvents
        .sort(dateSort)
        .filter(cEvent => {
          return (
            cEvent.startDate.startOf("day").isAfter(curr.startOf("day")) ||
            cEvent.startDate.startOf("day").isSame(curr.startOf("day"))
          )
        })
        .slice(0, 5)
    )
    console.log(upcomingEvents)
  }, [events, gen])

  return (
    <div
      style={{
        width: "80%",
        marginTop: "30px",
        display: "flex",
        flexDirection: "column"
      }}
    >
      <h1>Upcoming Events</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingTop: "5px",
          gap: "10px",

          flexWrap: "wrap",
          justifyContent: "space-around"
        }}
      >
        {upcomingEvents.length > 0
          ? upcomingEvents.map(cEvent => {
              return (
                <EventCard
                  id={cEvent.id}
                  title={cEvent.title}
                  tags={cEvent.tags}
                  startDate={cEvent.startDate}
                  endDate={cEvent.endDate}
                />
              )
            })
          : !gen && (
              <Button
                onClick={() => {
                  genNew(30)
                  setGent(true)
                }}
              >
                {" "}
                Generate Demo Events
              </Button>
            )}
      </div>
    </div>
  )
}
