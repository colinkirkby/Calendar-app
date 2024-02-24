import React, { useState, useMemo, useEffect } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./custom.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./pages/NewEvent";
import {
  useLocalStorage,
  useLocalStorageNotes
} from "./utilities/useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import HomePage from "./pages/HomePage";
import { Col, Layout, Row, Flex, Space, ConfigProvider, theme } from "antd";
import NotesWithTags from "./utilities/NotesWithTags";
import Note from "./pages/Note";
import EditNote from "./pages/EditNote";
import AppHeader from "./components/AppHeader";
import AppMenu from "./components/AppMenu";
import ViewAllPage from "./pages/ViewAllPage";
import CalendarPage from "./pages/CalenderPage";
import dayjs from "dayjs";
import { App as AntApp } from "antd";
import { Content } from "antd/es/layout/layout";

export type EventData = {
  title: string;
  tags: Tag[];
  body: string;
  date: dayjs.Dayjs;
  created: number;
};
export type Tag = {
  id: string;
  label: string;
};
export type Note = {
  id: string;
} & EventData;

export type RawEvent = {
  id: string;
} & RawEventData;

export type RawEventData = {
  title: string;
  body: string;
  date: dayjs.Dayjs;
  created: number;
  tagIds: string[];
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

function App() {
  const [notes, setNotes] = useLocalStorageNotes<RawEvent[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const [showSideBar, setShowSideBar] = useState(false);
  const isMobile = window?.screen?.width < 600;
  const [data, setData] = React.useState<ThemeData>(defaultData);

  const notesWithTags = useMemo(() => {
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

  function editTag(id: string, label: string) {
    setTags(prevTags => {
      return prevTags.map(tag => {
        return tag.id === id ? { ...tag, label } : tag;
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
        <Flex gap="middle" wrap="wrap">
          <Layout style={{ background: "#FFFFFFFF" }}>
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
                  <Route path="/" element={<HomePage />} />
                  <Route
                    path="/view"
                    element={
                      <ViewAllPage
                        notes={notesWithTags}
                        availableTags={tags}
                        onEdit={editTag}
                        onDelete={deleteTag}
                      />
                    }
                  />
                  <Route path="/calendar" element={<CalendarPage />} />
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
                    element={<NotesWithTags notes={notesWithTags} />}
                  >
                    <Route index element={<Note onDelete={onDeleteNote} />} />
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
        </Flex>
      </AntApp>
    </ConfigProvider>
  );
}

export default App;
