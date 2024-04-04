import { Card, Grid, Row } from "antd";
import { Content } from "antd/es/layout/layout";
import communication from "../../../public/landingAssets/communication.webp";
export type BannerCard = {
  title: string;
  content: string;
  img: string;
};
interface BannerRowProps {
  cards: BannerCard[];
}
const BannerRow: React.FC<BannerRowProps> = ({ cards }) => {
  return (
    <Row
      justify="space-around"
      style={{ marginTop: "90px", marginBottom: "90px" }}
    >
      {cards.map(card => {
        return (
          <Card
            title={card.title}
            cover={<img src={card.img} />}
            style={{
              maxWidth: "400px",
              border: "none",
              boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
            }}
          >
            <p style={{ marginTop: "-25px" }}> {card.content}</p>{" "}
          </Card>
        );
      })}
    </Row>
  );
};
export default BannerRow;
