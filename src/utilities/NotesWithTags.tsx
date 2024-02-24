import { Navigate, Outlet, useOutletContext, useParams } from "react-router";
import { CEvent } from "../App";

type NoteLayoutProps = {
  notes: CEvent[];
};

export function useNote() {
  return useOutletContext<CEvent>();
}

export default function NotesWithTags({ notes }: NoteLayoutProps) {
  const { id } = useParams();
  const note = notes.find(n => n.id === id);
  if (note == null) return <Navigate to="/" replace />;
  return <Outlet context={note}></Outlet>;
}
