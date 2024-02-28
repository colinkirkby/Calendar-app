import { Row, Flex, Button, Modal, Input, Form, ColorPicker } from "antd";
import { ModalProps } from "../../pages/ViewAllPage";

export function EditTagsModel({
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
              <ColorPicker
                disabledAlpha
                onChange={e => {
                  tag.color = e.toHexString();
                }}
              />
              <Input
                type="text"
                value={tag.label}
                onChange={e => handleChange(e.target.value, tag.id)}
              />
              <Button danger onClick={() => onDelete(tag.id)}>
                X
              </Button>
            </Row>
          ))}
        </Flex>
      </Form>
    </Modal>
  );
}
