import { Stack } from "react-bootstrap";
import Card from "antd/es/card/Card";
import { Link, Navigate, useNavigate } from "react-router-dom";
import styles from "./NotesListCards.module.css";
import { SimplifiedNote } from "./EventsList";
import { Flex, Badge, Button, Tag } from "antd";

export function NoteCard({ id, title, tags, date }: SimplifiedNote) {
  const navigate = useNavigate();
  return (
    <Card
      style={{ width: 300, height: 200 }}
      title={title}
      hoverable
      onClick={() => {
        navigate(`/${id}`);
      }}
      extra={
        <Tag className="text-truncate" color="blue" bordered={false}>
          {date.format("DD/MM/YYYY").toString()}
        </Tag>
      }
    >
      {tags.length > 0 && (
        <Flex gap="small" wrap="wrap">
          {" "}
          {tags.map(tag => (
            <Tag
              bordered={false}
              key={tag.id}
              className="text-truncate"
              color="orange"
            >
              {tag.label}
            </Tag>
          ))}
        </Flex>
      )}
    </Card>
  );
}
