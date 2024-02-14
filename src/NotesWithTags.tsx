import { Navigate, Outlet, useOutletContext, useParams } from "react-router";
import { Note } from "./App";

type NoteLayoutProps = {
  notes: Note[];
};

export function useNote() {
  return useOutletContext<Note>();
}

export default function NotesWithTags({ notes }: NoteLayoutProps) {
  const { id } = useParams();
  const note = notes.find(n => n.id === id);
  if (note == null) return <Navigate to="/" replace />;
  return <Outlet context={note}></Outlet>;
}
