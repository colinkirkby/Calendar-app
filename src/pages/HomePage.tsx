import { Card, Container, Stack } from "react-bootstrap"
import { Link } from "react-router-dom"
import styles from "./PageStyles.module.css"
import { Content } from "antd/es/layout/layout"
import { Flex } from "antd"
import ThisWeek from "../components/HomePage/ThisWeek"
import UpcomingEvents from "../components/HomePage/UpcomingEvents"
import { CEvent, Tag } from "../App"
import { Dispatch, SetStateAction } from "react"
export type HomePageProps = {
  onDelete: (id: string) => void
  genNew: (value: number) => void
  events: CEvent[]
  availableTags: Tag[]
  isMobile: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  setActiveEvent: Dispatch<SetStateAction<CEvent | null>>
}
export default function HomePage({
  genNew,
  events,
  onDelete,
  availableTags,
  isMobile,
  setActiveEvent,
  setShowModal
}: HomePageProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        margin: "auto",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <ThisWeek
        setShowModal={setShowModal}
        setActiveEvent={setActiveEvent}
        genNew={genNew}
        isMobile={isMobile}
        events={events}
        onDelete={onDelete}
        availableTags={availableTags}
      />
      <UpcomingEvents
        setShowModal={setShowModal}
        setActiveEvent={setActiveEvent}
        genNew={genNew}
        isMobile={isMobile}
        events={events}
        onDelete={onDelete}
        availableTags={availableTags}
      />
    </div>
  )
}
