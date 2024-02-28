import { Card, Container, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./PageStyles.module.css";
import { Content } from "antd/es/layout/layout";
import { Flex } from "antd";
import ThisWeek from "../components/HomePage/ThisWeek";
import UpcomingEvents from "../components/HomePage/UpcomingEvents";
import { CEvent, Tag } from "../App";
export type HomePageProps = {
  onDelete: (id: string) => void;
  events: CEvent[];
  availableTags: Tag[];
};
export default function HomePage({
  events,
  onDelete,
  availableTags
}: HomePageProps) {
  return (
    <Content>
      <h1>Home</h1>
      <Flex className="flex-wrap justify-content-center " gap={40}>
        <ThisWeek
          events={events}
          onDelete={onDelete}
          availableTags={availableTags}
        />
        <UpcomingEvents
          events={events}
          onDelete={onDelete}
          availableTags={availableTags}
        />
      </Flex>
    </Content>
  );
}
