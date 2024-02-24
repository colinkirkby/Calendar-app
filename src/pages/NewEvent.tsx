import { useState, useEffect } from "react";
import NoteForm from "../components/EventForm";
import { EventData, Tag } from "../App";
import { Content } from "antd/es/layout/layout";

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
    <Content style={{ padding: "20px 48px" }}>
      <h1 className="mb-4"> New Event</h1>
      <NoteForm
        onSubmit={onSubmit}
        onAddTag={onAddTag}
        availableTags={availableTags}
      />
    </Content>
  );
}
