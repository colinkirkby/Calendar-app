import { useEffect, useState } from "react";
import { HomePageProps } from "../../pages/HomePage";
import { CEvent, Tag as aTag } from "../../App";
import EventsList, { dateSort } from "../EventList/EventsList";
import dayjs from "dayjs";
//import isoMonth from "dayjs/plugin/iso";
import { Badge, Card, Col, Flex, Row, Tag } from "antd";
import TagRender from "../Tags/TagRender";
//dayjs.extend(isoMonth);
const desktopStyle: React.CSSProperties = {
  width: "150px",
  height: "300px"
};
const mobileStyle: React.CSSProperties = {
  width: "50px",
  height: "150px",
  padding: "-25px"
};
const desktopCalender: React.CSSProperties = {
  marginTop: "30px",
  width: "1050"
};
const mobileCalender: React.CSSProperties = {
  marginTop: "30px",
  width: "350"
};

export type DayWithEvents = {
  date: dayjs.Dayjs;
  cEvents: CEvent[];
  offset: number;
};
type ThisMonthProps = {
  isMobile: boolean;
  onDelete: (id: string) => void;
  events: CEvent[];
  availableTags: aTag[];
  curMonth: dayjs.Dayjs;
};

function getDaysBeforeMonth(currentMonth: dayjs.Dayjs): dayjs.Dayjs[] {
  const firstDayOfMonth = currentMonth.startOf("month");

  const firstDayWeekday = firstDayOfMonth.day();

  const daysToPrepend = firstDayWeekday;

  let daysBeforeMonth: dayjs.Dayjs[] = [];
  for (let i = 1; i <= daysToPrepend; i++) {
    daysBeforeMonth.push(firstDayOfMonth.subtract(i, "day"));
  }

  return daysBeforeMonth.reverse();
}
function getDaysAfterMonth(currentMonth: dayjs.Dayjs): dayjs.Dayjs[] {
  const lastDayOfMonth = currentMonth.endOf("month");

  const lastDayWeekday = lastDayOfMonth.day();

  const daysToAdd = 7 - lastDayWeekday;

  let daysAfterMonth: dayjs.Dayjs[] = [];
  for (let i = 1; i < daysToAdd; i++) {
    daysAfterMonth.push(lastDayOfMonth.add(i, "day"));
  }

  return daysAfterMonth;
}

function getCurrentMonthDays(curr: dayjs.Dayjs): DayWithEvents[] {
  let days: DayWithEvents[] = [];
  const startOfMonth = curr.startOf("month");
  let numDays = startOfMonth.daysInMonth();
  for (let i = 0; i < numDays; i++) {
    let day: DayWithEvents = {
      date: startOfMonth.add(i, "day"),
      cEvents: [], // assuming you'll populate this later
      offset: 0
    };

    days.push(day);
  }

  return days;
}

export function filterDatesInCurrentMonth(
  events: CEvent[],
  month: dayjs.Dayjs
) {
  const startOfMonth = month.startOf("month");
  const endOfMonth = month.endOf("month");

  return events
    .filter(cEvent => {
      const start = dayjs(cEvent.startDate);
      const end = dayjs(cEvent.endDate);
      return (
        (start.isAfter(startOfMonth) && start.isBefore(endOfMonth)) ||
        start.isSame(startOfMonth) ||
        start.isSame(endOfMonth) ||
        (end.isAfter(startOfMonth) && end.isBefore(endOfMonth)) ||
        end.isSame(startOfMonth) ||
        end.isSame(endOfMonth) ||
        (start.isBefore(endOfMonth) && end.isAfter(startOfMonth))
      );
    })
    .sort(dateSort);
}

export default function ThisMonth({
  events,
  availableTags,
  curMonth,
  isMobile
}: ThisMonthProps) {
  const [eventsThisMonth, setEventsThisMonth] = useState<CEvent[]>();
  const [MonthArray, setMonthArray] = useState<DayWithEvents[]>([]);
  const [preMonthArray, setPreMonthArray] = useState<dayjs.Dayjs[]>([]);
  const [postMonthArray, setPostMonthArray] = useState<dayjs.Dayjs[]>([]);
  const styles = isMobile ? mobileStyle : desktopStyle;
  const calStyles = isMobile ? mobileCalender : desktopCalender;
  useEffect(() => {
    console.log(events);
    setPreMonthArray(getDaysBeforeMonth(curMonth));
    setPostMonthArray(getDaysAfterMonth(curMonth));
    let newEventsThisMonth = filterDatesInCurrentMonth(events, curMonth);
    const indexedEventsThisMonth = newEventsThisMonth.map((cEvent, index) => {
      let newRend = 0;
      for (var i = 0; i < index; i++) {
        if (newEventsThisMonth[i].endDate.isAfter(cEvent.startDate)) {
          cEvent.renderIndex = newEventsThisMonth[i].renderIndex + 1;
        }
      }
      return { ...cEvent, renderIndex: newRend };
    });
    console.log(indexedEventsThisMonth);
    let newMonthArray = getCurrentMonthDays(curMonth).map(day => {
      return {
        ...day,
        cEvents: newEventsThisMonth.filter(
          cEvent => dayIsInEventRange(cEvent, day) // Make sure to compare only the day, not time
        )
      };
    });
    let offset = 0;

    setEventsThisMonth(newEventsThisMonth); // Now set the events for the Month
    setMonthArray(newMonthArray);
  }, [events, curMonth]);
  return (
    <Col style={calStyles}>
      <Row gutter={16} style={calStyles} align={"middle"} justify={"center"}>
        {preMonthArray.map(day => {
          return (
            <Card
              size={isMobile ? "small" : "default"}
              style={{ ...styles, background: "#D2D2D2" }}
              title={
                isMobile
                  ? day.format(" DD  ")
                  : day.format("ddd, DD MMM ").toString()
              }
            ></Card>
          );
        })}
        {MonthArray.map(day => {
          return (
            <Card
              size={isMobile ? "small" : "default"}
              style={styles}
              title={
                isMobile
                  ? day.date.format(" DD  ")
                  : day.date.format("ddd, DD MMM ").toString()
              }
            >
              <TagRender isMobile={isMobile} day={day} />
            </Card>
          );
        })}
        {postMonthArray.map(day => {
          return (
            <Card
              size={isMobile ? "small" : "default"}
              style={{ ...styles, background: "#D2D2D2" }}
              title={
                isMobile
                  ? day.format(" DD  ")
                  : day.format("ddd, DD MMM ").toString()
              }
            ></Card>
          );
        })}
      </Row>
    </Col>
  );
}
function dayIsInEventRange(cEvent: CEvent, day: DayWithEvents): unknown {
  return (
    cEvent.startDate.isSame(day.date, "day") ||
    cEvent.endDate.isSame(day.date, "day") ||
    (cEvent.endDate.isAfter(day.date, "day") &&
      cEvent.startDate.isBefore(day.date, "day"))
  );
}
