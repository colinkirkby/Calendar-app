import { Flex, Space, Tag } from "antd";
import dayjs from "dayjs";
import { DayWithEvents } from "../HomePage/ThisWeek";
type tagProps = {
  day: DayWithEvents;
};
import styles from "./tags.module.css";
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

export default function TagRender({ day }: tagProps) {
  const renderBoxes = mapEventsToRenderIndex(day.cEvents);
  return (
    <Flex vertical gap={5}>
      {renderBoxes.length > 0 &&
        renderBoxes.map((cEvents, index) => {
          if (cEvents.length > 0) {
            let cEvent = cEvents[0];
            let tagColor =
              cEvent.tags.length > 0 ? cEvent.tags[0].color : "#1677FF";
            let backgroundTagColor = tagColor + "32";
            let isMulti = !cEvent.startDate.isSame(cEvent.endDate);
            let isStart = day.date.isSame(cEvent.startDate);
            let isEnd = day.date.isSame(cEvent.endDate);
            return renderEvent(
              cEvent,
              isMulti,
              isStart,
              tagColor,
              backgroundTagColor,
              isEnd
            );
          } else {
            return <div style={{ height: "27.53px" }} />;
          }
        })}
    </Flex>
  );
}
function renderEvent(
  cEvent: CEvent,
  isMulti: boolean,
  isStart: boolean,
  tagColor: string,
  backgroundTagColor: string,
  isEnd: boolean
) {
  console.log(isMulti);
  return (
    <Link to={`/${cEvent.id}`}>
      {isMulti ? (
        isStart ? (
          //this is the opening part of a tag
          <Tag
            className={styles.first}
            style={{
              borderColor: tagColor,
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: tagColor,
              background: backgroundTagColor,
              borderBlockStartColor: tagColor
            }}
          >
            {cEvent.title}
          </Tag>
        ) : isEnd ? (
          // this is the tag to render if it is the end
          <Tag
            className={styles.end}
            style={{
              borderColor: tagColor,
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: tagColor,
              background: backgroundTagColor,
              borderBlockStartColor: tagColor
            }}
          >
            {cEvent.title}
          </Tag>
        ) : (
          //this is a middle tag
          <Tag
            className={styles.middle}
            style={{
              borderColor: tagColor,
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: tagColor,
              background: backgroundTagColor,
              borderBlockStartColor: tagColor
            }}
          >
            {cEvent.title}
          </Tag>
        )
      ) : (
        <Tag
          className={styles.single}
          //this is a tag that is a single day
          style={{
            borderColor: tagColor,
            overflow: "hidden",
            textOverflow: "ellipsis",
            color: tagColor,
            background: backgroundTagColor,
            borderBlockStartColor: tagColor
          }}
        >
          {cEvent.title}
        </Tag>
      )}
    </Link>
  );
}
