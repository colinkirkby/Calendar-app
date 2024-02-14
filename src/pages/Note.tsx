import {
  Badge,
  Button,
  Col,
  Container,
  Modal,
  ModalBody,
  Row,
  Stack
} from "react-bootstrap";
import { useNote } from "../utilities/NotesWithTags";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ReactMarkDown from "react-markdown";
import { useState } from "react";
type NoteProps = {
  onDelete: (id: string) => void;
};
type ModalProps = {
  show: boolean;
  handleClose: () => void;
};

export default function Note({ onDelete }: NoteProps) {
  const navigate = useNavigate();
  const note = useNote();
  const [showDelete, setShowDelete] = useState(false);

  function handleDelete() {
    onDelete(note.id);
    navigate("/");
  }

  return (
    <>
      <Row className="allign-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          <Stack gap={1} className=" flex-wrap" direction="horizontal">
            {" "}
            {note.tags.map(tag => (
              <Badge key={tag.id} className="text-truncate">
                {tag.label}
              </Badge>
            ))}
          </Stack>
        </Col>
        <Col xs="auto">
          <Stack gap={3} direction="horizontal">
            <Link to="edit">
              <Button variant="primary ">Edit</Button>
            </Link>
            <Link to="..">
              <Button type="button" variant="secondary">
                Back
              </Button>
            </Link>

            <Button variant="danger" onClick={() => setShowDelete(true)}>
              Delete
            </Button>
          </Stack>
        </Col>
      </Row>
      <Row>
        <ReactMarkDown>{note.body}</ReactMarkDown>
      </Row>
      <DeleteModel show={showDelete} handleClose={() => setShowDelete(false)} />
    </>
  );
  function DeleteModel({ show, handleClose }: ModalProps) {
    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> Delete Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container className="mb-4 align-items-center justify-content-center">
            <p>Are You Sure You Want To Delete This Note</p>
            <Stack
              gap={2}
              direction="horizontal"
              className="mb-4 align-items-center justify-content-center"
            >
              <Button variant="danger" onClick={handleDelete}>
                Delete
              </Button>
              <Button
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </Button>
            </Stack>
          </Container>
        </Modal.Body>
      </Modal>
    );
  }
}
