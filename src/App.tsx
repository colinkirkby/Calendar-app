import React, { useState, useMemo } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Navigate } from "react-router-dom";
import NewNote from "./NewNote";
import { useLocalStorage } from "./useLocalStorage";
import { v4 as uuidV4 } from "uuid";
import HomePage from "./HomePage";
import { Container } from "react-bootstrap";
import NotesWithTags from "./NotesWithTags";
import Note from "./Note";
import EditNote from "./EditNote";

export type NoteData = {
  title: string;
  tags: Tag[];
  body: string;
};
export type Tag = {
  id: string;
  label: string;
};
export type Note = {
  id: string;
} & NoteData;

export type RawNote = {
  id: string;
} & RawNoteData;

export type RawNoteData = {
  title: string;
  body: string;
  tagIds: string[];
};

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", []);
  const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);

  const notesWithTags = useMemo(() => {
    return notes.map(note => {
      return {
        ...note,
        tags: tags.filter(tag => note.tagIds.includes(tag.id))
      };
    });
  }, [notes, tags]);

  function onCreateNote({ tags, ...data }: NoteData) {
    setNotes(prevNotes => {
      return [
        ...prevNotes,
        { ...data, id: uuidV4(), tagIds: tags.map(tag => tag.id) }
      ];
    });
  }

  function onEditNote(id: string, { tags, ...data }: NoteData) {
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
    <Container className="my-4">
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              notes={notesWithTags}
              availableTags={tags}
              onEdit={editTag}
              onDelete={deleteTag}
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
        <Route path="/:id" element={<NotesWithTags notes={notesWithTags} />}>
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
    </Container>
  );
}

export default App;
