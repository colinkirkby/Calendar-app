import { Button, Card, Form, Flex, DatePicker, Col, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import { useCallback, useState } from "react";
import dayjs from "dayjs";
import ThisMonth from "../components/Calendar/ThisMonth";
import { CEvent, Tag } from "../App";
import { RangePickerProps } from "antd/es/date-picker";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";

export type CalendarPageProps = {
  onDelete: (id: string) => void;
  events: CEvent[];
  availableTags: Tag[];
};
export default function CalendarPage({
  onDelete,
  events,
  availableTags
}: CalendarPageProps) {
  const currentDate = dayjs();

  const [selected, setSelectedDate] = useState<dayjs.Dayjs>(currentDate);

  const onDateChange = useCallback((value: dayjs.Dayjs) => {
    value && setSelectedDate(value);
  }, []);

  return (
    <Content>
      <Col>
        <Row align={"middle"} justify={"space-between"}>
          <Button
            type="primary"
            style={{ height: "50px" }}
            onClick={() => {
              setSelectedDate(selected.subtract(1, "month"));
            }}
          >
            <LeftOutlined style={{ fontSize: "200%" }} />
          </Button>
          <Row
            justify={"space-between"}
            align={"middle"}
            style={{ width: "80%" }}
          >
            <h1>{selected.format("MMM YYYY").toString()}</h1>

            <DatePicker
              picker="month"
              value={selected}
              defaultValue={currentDate}
              onChange={onDateChange}
            />
          </Row>
          <Button
            type="primary"
            style={{ height: "50px" }}
            onClick={() => {
              setSelectedDate(selected.add(1, "month"));
            }}
          >
            <RightOutlined style={{ fontSize: "200%" }} />
          </Button>
        </Row>
        <Row style={{ width: "1050px", margin: "auto" }} justify={"center"}>
          <ThisMonth
            events={events}
            onDelete={onDelete}
            availableTags={availableTags}
            curMonth={selected}
          />
        </Row>
      </Col>
    </Content>
  );
}
