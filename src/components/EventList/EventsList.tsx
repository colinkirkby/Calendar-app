import { useEffect, useMemo, useState } from "react";

import ReactSelect, { SingleValue } from "react-select";
import Select from "react-select";
import { CEvent, Tag } from "../../App";
import { isValidDateValue } from "@testing-library/user-event/dist/utils";
import { EventCard } from "./EventCard";
import { Layout, Form, Row, Col, Input, Space, Flex } from "antd";
import dayjs from "dayjs";
import { Content } from "antd/es/layout/layout";
export type SimplifiedNote = {
  tags: Tag[];
  title: string;
  id: string;
  startDate: dayjs.Dayjs;
  endDate: dayjs.Dayjs;
};
type EventsListProps = {
  availableTags: Tag[];
  events: CEvent[];
};

function getEnumKeys<
  T extends string,
  TEnumValue extends string | number
>(enumVariable: { [key in T]: TEnumValue }) {
  return Object.keys(enumVariable) as Array<T>;
}
export const dateSort = (a: CEvent, b: CEvent): number => {
  return a.startDate.diff(b.startDate);
};

export default function EventsList({
  availableTags,
  events: events
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
    let filtered = events.filter(event => {
      return (
        (title === "" ||
          event.title.toLowerCase().includes(title.toLowerCase())) &&
        (selectedTags.length === 0 ||
          selectedTags.every(tag =>
            event.tags.some(noteTag => noteTag.id === tag.id)
          ))
      );
    });
    let sorted = filtered;
    if (sort.label === "Date") {
      sorted = filtered.sort(dateSort);
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
    <Content>
      <Form>
        <Row
          className="mb-4"
          gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
          justify="end"
        >
          <Col flex="auto">
            <Form.Item
              name="title"
              label="Title"
              style={{ minWidth: "35vh", maxWidth: "35vh" }}
            >
              <Input
                type="text"
                onChange={e => {
                  setTitle(e.target.value);
                }}
              />
            </Form.Item>
          </Col>
          <Col flex={4}>
            <Form.Item
              name="tags"
              label="Tags"
              style={{ minWidth: "35vh", maxWidth: "35vh" }}
            >
              <ReactSelect
                value={selectedTags.map(tag => {
                  return { label: tag.label, value: tag.id, color: tag.color };
                })}
                options={availableTags.map(tag => {
                  return {
                    label: tag.label,
                    value: tag.id,
                    color: tag.color
                  };
                })}
                onChange={tags => {
                  setSelectedTags(
                    tags.map(tag => {
                      return {
                        label: tag.label,
                        id: tag.value,
                        color: tag.color
                      };
                    })
                  );
                }}
                isMulti
              />
            </Form.Item>
          </Col>

          <Col flex={2}>
            <Form.Item
              name="sort"
              label="Sort"
              style={{ minWidth: "20vh", maxWidth: "20vh" }}
            >
              <Select
                value={sort}
                options={sorterOptions}
                onChange={selectedOption => {
                  if (selectedOption !== null) {
                    setSort(selectedOption);
                  } else {
                    setSort(
                      sorterOptions.find(option => option.value === "None") ||
                        sorterOptions[0]
                    );
                  }
                }}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>

      <Flex gap="middle" wrap="wrap">
        {filteredEvents.map(cEvent => {
          return (
            <EventCard
              id={cEvent.id}
              title={cEvent.title}
              tags={cEvent.tags}
              startDate={cEvent.startDate}
              endDate={cEvent.endDate}
            />
          );
        })}
      </Flex>
    </Content>
  );
}
