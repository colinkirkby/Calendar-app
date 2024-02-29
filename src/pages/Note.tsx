import { Tag, Button, Col, Modal, Row, Flex } from "antd";
import { useEvent } from "../utilities/NotesWithTags";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ReactMarkDown from "react-markdown";
import { useState } from "react";
import ColumnGroup from "antd/es/table/ColumnGroup";
import { Content } from "antd/es/layout/layout";
type NoteProps = {
  onDelete: (id: string) => void;
  isMobile: boolean;
};
type ModalProps = {
  show: boolean;
  handleClose: () => void;
};

export default function Note({ onDelete, isMobile }: NoteProps) {
  const navigate = useNavigate();
  const note = useEvent();
  const [showDelete, setShowDelete] = useState(false);

  function handleDelete() {
    onDelete(note.id);
    navigate("/view");
  }

  return (
    <Content
      style={{ marginTop: "20px", margin: "auto", justifyContent: "center" }}
    >
      <Row
        className="allign-items-center mb-4"
        justify={isMobile ? "center" : "space-between"}
      >
        <Col>
          <h1>{note.title}</h1>
          <Tag className="text-truncate" color="blue" bordered={false}>
            {note.startDate.format("DD/MMMM/YYY").toString()}
            {!note.startDate.isSame(note.endDate) && " - "}
            {!note.startDate.isSame(note.endDate) &&
              note.endDate.format("DD/MMMM/YYYY").toString()}
          </Tag>
          <Flex gap={1} className=" flex-wrap">
            {" "}
            {note.tags.map(tag => {
              let backgroundTagColor = tag.color + "32";
              return (
                <Tag
                  key={tag.id}
                  className="text-truncate"
                  bordered={false}
                  style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    color: tag.color,
                    background: backgroundTagColor
                  }}
                >
                  {tag.label}
                </Tag>
              );
            })}
          </Flex>
          <Row style={{ marginTop: "30px" }}>
            <ReactMarkDown>{note.body}</ReactMarkDown>
          </Row>
        </Col>
        {!isMobile && (
          <Col xs="auto">
            <Flex gap={20} vertical>
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
        )}
      </Row>
      {isMobile && (
        <Row justify={"center"}>
          <Flex gap={20}>
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
        </Row>
      )}

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
