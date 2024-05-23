import { Stack } from "react-bootstrap"
import Card from "antd/es/card/Card"
import { Link, Navigate, useNavigate } from "react-router-dom"
import styles from "./NotesListCards.module.css"
import { SimplifiedNote } from "./EventsList"
import { Flex, Badge, Button, Tag } from "antd"

export function EventCard({
  id,
  title,
  tags,
  startDate,
  endDate
}: SimplifiedNote) {
  const navigate = useNavigate()
  return (
    <Card
      style={{ width: 250, height: 150 }}
      title={title}
      hoverable
      onClick={() => {
        navigate(`/${id}`)
      }}
      extra={
        <Tag className="text-truncate" color="blue" bordered={false}>
          {startDate.format("DD/MM").toString()}
          {!startDate.isSame(endDate) && " - "}
          {!startDate.isSame(endDate) && endDate.format("DD/MM").toString()}
        </Tag>
      }
    >
      {tags.length > 0 && (
        <Flex gap="small" wrap="wrap">
          {" "}
          {tags.map(tag => (
            <div
              key={tag.id}
              className="text-truncate"
              style={{
                paddingInline: "5px",
                textAlign: "center",
                minWidth: "50px",
                background: `linear-gradient(180deg, rgba(255, 255, 255, 0.25) 0%, rgba(0, 0, 0, 0.0) 110%), ${tag.color}`,
                color: "#ffff",
                borderRadius: "10px",
                fontSize: "smaller"
              }}
            >
              {tag.label}
            </div>
          ))}
        </Flex>
      )}
    </Card>
  )
}
