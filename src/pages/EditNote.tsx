import { useState, useEffect } from "react";
import NoteForm from "../components/Forms/EventForm";
import { EventData, Tag } from "../App";
import { useEvent } from "../utilities/NotesWithTags";

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
  const cEvent = useEvent();
  return (
    <>
      <h1 className="mb-4"> Edit Event</h1>
      <NoteForm
        title={cEvent.title}
        body={cEvent.body}
        tags={cEvent.tags}
        startDate={cEvent.startDate}
        endDate={cEvent.endDate}
        startTime={cEvent.startTime}
        endTime={cEvent.endTime}
        color={cEvent.color}
        onSubmit={data => onSubmit(cEvent.id, data)}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </>
  );
}
