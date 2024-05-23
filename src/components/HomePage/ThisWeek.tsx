import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { HomePageProps } from "../../pages/HomePage"
import { CEvent } from "../../App"
import EventsList, { dateSort } from "../EventList/EventsList"
import dayjs from "dayjs"
import isoWeek from "dayjs/plugin/isoWeek"
import { Badge, Card, Col, Flex, Row, Tag } from "antd"
import TagRender from "../Tags/TagRender"
import styled from "styled-components"
dayjs.extend(isoWeek)
const desktopStyle: React.CSSProperties = {
  width: "150px",
  height: "200px",
  borderRadius: "0px"
}
const mobileStyle: React.CSSProperties = {
  width: "50px",
  height: "200px",
  padding: "-25px",
  borderRadius: "0px"
}
export type DayWithEvents = {
  date: dayjs.Dayjs
  cEvents: CEvent[]
  offset: number
}

function getCurrentWeekDays(): DayWithEvents[] {
  let days: DayWithEvents[] = []
  const startOfWeek = dayjs().startOf("week")

  for (let i = 0; i < 7; i++) {
    let day: DayWithEvents = {
      date: startOfWeek.add(i, "day"),
      cEvents: [], // assuming you'll populate this later
      offset: 0
    }

    days.push(day)
  }

  return days
}

export function filterDatesInCurrentWeek(events: CEvent[]) {
  const startOfWeek = dayjs().startOf("week")
  const endOfWeek = dayjs().endOf("week")

  return events
    .filter(cEvent => {
      const start = dayjs(cEvent.startDate).startOf("day")
      const end = dayjs(cEvent.endDate).endOf("day")
      return (
        (start.isAfter(startOfWeek) && start.isBefore(endOfWeek)) ||
        start.isSame(startOfWeek) ||
        start.isSame(endOfWeek) ||
        (end.isAfter(startOfWeek) && end.isBefore(endOfWeek)) ||
        end.isSame(startOfWeek) ||
        end.isSame(endOfWeek)
      )
    })
    .sort(dateSort)
}

export default function ThisWeek({
  events,
  availableTags,
  isMobile,
  setActiveEvent,
  setShowModal
}: HomePageProps) {
  const [eventsThisWeek, setEventsThisWeek] = useState<CEvent[]>()
  const [weekArray, setWeekArray] = useState<DayWithEvents[]>([])
  const styles = isMobile ? mobileStyle : desktopStyle
  useEffect(() => {
    let newEventsThisWeek = filterDatesInCurrentWeek(events)
    const indexedEventsThisWeek = newEventsThisWeek.map((cEvent, index) => {
      let newRend = 0
      for (var i = 0; i < index; i++) {
        if (newEventsThisWeek[i].endDate.isAfter(cEvent.startDate)) {
          cEvent.renderIndex = newEventsThisWeek[i].renderIndex + 1
        }
      }
      return { ...cEvent, renderIndex: newRend }
    })
    console.log(indexedEventsThisWeek)
    let newWeekArray = getCurrentWeekDays().map(day => {
      return {
        ...day,
        cEvents: newEventsThisWeek.filter(
          cEvent => dayIsInEventRange(cEvent, day) // Make sure to compare only the day, not time
        )
      }
    })
    let offset = 0

    setEventsThisWeek(newEventsThisWeek) // Now set the events for the week
    setWeekArray(newWeekArray)
  }, [events])
  return (
    <Col style={{ marginTop: "30px" }}>
      <h1>This Week</h1>
      <Row gutter={16}>
        {weekArray.map(day => {
          return (
            <Card
              bordered={!isMobile}
              style={styles}
              size={"small"}
              title={
                isMobile
                  ? day.date.format("DD  ").toString()
                  : day.date.format("ddd, DD MMM ").toString()
              }
            >
              <TagRender
                setActiveEvent={setActiveEvent}
                setShowModal={setShowModal}
                day={day}
                isMobile={isMobile}
                isWeekView={true}
              />
            </Card>
          )
        })}
      </Row>
    </Col>
  )
}
function dayIsInEventRange(cEvent: CEvent, day: DayWithEvents): unknown {
  return (
    cEvent.startDate.isSame(day.date, "day") ||
    cEvent.endDate.isSame(day.date, "day") ||
    (cEvent.endDate.isAfter(day.date, "day") &&
      cEvent.startDate.isBefore(day.date, "day"))
  )
}
