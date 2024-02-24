import { Button, Col, Form, Row, Flex, Input, Layout } from "antd";
import CreatableReactSelect from "react-select/creatable";
import { DatePicker } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { FormEvent, useRef, useState, useCallback, useEffect } from "react";
import { EventData, Tag } from "../App";
import { v4 as uuidV4 } from "uuid";
import styles from "./EventsListCards.module.css";
import dayjs from "dayjs";
import TextArea from "antd/es/input/TextArea";
import { Content } from "antd/es/layout/layout";
type NoteFormProps = {
  onSubmit: (data: EventData) => void;
  onAddTag: (tag: Tag) => void;
  availableTags: Tag[];
} & Partial<EventData>;

export default function NoteForm({
  onSubmit,
  onAddTag,
  availableTags,
  title = "",
  tags = [],
  body = "",
  date = dayjs()
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [newDate, setDate] = useState<dayjs.Dayjs>(date);
  useEffect(() => {
    console.log(date);
  });

  const onDateChange = useCallback((value: dayjs.Dayjs) => {
    setDate(value);
  }, []);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  function handleSubmit(values: FieldType) {
    onSubmit({
      title: values.title,
      body: values.body,
      tags: selectedTags,
      date: newDate,
      created: Date.now()
    });
    navigate("/view");
  }
  const onReset = () => {
    form.resetFields();
  };
  type FieldType = {
    title: string;
    body: string;
    date: dayjs.Dayjs;
    tags: Tag[];
  };

  return (
    <Content style={{ padding: "10px 10px" }}>
      <Form onFinish={handleSubmit} form={form} initialValues={date}>
        <Flex gap="middle" vertical>
          <Row gutter={20}>
            <Col flex={5}>
              <Form.Item<FieldType>
                name="title"
                label="Title"
                initialValue={title}
                rules={[{ required: true, message: "Please input Title" }]}
              >
                <Input required defaultValue={title} />
              </Form.Item>
            </Col>
            <Col flex={5}>
              <Form.Item name="tags" label="Tags" initialValue={selectedTags}>
                <CreatableReactSelect
                  value={selectedTags.map(tag => {
                    return { label: tag.label, value: tag.id };
                  })}
                  onCreateOption={(label: any) => {
                    const newTag = { id: uuidV4(), label };
                    onAddTag(newTag);
                    setSelectedTags(prevTags => [...prevTags, newTag]);
                  }}
                  options={availableTags.map(tag => {
                    return {
                      label: tag.label,
                      value: tag.id
                    };
                  })}
                  onChange={tags => {
                    setSelectedTags(
                      tags.map(tag => {
                        return { label: tag.label, id: tag.value };
                      })
                    );
                  }}
                  isMulti
                />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col flex={25}>
              <Form.Item<FieldType>
                name="body"
                label="Body"
                rules={[{ required: true, message: "Please input Title" }]}
                initialValue={body}
              >
                <TextArea
                  rows={15}
                  ref={textAreaRef}
                  required
                  defaultValue={body}
                />
              </Form.Item>
            </Col>
            <Col flex={2}>
              <Form.Item<FieldType>
                label="date"
                name="date"
                rules={[{ required: true, message: "Please input Date" }]}
                initialValue={date}
              >
                <DatePicker
                  className={styles.datePicker}
                  value={newDate}
                  defaultValue={date}
                  onChange={onDateChange}
                  required
                />
              </Form.Item>
            </Col>
          </Row>
          <Flex gap="middle" justify="end" className="justify-end-content">
            <Button htmlType="submit" type="primary">
              Save
            </Button>
            <Link to="/view">
              <Button type="default">cancel</Button>
            </Link>
            <Button
              type="primary"
              danger
              htmlType="button"
              onClick={() => {
                onReset();
              }}
            >
              Clear
            </Button>
          </Flex>
        </Flex>
      </Form>
    </Content>
  );
}
