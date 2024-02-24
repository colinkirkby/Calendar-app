import { Note, Tag } from "../App";
import { Navigate, useNavigate, Link } from "react-router-dom";
import EventsList from "../components/NotesList";
import { FormEvent, useState } from "react";
import Layout from "antd/es/layout";
import { Content } from "antd/es/layout/layout";
import { Row, Col, Flex, Button, Modal, Input, Form } from "antd";

type ViewPageProps = {
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

export default function ViewAllPage({
  notes,
  availableTags,
  onEdit,
  onDelete
}: ViewPageProps) {
  const [showEditTagsModel, setShowEditTags] = useState(false);
  return (
    <Content style={{ padding: "20px 48px" }}>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{ alignItems: "center" }}
      >
        <Col flex={7}>
          <h1>Events</h1>
        </Col>
        <Col>
          <Link to="/new">
            <Button type="primary">New Event</Button>
          </Link>
        </Col>
        <Col>
          <Button
            onClick={() => {
              setShowEditTags(true);
            }}
            type="default"
          >
            Edit Tags
          </Button>
        </Col>
      </Row>
      <Row>
        <EventsList availableTags={availableTags} notes={notes} />
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
    </Content>
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
    <Modal
      open={show}
      onOk={handleClose}
      onCancel={handleClose}
      title="EditTags"
      footer={<Button onClick={handleClose}>close</Button>}
    >
      <Form>
        <Flex
          gap={10}
          className="mb-4 align-items-center justify-content-center"
          vertical
        >
          {availableTags.map(tag => (
            <Row key={tag.id}>
              <Flex gap={10} style={{ minWidth: "450px" }}>
                <Input
                  type="text"
                  value={tag.label}
                  onChange={e => handleChange(e.target.value, tag.id)}
                />
                <Button danger onClick={() => onDelete(tag.id)}>
                  X
                </Button>
              </Flex>
            </Row>
          ))}
        </Flex>
      </Form>
    </Modal>
  );
}
