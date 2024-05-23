import { Button, Card, Form, Flex, DatePicker, Col, Row } from "antd"
import { Content } from "antd/es/layout/layout"
import { Dispatch, SetStateAction, useCallback, useState } from "react"
import dayjs from "dayjs"
import ThisMonth from "../components/Calendar/ThisMonth"
import { CEvent, Tag } from "../App"
import { RangePickerProps } from "antd/es/date-picker"
import { LeftOutlined, RightOutlined } from "@ant-design/icons"

export type CalendarPageProps = {
  isMobile: boolean
  onDelete: (id: string) => void
  events: CEvent[]
  availableTags: Tag[]
  setShowModal: Dispatch<SetStateAction<boolean>>
  setActiveEvent: Dispatch<SetStateAction<CEvent | null>>
}
export default function CalendarPage({
  onDelete,
  events,
  availableTags,
  isMobile,
  setShowModal,
  setActiveEvent
}: CalendarPageProps) {
  const currentDate = dayjs()

  const [selected, setSelectedDate] = useState<dayjs.Dayjs>(currentDate)

  const onDateChange = useCallback((value: dayjs.Dayjs) => {
    value && setSelectedDate(value)
  }, [])

  return (
    <Content style={{ margin: "auto", marginBottom: "2%" }}>
      <Col>
        <Row
          align={"middle"}
          justify={"space-between"}
          style={{
            marginTop: "5px",

            width: "100%"
          }}
        >
          <Button
            size="large"
            type="primary"
            onClick={() => {
              setSelectedDate(selected.subtract(1, "month"))
            }}
            style={{
              marginLeft: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            icon={
              <LeftOutlined
                style={isMobile ? { fontSize: "100%" } : { fontSize: "200%" }}
              />
            }
          ></Button>
          <Row
            justify={"space-between"}
            align={"middle"}
            style={isMobile ? { width: "40%" } : { width: "80%" }}
          >
            <h1 style={isMobile ? { fontSize: "20px" } : {}}>
              {selected.format("MMM YYYY").toString()}
            </h1>

            <DatePicker
              picker="month"
              value={selected}
              defaultValue={currentDate}
              onChange={onDateChange}
            />
          </Row>
          <Button
            size="large"
            type="primary"
            onClick={() => {
              setSelectedDate(selected.add(1, "month"))
            }}
            style={{
              marginRight: "5px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
            icon={
              <RightOutlined
                style={isMobile ? { fontSize: "100%" } : { fontSize: "200%" }}
              />
            }
          ></Button>
        </Row>
        <Row
          style={
            isMobile
              ? { width: "350px", margin: "auto" }
              : { width: "1050px", margin: "auto" }
          }
          justify={"center"}
        >
          <ThisMonth
            setActiveEvent={setActiveEvent}
            setShowModal={setShowModal}
            isMobile={isMobile}
            events={events}
            onDelete={onDelete}
            availableTags={availableTags}
            curMonth={selected}
          />
        </Row>
      </Col>
    </Content>
  )
}
