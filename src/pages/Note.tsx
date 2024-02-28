import { Badge, Button, Col, Modal, Row, Flex } from "antd";
import { useEvent } from "../utilities/NotesWithTags";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ReactMarkDown from "react-markdown";
import { useState } from "react";
import ColumnGroup from "antd/es/table/ColumnGroup";
import { Content } from "antd/es/layout/layout";
type NoteProps = {
  onDelete: (id: string) => void;
};
type ModalProps = {
  show: boolean;
  handleClose: () => void;
};

export default function Note({ onDelete }: NoteProps) {
  const navigate = useNavigate();
  const note = useEvent();
  const [showDelete, setShowDelete] = useState(false);

  function handleDelete() {
    onDelete(note.id);
    navigate("/view");
  }

  return (
    <Content>
      <Row className="allign-items-center mb-4">
        <Col>
          <h1>{note.title}</h1>
          <Flex gap={1} className=" flex-wrap">
            {" "}
            {note.tags.map(tag => (
              <Badge key={tag.id} className="text-truncate">
                {tag.label}
              </Badge>
            ))}
          </Flex>
        </Col>
        <Col xs="auto">
          <Flex gap={3}>
            <Link to="edit">
              <Button type="primary">Edit</Button>
            </Link>
            <Link to={".."}>
              <Button type="default">Back</Button>
            </Link>

            <Button danger onClick={() => setShowDelete(true)}>
              Delete
            </Button>
          </Flex>
        </Col>
      </Row>
      <Row>
        <ReactMarkDown>{note.body}</ReactMarkDown>
      </Row>
      <DeleteModel show={showDelete} handleClose={() => setShowDelete(false)} />
    </Content>
  );
  function DeleteModel({ show, handleClose }: ModalProps) {
    return (
      <Modal
        title="Delete Note"
        open={show}
        onOk={handleClose}
        onCancel={handleClose}
      >
        <Col className="mb-4 align-items-center justify-content-center">
          <p>Are You Sure You Want To Delete This Note</p>
          <Flex
            gap={2}
            className="mb-4 align-items-center justify-content-center"
          >
            <Button danger onClick={handleDelete}>
              Delete
            </Button>
            <Button
              onClick={() => {
                handleClose();
              }}
            >
              Cancel
            </Button>
          </Flex>
        </Col>
      </Modal>
    );
  }
}
