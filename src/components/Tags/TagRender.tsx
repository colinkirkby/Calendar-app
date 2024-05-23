import { Flex, Row, Space, Tag, Typography } from "antd"
import dayjs from "dayjs"
import { DayWithEvents } from "../HomePage/ThisWeek"
import desktopStyles from "./tags.module.css"
import mobileStyles from "./tagsMobile.module.css"
type tagProps = {
  isMobile: boolean
  day: DayWithEvents
  isWeekView: boolean
  setShowModal: Dispatch<SetStateAction<boolean>>
  setActiveEvent: Dispatch<SetStateAction<CEvent | null>>
}

import { Link } from "react-router-dom"
import { CEvent } from "../../App"
import { Dispatch, SetStateAction } from "react"

function mapEventsToRenderIndex(cEvents: CEvent[]): CEvent[][] {
  // Initialize the array with null values or empty arrays depending on how you want to handle multiple events per index
  const maxIndex = cEvents.reduce(
    (max, evt) => Math.max(max, evt.renderIndex),
    -1
  )
  const indexedEvents: CEvent[][] = Array.from(
    { length: maxIndex + 1 },
    () => []
  )

  // Iterate through cEvents and place each event in its spot based on renderIndex
  cEvents.forEach(cEvent => {
    if (indexedEvents[cEvent.renderIndex]) {
      indexedEvents[cEvent.renderIndex].push(cEvent)
    } else {
      // If for some reason the renderIndex is out of bounds or not initialized properly, handle it appropriately
      console.warn("Found event with invalid renderIndex:", cEvent)
    }
  })

  return indexedEvents
}

export default function TagRender({
  day,
  isMobile,
  isWeekView,
  setShowModal,
  setActiveEvent
}: tagProps) {
  // .day() returns the day of the week where 0 is Sunday and 6 is Saturday

  const renderBoxes = mapEventsToRenderIndex(day.cEvents)
  return (
    <Flex vertical gap={isMobile ? 4 : 5}>
      {renderBoxes.length > 0 &&
        renderBoxes.map((cEvents, index) => {
          if (cEvents.length > 0) {
            let cEvent = cEvents[0]
            let tagColor =
              cEvent.tags.length > 0 ? cEvent.tags[0].color : "#1677FF"
            let backgroundTagColor = tagColor
            let isMulti = !cEvent.startDate
              .startOf("day")
              .isSame(cEvent.endDate.startOf("day"))
            let isStart = day.date
              .startOf("day")
              .isSame(cEvent.startDate.startOf("day"))
            let isEnd = day.date
              .startOf("day")
              .isSame(cEvent.endDate.startOf("day"))
            return renderEvent(
              day.date,
              isMobile,
              cEvent,
              isMulti,
              isStart,
              tagColor,
              backgroundTagColor,
              isEnd,
              isWeekView,
              setShowModal,
              setActiveEvent
            )
          } else {
            return (
              <div style={isMobile ? { height: "18px" } : { height: "18px" }} />
            )
          }
        })}
    </Flex>
  )
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
  isWeekView: boolean,
  setShowModal: Dispatch<SetStateAction<boolean>>,
  setActiveEvent: Dispatch<SetStateAction<CEvent | null>>
) {
  const isLastDayOfMonth = dayjs(date).isSame(dayjs(date).endOf("month"), "day")
  const isFirstDayOfMonth = dayjs(date).isSame(
    dayjs(date).startOf("month"),
    "day"
  )

  const isLastDayOfWeek = date.day() === 6
  const isFirstDayOfWeek = date.day() === 0
  const styles = isMobile ? mobileStyles : desktopStyles
  console.log(isMulti)
  return (
    <>
      {isMulti ? (
        isStart ? (
          //this is the opening part of a tag
          <Link
            to={`/${cEvent.id}`}
            style={
              isMobile
                ? { height: 18, textDecoration: "none" }
                : { height: 18, textDecoration: "none" }
            }
          >
            <div
              className={styles.first}
              style={
                isLastDayOfWeek || isEnd || isLastDayOfMonth
                  ? {
                      background: `linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(0, 0, 0, 0.0) 110%), ${tagColor}`,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      height: 18
                    }
                  : {
                      overflow: "visible",
                      height: 18,
                      background: `linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(0, 0, 0, 0.0) 110%), ${tagColor}`
                    }
              }
            >
              {" "}
              <p
                style={{
                  textWrap: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "#ffff",
                  fontSize: "smaller",
                  paddingLeft: "10px",
                  textDecorationLine: "none"
                }}
              >
                {cEvent.title}
              </p>
            </div>
          </Link>
        ) : isEnd ? (
          // this is the tag to render if it is the end
          <Link
            to={`/${cEvent.id}`}
            style={
              isMobile
                ? {
                    height: 18,

                    color: backgroundTagColor,
                    textDecoration: "none"
                  }
                : { height: 18, textDecoration: "none" }
            }
          >
            <div
              className={styles.end}
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                height: 18,
                background: `linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(0, 0, 0, 0.0) 110%), ${tagColor}`
              }}
            >
              <p
                style={{
                  textWrap: "nowrap",
                  fontSize: "smaller",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "#ffff",
                  paddingLeft: "10px"
                }}
              >
                {isFirstDayOfWeek || (isFirstDayOfMonth && !isWeekView)
                  ? cEvent.title
                  : "    "}
              </p>
            </div>
          </Link>
        ) : (
          //this is a middle tag
          <Link
            to={`/${cEvent.id}`}
            style={
              isMobile
                ? { height: 18, textDecoration: "none" }
                : { height: 18, textDecoration: "none" }
            }
          >
            <div
              className={styles.middle}
              style={{
                overflow: "hidden",
                textOverflow: "ellipsis",
                color: "#ffff",
                height: 18,
                background: `linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(0, 0, 0, 0.0) 110%), ${tagColor}`
              }}
            >
              <p
                style={{
                  textWrap: "nowrap",
                  fontSize: "smaller",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  color: "#ffff",
                  paddingLeft: "10px"
                }}
              >
                {isFirstDayOfWeek || (isFirstDayOfMonth && !isWeekView)
                  ? cEvent.title
                  : "    "}
              </p>
            </div>
          </Link>
        )
      ) : (
        <Link
          to={`/${cEvent.id}`}
          style={
            isMobile
              ? { height: 18, textDecoration: "none" }
              : { height: 18, textDecoration: "none" }
          }
        >
          <div
            className={styles.single}
            //this is a tag that is a single day
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              color: "#ffff",
              height: 18,
              background: `linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(0, 0, 0, 0.0) 110%), ${tagColor}`
            }}
          >
            <p
              style={{
                textWrap: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
                fontSize: "smaller",
                color: "#ffff",
                paddingLeft: "10px"
              }}
            >
              {cEvent.title}
            </p>
          </div>
        </Link>
      )}
    </>
  )
}
