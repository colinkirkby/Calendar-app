import { Badge, Card, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./NotesListCards.module.css";
import { SimplifiedNote } from "./NotesList";

export function NoteCard({ id, title, tags, date }: SimplifiedNote) {
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
          {date !== null && (
            <Badge className="text-truncate">{date.toLocaleDateString()}</Badge>
          )}
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
