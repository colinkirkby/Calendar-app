import { useState, useEffect } from "react";
import NoteForm from "../components/EventForm";
import { EventData, Tag } from "../App";

type NewNoteProps = {
  onSubmit: (data: EventData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
};

export default function NewNote({
  onSubmit,
  onAddTag,
  availableTags
}: NewNoteProps) {
  return (
    <>
      <h1 className="mb-4"> New Event</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
