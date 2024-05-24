import React, { useState, useMemo, useEffect } from "react"
import logo from "./logo.svg"
import "./App.css"
import "./custom.scss"
import { Routes, Route, Navigate, Link } from "react-router-dom"
import NewNote from "./pages/NewEvent"
import {
  useLocalStorage,
  useLocalStorageNotes
} from "./utilities/useLocalStorage"
import { v4 as uuidV4 } from "uuid"
import HomePage from "./pages/HomePage"
import {
  Col,
  Layout,
  Row,
  Flex,
  Space,
  ConfigProvider,
  theme,
  FloatButton
} from "antd"
import CEventsWithTags from "./utilities/NotesWithTags"
import Note from "./pages/Note"
import EditNote from "./pages/EditNote"
import AppHeader from "./components/Header/AppHeader"
import AppMenu from "./components/Menus/AppMenu"
import ViewAllPage from "./pages/ViewAllPage"
import CalendarPage from "./pages/CalenderPage"
import dayjs from "dayjs"
import { App as AntApp } from "antd"
import { Content } from "antd/es/layout/layout"
import {
  CalculatorFilled,
  CalendarFilled,
  HomeFilled,
  PlusOutlined,
  ProductOutlined
} from "@ant-design/icons"

export type EventData = {
  title: string
  tags: Tag[]
  body: string
  color: string
  startDate: dayjs.Dayjs
  endDate: dayjs.Dayjs
  startTime: dayjs.Dayjs
  endTime: dayjs.Dayjs
  created: number
  isMulti: boolean
  renderIndex: number
}
export type Tag = {
  id: string
  color: string
  label: string
}
export type CEvent = {
  id: string
} & EventData

export type RawEvent = {
  id: string
} & RawEventData

export type RawEventData = {
  title: string
  body: string
  color: string
  startDate: dayjs.Dayjs
  endDate: dayjs.Dayjs
  startTime: dayjs.Dayjs
  endTime: dayjs.Dayjs
  created: number
  tagIds: string[]
  isMulti: boolean
  renderIndex: number
}

type ThemeData = {
  borderRadius: number
  colorPrimary: string
  background: string
  Button?: {
    colorPrimary: string
    algorithm?: boolean
  }
}

const defaultData: ThemeData = {
  borderRadius: 6,
  colorPrimary: "#1677ff",
  background: "#ffffff",
  Button: {
    colorPrimary: "#00B96B"
  }
}
var style: React.CSSProperties = {
  backgroundColor: "#F8F8F8",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  zIndex: 12,
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "110px",
  width: "100%"
}

function App() {
  const [cEvents, setCEvents] = useLocalStorageNotes<RawEvent[]>("NOTES", [])
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", [])
  const [showSideBar, setShowSideBar] = useState(false)
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [data, setData] = React.useState<ThemeData>(defaultData)
  const [showModal, setShowModal] = useState<boolean>(false)
  const [activeEvent, setActiveEvent] = useState<CEvent | null>(null)
  useEffect(() => {
    const handleDeviceDetection = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileDev = /iphone|ipod|android|blackberry|windows phone/g.test(
        userAgent
      )
      console.log(userAgent)
      const isTablet =
        /(ipad|tablet|playbook|silk)|(android(?!.*mobile))/g.test(userAgent)

      if (isMobileDev || isTablet) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    }

    handleDeviceDetection()
    window.addEventListener("resize", handleDeviceDetection)

    return () => {
      window.removeEventListener("resize", handleDeviceDetection)
    }
  }, [])

  function generateRandomEvents(numberOfEvents: number) {
    const titles = [
      "Awesome Event",
      "Cool Gathering",
      "Fun Times",
      "Serious Meeting"
    ]
    const tags: Tag[] = [
      { id: "1", color: "#FF5733", label: "Education" },
      { id: "2", color: "#33FF57", label: "Fun" },
      { id: "3", color: "#3357FF", label: "Work" }
    ]
    for (var tag of tags) {
      addTag(tag)
    }
    const bodies = [
      "This is going to be a great event!",
      "Don't miss out on this!",
      "Be there or be square!"
    ]
    const colors = ["#FF5733", "#33FF57", "#3357FF", "#F333FF"]

    const events: EventData[] = []

    for (let i = 0; i < numberOfEvents; i++) {
      const startDate = dayjs().add(Math.floor(Math.random() * 120), "day") // Randomly in the next 4 months
      const endDate = startDate.add(Math.floor(Math.random() * 3), "day") // 0 to 2 days long event
      const startTime = startDate.add(Math.floor(Math.random() * 8), "hour") // Starts at a random time in the first day
      const endTime = endDate.add(Math.floor(Math.random() * 8), "hour") // Ends at a random time in the last day

      events.push({
        title: titles[Math.floor(Math.random() * titles.length)],
        body: bodies[Math.floor(Math.random() * bodies.length)],
        tags: [tags[Math.floor(Math.random() * tags.length)]], // Pick one random tag for simplicity
        color: colors[Math.floor(Math.random() * colors.length)],
        startDate,
        endDate,
        startTime,
        endTime,
        created: Date.now(),
        isMulti: !startDate.isSame(endDate, "day"),
        renderIndex: 0
      })
    }
    for (var cEvent of events) {
      onCreateCEvent(cEvent)
    }
  }

  const eventsWithTags = useMemo(() => {
    return cEvents.map(note => {
      return {
        ...note,
        tags: tags.filter(tag => note.tagIds.includes(tag.id))
      }
    })
  }, [cEvents, tags])

  function onCreateCEvent({ tags, ...data }: EventData) {
    setCEvents(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }
      ]
    })
  }

  function onEditNote(id: string, { tags, ...data }: EventData) {
    setCEvents(prevNotes => {
      return prevNotes.map(note => {
        return note.id === id
          ? { ...note, ...data, tagIds: tags.map(tag => tag.id) }
          : note
      })
    })
  }

  function onDeleteNote(id: string) {
    setCEvents(prevNotes =>
      prevNotes.filter(note => {
        return note.id !== id
      })
    )
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag])
  }

  function editTag(id: string, label: string, color: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        return tag.id === id ? { ...tag, label, color } : tag
      })
    })
  }
  function deleteTag(id: string) {
    setTags(prevTags =>
      prevTags.filter(tag => {
        return tag.id !== id
      })
    )
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm
      }}
    >
      <AntApp>
        <div
          style={{
            display: "flex",
            background: "#FFFFFFFF",
            margin: "auto",
            flexDirection: "column",

            justifyContent: "center"
          }}
        >
          <AppHeader
            isMobile={isMobile}
            setShowSideBar={setShowSideBar}
            showSideBar={showSideBar}
          />
          <div>
            <div
              style={
                isMobile
                  ? {
                      marginInline: "auto",

                      justifyContent: "center",
                      display: "flex",
                      maxWidth: "1431px",
                      padding: "10px",
                      boxShadow: "2px 4px 20px 0 rgba(0,0,0,0.1)",
                      borderBottomLeftRadius: "40px",
                      borderBottomRightRadius: "40px",
                      paddingBottom: "80px"
                    }
                  : {
                      marginInline: "auto",

                      justifyContent: "center",
                      display: "flex",
                      maxWidth: "1431px",
                      padding: "10px",
                      boxShadow: "2px 4px 20px 0 rgba(0,0,0,0.1)",
                      borderBottomLeftRadius: "40px",
                      borderBottomRightRadius: "40px",
                      paddingBottom: "40px"
                    }
              }
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <HomePage
                      setShowModal={setShowModal}
                      setActiveEvent={setActiveEvent}
                      genNew={generateRandomEvents}
                      isMobile={isMobile}
                      events={eventsWithTags}
                      onDelete={deleteTag}
                      availableTags={tags}
                    />
                  }
                />
                <Route
                  path="/view"
                  element={
                    <ViewAllPage
                      events={eventsWithTags}
                      availableTags={tags}
                      onEdit={editTag}
                      onDelete={deleteTag}
                    />
                  }
                />
                <Route
                  path="/calendar"
                  element={
                    <CalendarPage
                      setShowModal={setShowModal}
                      setActiveEvent={setActiveEvent}
                      isMobile={isMobile}
                      events={eventsWithTags}
                      onDelete={deleteTag}
                      availableTags={tags}
                    />
                  }
                />
                <Route
                  path="/new"
                  element={
                    <NewNote
                      onSubmit={onCreateCEvent}
                      onAddTag={addTag}
                      availableTags={tags}
                    />
                  }
                />
                <Route path="*" element={<Navigate to="/" />} />
                <Route
                  path="/:id"
                  element={<CEventsWithTags cEvents={eventsWithTags} />}
                >
                  <Route
                    index
                    element={
                      <Note isMobile={isMobile} onDelete={onDeleteNote} />
                    }
                  />
                  <Route
                    path="edit"
                    element={
                      <EditNote
                        onSubmit={onEditNote}
                        onAddTag={addTag}
                        availableTags={tags}
                      />
                    }
                  />
                </Route>
              </Routes>
            </div>
            {!isMobile && <div style={{ width: 256 }}></div>}
          </div>

          {isMobile && (
            <div
              style={{
                position: "fixed",
                bottom: "0",
                width: "100%",
                backgroundColor: "#ffff",
                color: "white",
                height: "8vh",
                textAlign: "center",
                padding: "10px 0"
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-around"
                }}
              >
                <Link to={"/"}>
                  <HomeFilled />
                </Link>
                <Link to={"/calendar"}>
                  <CalendarFilled />
                </Link>
                <Link to={"/new"}>
                  <PlusOutlined />
                </Link>
                <Link to={"/view"}>
                  <ProductOutlined />
                </Link>
              </div>
            </div>
          )}
        </div>
      </AntApp>
    </ConfigProvider>
  )
}

export default App
