import React, { useState, useMemo } from "react";
import logo from "./logo.svg";
import "./App.css";
import "./custom.scss";
import { Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./pages/NewEvent";
import { useLocalStorage } from "./utilities/useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import HomePage from "./pages/HomePage";
import { Col, Container, Row, Stack } from "react-bootstrap";
import NotesWithTags from "./utilities/NotesWithTags";
import Note from "./pages/Note";
import EditNote from "./pages/EditNote";
import AppHeader from "./components/AppHeader";
import AppMenu from "./components/AppMenu";
import ViewAllPage from "./pages/ViewAllPage";
import CalendarPage from "./pages/CalenderPage";

export type EventData = {
  title: string;
  tags: Tag[];
  body: string;
  date: Date | null;
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
  date: Date | null;
  tagIds: string[];
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawEvent[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
  const [showSideBar, setShowSideBar] = useState(false);

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
    <Container
      className="my-4"
      style={{
        backgroundColor: "#EDF5E1",
        borderRadius: "20px",
        padding: "10px 10px 200px 10px"
      }}
    >
      <Stack direction="horizontal" style={{}}>
        <AppMenu setShowSideBar={setShowSideBar} showSideBar={showSideBar} />
        <Stack gap={4}>
          <AppHeader
            setShowSideBar={setShowSideBar}
            showSideBar={showSideBar}
          />
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
        </Stack>
      </Stack>
    </Container>
  );
}

export default App;
