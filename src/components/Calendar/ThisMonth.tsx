import { useEffect, useState } from "react";
import { HomePageProps } from "../../pages/HomePage";
import { CEvent, Tag as aTag } from "../../App";
import EventsList, { dateSort } from "../EventList/EventsList";
import dayjs from "dayjs";
//import isoMonth from "dayjs/plugin/iso";
import { Badge, Card, Col, Flex, Row, Tag } from "antd";
import TagRender from "../Tags/TagRender";
//dayjs.extend(isoMonth);

export type DayWithEvents = {
  date: dayjs.Dayjs;
  cEvents: CEvent[];
  offset: number;
};
type ThisMonthProps = {
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
  curMonth
}: ThisMonthProps) {
  const [eventsThisMonth, setEventsThisMonth] = useState<CEvent[]>();
  const [MonthArray, setMonthArray] = useState<DayWithEvents[]>([]);
  const [preMonthArray, setPreMonthArray] = useState<dayjs.Dayjs[]>([]);
  const [postMonthArray, setPostMonthArray] = useState<dayjs.Dayjs[]>([]);

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
    <Col style={{ marginTop: "30px", width: "1050" }}>
      <Row
        gutter={16}
        style={{ width: "1050" }}
        align={"middle"}
        justify={"center"}
      >
        {preMonthArray.map(day => {
          return (
            <Card
              style={{ width: "150px", height: "200px", background: "#D2D2D2" }}
              title={day.format("ddd, DD MMM ").toString()}
            ></Card>
          );
        })}
        {MonthArray.map(day => {
          return (
            <Card
              style={{ width: "150px", height: "200px" }}
              title={day.date.format("ddd, DD MMM ").toString()}
            >
              <TagRender day={day} />
            </Card>
          );
        })}
        {postMonthArray.map(day => {
          return (
            <Card
              style={{ width: "150px", height: "200px", background: "#D2D2D2" }}
              title={day.format("ddd, DD MMM ").toString()}
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
