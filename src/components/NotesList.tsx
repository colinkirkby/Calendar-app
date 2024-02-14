import { useEffect, useMemo, useState } from "react";
import { Badge, Card, Col, Container, Form, Row, Stack } from "react-bootstrap";
import ReactSelect from "react-select";
import Select from "react-select";
import { Note, Tag } from "../App";
import { Link } from "react-router-dom";
import styles from "./NotesListCards.module.css";
import { isValidDateValue } from "@testing-library/user-event/dist/utils";
type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
  date: Date | null;
};
type EventsListProps = {
  availableTags: Tag[];
  notes: Note[];
};

function getEnumKeys<
  T extends string,
  TEnumValue extends string | number
>(enumVariable: { [key in T]: TEnumValue }) {
  return Object.keys(enumVariable) as Array<T>;
}

export default function EventsList({ availableTags, notes }: EventsListProps) {
  const sorter = ["Date", "Name", "None"];
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [sort, setSort] = useState("None");
  const filteredNotes = useMemo(() => {
    return notes.filter(note => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every(tag =>
            note.tags.some(noteTag => noteTag.id === tag.id)
          ))
      );
    });
  }, [title, selectedTags, notes]);

  return (
    <Container className="mb-4">
      <Row>
        <Form>
          <Row className="mb-4">
            <Col>
              <Form.Group controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  onChange={e => {
                    setTitle(e.target.value);
                  }}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="tags">
                <Form.Label>Tags</Form.Label>
                <ReactSelect
                  value={selectedTags.map(tag => {
                    return { label: tag.label, value: tag.id };
                  })}
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
            {/*  <Col>
              <Form.Group controlId="sort">
                <Form.Label>Sort</Form.Label>
                <Select value={sort} options={sorter} />
              </Form.Group>
            </Col>
                */}
          </Row>
        </Form>
      </Row>
      <Row className="g-3" xs={1} sm={2} lg={3}>
        {filteredNotes.map(note => {
          return (
            <Col key={note.id}>
              <NoteCard
                id={note.id}
                title={note.title}
                tags={note.tags}
                date={note.date}
              />
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

function NoteCard({ id, title, tags, date }: SimplifiedNote) {
  return (
    <Card
      as={Link}
      to={`/${id}`}
      className={`h-100 text-reset text-decoration-none ${styles.card}`}
    >
      <Card.Body>
        <Stack
          gap={2}
          className="align-items-center justify-content-center h-100"
        >
          {/*date !== null && (
            <Badge className="text-truncate">{date.toLocaleDateString()}</Badge>
          )*/}
          <span className="fs-5">{title}</span>
          {tags.length > 0 && (
            <Stack
              gap={1}
              className="justify-content-center flex-wrap"
              direction="horizontal"
            >
              {" "}
              {tags.map(tag => (
                <Badge key={tag.id} className="text-truncate">
                  {tag.label}
                </Badge>
              ))}
            </Stack>
          )}
        </Stack>
      </Card.Body>
    </Card>
  );
}
