import { Stack } from "react-bootstrap";
import Card from "antd/es/card/Card";

import styles from "./NotesListCards.module.css";
import { SimplifiedNote } from "./EventsList";
import { Flex, Badge, Button, Tag } from "antd";

export function EventCard({
  id,
  title,
  tags,
  startDate,
  endDate
}: SimplifiedNote) {
  //const navigate = useNavigate();
  return (
    <Card
      style={{ width: 300, height: 200 }}
      title={title}
      hoverable
      onClick={() => {
        //navigate(`/${id}`);
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
            <Tag
              bordered={false}
              key={tag.id}
              className="text-truncate"
              style={{
                background: tag.color + "32",
                color: tag.color
              }}
            >
              {tag.label}
            </Tag>
          ))}
        </Flex>
      )}
    </Card>
  );
}
