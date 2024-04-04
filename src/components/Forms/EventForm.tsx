import { Button, Col, Form, Row, Flex, Input, Layout, TimePicker } from "antd";
import CreatableReactSelect from "react-select/creatable";
import { DatePicker } from "antd";
import Link from "next/link";

import { FormEvent, useRef, useState, useCallback, useEffect } from "react";
import { EventData, Tag } from "../../oldPages/App";
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
  color = "#00A5EC",
  startDate: startDate = dayjs(),
  endDate: endDate = dayjs(),
  startTime: startTime = dayjs(),
  endTime: endTime = dayjs()
}: NoteFormProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [newStartDate, setStartDate] = useState<dayjs.Dayjs>(startDate);
  const [newEndDate, setEndDate] = useState<dayjs.Dayjs>(endDate);
  const [newStartTime, setStartTime] = useState<dayjs.Dayjs>(startTime);
  const [newEndTime, setEndTime] = useState<dayjs.Dayjs>(endTime);
  useEffect(() => {
    console.log(startDate);
    console.log(endDate);
  });

  const onStartDateChange = useCallback((value: dayjs.Dayjs) => {
    setStartDate(value);
    if (value.isAfter(newEndDate)) {
      setEndDate(value);
    }
  }, []);

  const onEndDateChange = useCallback((value: dayjs.Dayjs) => {
    setEndDate(value);
  }, []);

  const onStartTimeChange = useCallback((value: dayjs.Dayjs) => {
    setStartTime(value);
  }, []);
  const onEndTimeChange = useCallback((value: dayjs.Dayjs) => {
    setEndTime(value);
  }, []);
  const [selectedTags, setSelectedTags] = useState<Tag[]>(tags);
  //const navigate = useNavigate();
  const [form] = Form.useForm();
  function handleSubmit(values: FieldType) {
    onSubmit({
      title: values.title,
      body: values.body,
      tags: selectedTags,
      startDate: newStartDate,
      endDate: newEndDate,
      endTime: newEndTime,
      startTime: newStartTime,
      color: color,
      created: Date.now(),
      isMulti: !newStartDate.isSame(newEndDate),
      renderIndex: 0
    });
    //navigate("..");
  }
  const onReset = () => {
    form.resetFields();
  };
  type FieldType = {
    title: string;
    body: string;
    startDate: dayjs.Dayjs;
    endDate: dayjs.Dayjs;
    color: string;
    tags: Tag[];
  };

  return (
    <Content style={{ padding: "10px 10px" }}>
      <Form onFinish={handleSubmit} form={form} initialValues={startDate}>
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
                    const newTag = { id: uuidV4(), label, color };
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
                        return {
                          label: tag.label,
                          id: tag.value,
                          color: "#FFFFFF"
                        };
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
              <Row>
                <Form.Item<FieldType>
                  label="Start Date"
                  name="startDate"
                  rules={[{ required: true, message: "Please input Date" }]}
                  initialValue={startDate}
                >
                  <DatePicker
                    className={styles.datePicker}
                    value={newStartDate}
                    defaultValue={startDate}
                    onChange={onStartDateChange}
                    required
                    variant="borderless"
                  />
                </Form.Item>
                <Form.Item>
                  <TimePicker
                    variant="borderless"
                    onChange={onStartTimeChange}
                  />
                </Form.Item>
              </Row>
              <Row>
                <Form.Item<FieldType>
                  label="End Date"
                  name="endDate"
                  rules={[{ required: true, message: "Please input Date" }]}
                  initialValue={endDate}
                >
                  <DatePicker
                    variant="borderless"
                    className={styles.datePicker}
                    value={newEndDate}
                    defaultValue={newEndDate}
                    onChange={onEndDateChange}
                    required
                  />
                </Form.Item>
                <Form.Item>
                  <TimePicker variant="borderless" onChange={onEndTimeChange} />
                </Form.Item>
              </Row>
            </Col>
          </Row>
          <Flex gap="middle" justify="end" className="justify-end-content">
            <Button htmlType="submit" type="primary">
              Save
            </Button>
            <Link href={".."}>
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
