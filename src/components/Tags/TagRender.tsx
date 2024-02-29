import { Flex, Row, Space, Tag, Typography } from "antd";
import dayjs from "dayjs";
import { DayWithEvents } from "../HomePage/ThisWeek";
import desktopStyles from "./tags.module.css";
import mobileStyles from "./tagsMobile.module.css";
type tagProps = {
  isMobile: boolean;
  day: DayWithEvents;
  isWeekView: boolean;
};

import { Link } from "react-router-dom";
import { CEvent } from "../../App";

function mapEventsToRenderIndex(cEvents: CEvent[]): CEvent[][] {
  // Initialize the array with null values or empty arrays depending on how you want to handle multiple events per index
  const maxIndex = cEvents.reduce(
    (max, evt) => Math.max(max, evt.renderIndex),
    -1
  );
  const indexedEvents: CEvent[][] = Array.from(
    { length: maxIndex + 1 },
    () => []
  );

  // Iterate through cEvents and place each event in its spot based on renderIndex
  cEvents.forEach(cEvent => {
    if (indexedEvents[cEvent.renderIndex]) {
      indexedEvents[cEvent.renderIndex].push(cEvent);
    } else {
      // If for some reason the renderIndex is out of bounds or not initialized properly, handle it appropriately
      console.warn("Found event with invalid renderIndex:", cEvent);
    }
  });

  return indexedEvents;
}

export default function TagRender({ day, isMobile, isWeekView }: tagProps) {
  // .day() returns the day of the week where 0 is Sunday and 6 is Saturday

  const renderBoxes = mapEventsToRenderIndex(day.cEvents);
  return (
    <Flex vertical gap={isMobile ? 4 : 5}>
      {renderBoxes.length > 0 &&
        renderBoxes.map((cEvents, index) => {
          if (cEvents.length > 0) {
            let cEvent = cEvents[0];
            let tagColor =
              cEvent.tags.length > 0 ? cEvent.tags[0].color : "#1677FF";
            let backgroundTagColor = tagColor + "32";
            let isMulti = !cEvent.startDate
              .startOf("day")
              .isSame(cEvent.endDate.startOf("day"));
            let isStart = day.date
              .startOf("day")
              .isSame(cEvent.startDate.startOf("day"));
            let isEnd = day.date
              .startOf("day")
              .isSame(cEvent.endDate.startOf("day"));
            return renderEvent(
              day.date,
              isMobile,
              cEvent,
              isMulti,
              isStart,
              tagColor,
              backgroundTagColor,
              isEnd,
              isWeekView
            );
          } else {
            return (
              <div
                style={isMobile ? { height: "20px" } : { height: "24.5px" }}
              />
            );
          }
        })}
    </Flex>
  );
}
function renderEvent(
  date: dayjs.Dayjs,
  isMobile: boolean,
  cEvent: CEvent,
  isMulti: boolean,
  isStart: boolean,
  tagColor: string,
  backgroundTagColor: string,
  isEnd: boolean,
  isWeekView: boolean
) {
  const isLastDayOfMonth = dayjs(date).isSame(
    dayjs(date).endOf("month"),
    "day"
  );
  const isFirstDayOfMonth = dayjs(date).isSame(
    dayjs(date).startOf("month"),
    "day"
  );

  const isLastDayOfWeek = date.day() === 6;
  const isFirstDayOfWeek = date.day() === 0;
  const styles = isMobile ? mobileStyles : desktopStyles;
  console.log(isMulti);
  return (
    <Link
      to={`/${cEvent.id}`}
      style={isMobile ? { height: 20 } : { height: 24 }}
    >
      {isMulti ? (
        isStart || isFirstDayOfWeek || (isFirstDayOfMonth && !isWeekView) ? (
          //this is the opening part of a tag
          <Tag
            bordered={false}
            className={styles.first}
            style={
              isLastDayOfWeek || isEnd || isLastDayOfMonth
                ? {
                    color: tagColor,
                    background: backgroundTagColor,
                    overflow: "hidden",
                    textOverflow: "ellipsis"
                  }
                : {
                    overflow: "visible",
                    color: tagColor,
                    background: backgroundTagColor
                  }
            }
          >
            {cEvent.title}
          </Tag>
        ) : isEnd || isLastDayOfWeek || (isLastDayOfMonth && !isWeekView) ? (
          // this is the tag to render if it is the end
          <Tag
            bordered={false}
            className={styles.end}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: backgroundTagColor,
              background: backgroundTagColor
            }}
          >
            {"."}
          </Tag>
        ) : (
          //this is a middle tag
          <Tag
            bordered={false}
            className={styles.middle}
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: backgroundTagColor,
              background: backgroundTagColor
            }}
          >
            {"."}
          </Tag>
        )
      ) : (
        <Tag
          className={styles.single}
          bordered={false}
          //this is a tag that is a single day
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: tagColor,
            background: backgroundTagColor
          }}
        >
          {cEvent.title}
        </Tag>
      )}
    </Link>
  );
}
