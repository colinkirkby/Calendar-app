import {
  Container,
  Row,
  Stack,
  Col,
  Button,
  Modal,
  Card,
  Form
} from "react-bootstrap";
import { Note, Tag } from "../App";
import { Navigate, useNavigate, Link } from "react-router-dom";
import NotesList from "../components/NotesList";
import { FormEvent, useState } from "react";

type HomePageProps = {
  notes: Note[];
  availableTags: Tag[];
  onEdit: (id: string, label: string) => void;
  onDelete: (id: string) => void;
};
type ModalProps = {
  show: boolean;
  handleClose: () => void;
  availableTags: Tag[];
  onDelete: (id: string) => void;
  handleChange: (id: string, label: string) => void;
};

export default function HomePage({
  notes,
  availableTags,
  onEdit,
  onDelete
}: HomePageProps) {
  const [showEditTagsModel, setShowEditTags] = useState(false);
  return (
    <>
      <Row className="allign-items-center">
        <Col>
          <h1>Notes</h1>
        </Col>
        <Col xs="auto">
          <Stack gap={2} direction="horizontal">
            <Link to="/new">
              <Button variant="primary">New Note</Button>
            </Link>
            <Button
              onClick={() => {
                setShowEditTags(true);
              }}
              variant="outline-secondary"
            >
              Edit Tags
            </Button>
          </Stack>
        </Col>
      </Row>
      <Row>
        <NotesList availableTags={availableTags} notes={notes} />
      </Row>
      <EditTagsModel
        show={showEditTagsModel}
        handleClose={() => {
          setShowEditTags(false);
        }}
        availableTags={availableTags}
        onDelete={onDelete}
        handleChange={handleChange}
      />
    </>
  );
  function handleChange(label: string, id: string) {
    onEdit(id, label);
  }
}
function EditTagsModel({
  show,
  handleClose,
  availableTags,
  onDelete,
  handleChange
}: ModalProps) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Note</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Container className="mb-4 align-items-center justify-content-center">
          <Stack
            gap={2}
            className="mb-4 align-items-center justify-content-center"
          >
            <Form>
              {availableTags.map(tag => (
                <Row key={tag.id}>
                  {" "}
                  {/* Here's where the key prop is used */}
                  <Stack direction="horizontal" gap={2}>
                    <Form.Control
                      type="text"
                      value={tag.label}
                      onChange={e => handleChange(e.target.value, tag.id)}
                    />
                    <Button variant="danger" onClick={() => onDelete(tag.id)}>
                      X
                    </Button>
                  </Stack>
                </Row>
              ))}
            </Form>
          </Stack>
        </Container>
      </Modal.Body>
    </Modal>
  );
}
