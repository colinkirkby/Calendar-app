import { CEvent, Tag } from "../App";
import { Navigate, useNavigate, Link } from "react-router-dom";
import EventsList from "../components/EventList/EventsList";
import { FormEvent, useState } from "react";
import Layout from "antd/es/layout";
import { Content } from "antd/es/layout/layout";
import { Row, Col, Button } from "antd";
import { EditTagsModel } from "../components/Tags/EditTagsModel";

type ViewPageProps = {
  events: CEvent[];
  availableTags: Tag[];
  onEdit: (id: string, label: string, color: string) => void;
  onDelete: (id: string) => void;
};
export type ModalProps = {
  show: boolean;
  handleClose: () => void;
  availableTags: Tag[];
  onDelete: (id: string) => void;
  handleChange: (id: string, label: string, color: string) => void;
};

export default function ViewAllPage({
  events,
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
        <EventsList availableTags={availableTags} events={events} />
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
  function handleChange(label: string, id: string, color: string) {
    onEdit(id, label, color);
  }
}
