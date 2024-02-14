import { Button, Col, Form, FormLabel, Row, Stack } from "react-bootstrap";
import CreatableReactSelect from "react-select/creatable";
import { SelectDatepicker } from "react-select-datepicker";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useRef, useState, useCallback, useEffect } from "react";
import { EventData, Tag } from "../App";
import { v4 as uuidV4 } from "uuid";

type NoteFormProps = {
  onSubmit: (data: EventData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<EventData>;

export default function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  tags = [],
  body = "",
  date = null
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [newDate, setDate] = useState<Date | null>(date);
  useEffect(() => {});
  const onDateChange = useCallback((value: Date | null) => {
    setDate(value);
  }, []);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    onSubmit({
      title: titleRef.current!.value,
      body: textAreaRef.current!.value,
      tags: selectedTags,
      date: newDate
    });
    navigate("/view");
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
          <Col>
            <Form.Group controlId=" title">
              <Form.Label>Title</Form.Label>
              <Form.Control ref={titleRef} required defaultValue={title} />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group controlId="tags">
              <Form.Label>Tags</Form.Label>
              <CreatableReactSelect
                value={selectedTags.map(tag => {
                  return { label: tag.label, value: tag.id };
                })}
                onCreateOption={(label: any) => {
                  const newTag = { id: uuidV4(), label };
                  onAddTag(newTag);
                  setSelectedTags(prevTags => [...prevTags, newTag]);
                }}
                options={availableTags.map(tag => {
                  return {
                    label: tag.label,
                    value: tag.id
                  };
                })}
                onChange={tags => {
                  setSelectedTags(
                    tags.map(tag => {
                      return { label: tag.label, id: tag.value };
                    })
                  );
                }}
                isMulti
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>body</Form.Label>
            <Form.Control
              ref={textAreaRef}
              required
              as="textarea"
              rows={15}
              defaultValue={body}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Date</Form.Label>
            <SelectDatepicker
              selectedDate={newDate}
              onDateChange={onDateChange}
            />
          </Form.Group>
        </Row>
        <Stack direction="horizontal" gap={2} className="justify-end-content">
          <Button type="submit" variant="primary">
            Save
          </Button>
          <Link to="/view">
            <Button type="button" variant="outline-secondary">
              cancel
            </Button>
          </Link>
          <Button type="reset" variant="outline-secondary">
            Clear
          </Button>
        </Stack>
      </Stack>
    </Form>
  );
}
