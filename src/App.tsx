import React, { useState, useMemo, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./custom.scss";
import { Routes, Route, Navigate, Link } from "react-router-dom";
import NewNote from "./pages/NewEvent";
import {
  useLocalStorage,
  useLocalStorageNotes
} from "./utilities/useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import HomePage from "./pages/HomePage";
import {
  Col,
  Layout,
  Row,
  Flex,
  Space,
  ConfigProvider,
  theme,
  FloatButton
} from "antd";
import CEventsWithTags from "./utilities/NotesWithTags";
import Note from "./pages/Note";
import EditNote from "./pages/EditNote";
import AppHeader from "./components/Header/AppHeader";
import AppMenu from "./components/Menus/AppMenu";
import ViewAllPage from "./pages/ViewAllPage";
import CalendarPage from "./pages/CalenderPage";
import dayjs from "dayjs";
import { App as AntApp } from "antd";
import { Content } from "antd/es/layout/layout";
import {
  CalculatorFilled,
  CalendarFilled,
  HomeFilled,
  PlusOutlined,
  ProductOutlined
} from "@ant-design/icons";

export type EventData = {
  title: string;
  tags: Tag[];
  body: string;
  color: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  startTime: dayjs.Dayjs;
  endTime: dayjs.Dayjs;
  created: number;
  isMulti: boolean;
  renderIndex: number;
};
export type Tag = {
  id: string;
  color: string;
  label: string;
};
export type CEvent = {
  id: string;
} & EventData;

export type RawEvent = {
  id: string;
} & RawEventData;

export type RawEventData = {
  title: string;
  body: string;
  color: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
  startTime: dayjs.Dayjs;
  endTime: dayjs.Dayjs;
  created: number;
  tagIds: string[];
  isMulti: boolean;
  renderIndex: number;
};

type ThemeData = {
  borderRadius: number;
  colorPrimary: string;
  background: string;
  Button?: {
    colorPrimary: string;
    algorithm?: boolean;
  };
};

const defaultData: ThemeData = {
  borderRadius: 6,
  colorPrimary: "#1677ff",
  background: "#ffffff",
  Button: {
    colorPrimary: "#00B96B"
  }
};
var style: React.CSSProperties = {
  backgroundColor: "#F8F8F8",
  borderTop: "1px solid #E7E7E7",
  textAlign: "center",
  padding: "20px",
  position: "fixed",
  left: "0",
  bottom: "0",
  height: "110px",
  width: "100%"
};

function App() {
  const [notes, setNotes] = useLocalStorageNotes<RawEvent[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const [showSideBar, setShowSideBar] = useState(false);
  const isMobile = window?.screen?.width < 600;
  const [data, setData] = React.useState<ThemeData>(defaultData);

  const eventsWithTags = useMemo(() => {
    return notes.map(note => {
      return {
        ...note,
        tags: tags.filter(tag => note.tagIds.includes(tag.id))
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: EventData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }
      ];
    });
  }

  function onEditNote(id: string, { tags, ...data }: EventData) {
    setNotes(prevNotes => {
      return prevNotes.map(note => {
        return note.id === id
          ? { ...note, ...data, tagIds: tags.map(tag => tag.id) }
          : note;
      });
    });
  }

  function onDeleteNote(id: string) {
    setNotes(prevNotes =>
      prevNotes.filter(note => {
        return note.id !== id;
      })
    );
  }

  function addTag(tag: Tag) {
    setTags(prev => [...prev, tag]);
  }

  function editTag(id: string, label: string, color: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        return tag.id === id ? { ...tag, label, color } : tag;
      });
    });
  }
  function deleteTag(id: string) {
    setTags(prevTags =>
      prevTags.filter(tag => {
        return tag.id !== id;
      })
    );
  }

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.defaultAlgorithm
      }}
    >
      <AntApp>
        <Layout
          style={{
            background: "#FFFFFFFF",
            margin: "auto",
            marginBottom: "30%"
          }}
        >
          <AppHeader
            setShowSideBar={setShowSideBar}
            showSideBar={showSideBar}
          />
          <Row gutter={5} style={{ flexWrap: "nowrap" }}>
            {!isMobile && (
              <AppMenu
                setShowSideBar={setShowSideBar}
                showSideBar={showSideBar}
              />
            )}
            <Content
              style={{
                marginInline: "auto",
                justifyContent: "center",
                display: "flex",
                maxWidth: "1431px"
              }}
            >
              <Routes>
                <Route
                  path="/"
                  element={
                    <HomePage
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
                      onSubmit={onCreateNote}
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
            </Content>
            {!isMobile && <div style={{ width: 256 }}></div>}
          </Row>
        </Layout>
        {isMobile && (
          <>
            <div style={{ ...style }}></div>
            <Link to={"/"}>
              <FloatButton
                style={{ right: 45 + 90 + 90 + 90 }}
                icon={<HomeFilled />}
              />
            </Link>
            <Link to={"/calendar"}>
              <FloatButton
                style={{ right: 45 + 90 + 90 }}
                icon={<CalendarFilled />}
              />
            </Link>
            <Link to={"/new"}>
              <FloatButton style={{ right: 45 + 90 }} icon={<PlusOutlined />} />
            </Link>
            <Link to={"/view"}>
              <FloatButton style={{ right: 45 }} icon={<ProductOutlined />} />
            </Link>
          </>
        )}
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
