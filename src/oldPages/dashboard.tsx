import { Flex } from "antd";
import ThisWeek from "../components/HomePage/ThisWeek";
import UpcomingEvents from "../components/HomePage/UpcomingEvents";
import { CEvent, Tag } from "./App";
export type HomePageProps = {
  onDelete: (id: string) => void;
  genNew: (value: number) => void;
  events: CEvent[];
  availableTags: Tag[];
  isMobile: boolean;
};
export default function HomePage({
  genNew,
  events,
  onDelete,
  availableTags,
  isMobile
}: HomePageProps) {
  return (
    <Flex className="flex-wrap justify-content-center " gap={40}>
      <ThisWeek
        genNew={genNew}
        isMobile={isMobile}
        events={events}
        onDelete={onDelete}
        availableTags={availableTags}
      />
      <UpcomingEvents
        genNew={genNew}
        isMobile={isMobile}
        events={events}
        onDelete={onDelete}
        availableTags={availableTags}
      />
    </Flex>
  );
}
