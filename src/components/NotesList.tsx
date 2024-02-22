import { useEffect, useMemo, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import ReactSelect, { SingleValue } from "react-select";
import Select from "react-select";
import { Note, Tag } from "../App";
import { isValidDateValue } from "@testing-library/user-event/dist/utils";
import { NoteCard } from "./NoteCard.1";
export type SimplifiedNote = {
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

export default function EventsList({
  availableTags,
  notes: events
}: EventsListProps) {
  const sorterOptions = [
    { value: "Recent", label: "Recent" },
    { value: "Date", label: "Date" },
    { value: "Title", label: "Title" }
  ];
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [title, setTitle] = useState("");
  const [sort, setSort] = useState(sorterOptions[0]);
  const [originalOrder, setOriginalOrder] = useState(events);
  const filteredEvents = useMemo(() => {
    console.log(events);
    let filtered = events.filter(note => {
      return (
        (title === "" ||
          note.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every(tag =>
            note.tags.some(noteTag => noteTag.id === tag.id)
          ))
      );
    });
    let sorted = filtered;
    if (sort.label === "Date") {
      sorted = filtered.sort((a, b) => {
        const dateA = a.date ? new Date(a.date).getTime() : -Infinity; // Consider null as the earliest possible date
        const dateB = b.date ? new Date(b.date).getTime() : -Infinity;

        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;
        return 0;
      });
    } else if (sort.label === "Title") {
      sorted = filtered.sort((a, b) => {
        return a.title.localeCompare(b.title);
      });
    } else if (sort.label === "Recent") {
      sorted = filtered.sort((a, b) => {
        const dateA = a.created;
        const dateB = b.created;

        if (dateA > dateB) return -1;
        if (dateA < dateB) return 1;
        return 0;
      });
    }
    return sorted;
  }, [title, selectedTags, events, sort]);
  useEffect(() => {
    setOriginalOrder(events);
  }, [events]);

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
            {
              <Col>
                <Form.Group controlId="sort">
                  <Form.Label>Sort</Form.Label>
                  <Select
                    value={sort}
                    options={sorterOptions}
                    onChange={selectedOption => {
                      if (selectedOption !== null) {
                        setSort(selectedOption);
                      } else {
                        setSort(
                          sorterOptions.find(
                            option => option.value === "None"
                          ) || sorterOptions[0]
                        );
                      }
                    }}
                  />
                </Form.Group>
              </Col>
            }
          </Row>
        </Form>
      </Row>
      <Row className="g-3" xs={1} sm={2} lg={3}>
        {filteredEvents.map(note => {
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
