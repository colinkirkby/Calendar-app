import { useState, useEffect } from "react";
import NoteForm from "../components/EventForm";
import { EventData, Tag } from "../App";
import { useNote } from "../utilities/NotesWithTags";

type EditNoteProps = {
  onSubmit: (id: string, data: EventData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export default function EditNote({
  onSubmit,
  onAddTag,
  availableTags
}: EditNoteProps) {
  const note = useNote();
  return (
    <>
      <h1 className="mb-4"> Edit Event</h1>
      <NoteForm
        title={note.title}
        body={note.body}
        tags={note.tags}
        onSubmit={data => onSubmit(note.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
