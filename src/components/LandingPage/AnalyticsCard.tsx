import React from "react";
import { Card, Button } from "antd";

// Define the prop types
interface AnalyticsCardButtonLeftProps {
  imagePath: string;
  headerText: string;
  bodyText: string;
  buttonText: string;
  buttonPath: string;
  footerText: string;
  leftAlign: boolean;
}

export const AnalyticsCardButtonLeft: React.FC<
  AnalyticsCardButtonLeftProps
> = ({
  imagePath,
  headerText,
  bodyText,
  buttonText,
  buttonPath,
  footerText
}) => {
  return (
    <Card
      style={{
        width: "100%",
        border: "none",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)",
        marginBottom: "30px"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {" "}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingInline: "40px"
          }}
        >
          <h2>{headerText}</h2>
          <p>{bodyText}</p>
          <Button
            type="primary"
            onClick={() => window.open(buttonPath, "_blank")}
          >
            {buttonText}
          </Button>
          <p style={{ marginTop: "1rem" }}>{footerText}</p>
        </div>
        <img src={imagePath} alt={headerText} style={{ width: "60%" }} />
      </div>
    </Card>
  );
};

export const AnalyticsCardButtonRight: React.FC<
  AnalyticsCardButtonLeftProps
> = ({
  imagePath,
  headerText,
  bodyText,
  buttonText,
  buttonPath,
  footerText
}) => {
  return (
    <Card
      style={{
        width: "100%",
        border: "none",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {" "}
        <img src={imagePath} alt={headerText} style={{ width: "60%" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingInline: "40px"
          }}
        >
          <h2>{headerText}</h2>
          <p>{bodyText}</p>
          <Button
            type="primary"
            onClick={() => window.open(buttonPath, "_blank")}
          >
            {buttonText}
          </Button>
          <p style={{ marginTop: "1rem" }}>{footerText}</p>
        </div>
      </div>
    </Card>
  );
};

interface AnalyticsCardProps {
  imagePath: string;
  headerText: string;
  bodyText: string;
  footerText: string;
}

export const AnalyticsCardLeft: React.FC<AnalyticsCardProps> = ({
  imagePath,
  headerText,
  bodyText,

  footerText
}) => {
  return (
    <Card
      style={{
        width: "100%",
        border: "none",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {" "}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingInline: "40px"
          }}
        >
          <h2>{headerText}</h2>
          <p>{bodyText}</p>

          <p style={{ marginTop: "1rem" }}>{footerText}</p>
        </div>
        <img src={imagePath} alt={headerText} style={{ width: "60%" }} />
      </div>
    </Card>
  );
};

export const AnalyticsCardRight: React.FC<AnalyticsCardProps> = ({
  imagePath,
  headerText,
  bodyText,

  footerText
}) => {
  return (
    <Card
      style={{
        width: "100%",
        border: "none",
        boxShadow: "0 4px 8px 0 rgba(0,0,0,0.2)"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        {" "}
        <img src={imagePath} alt={headerText} style={{ width: "60%" }} />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            paddingInline: "40px"
          }}
        >
          <h2>{headerText}</h2>
          <p>{bodyText}</p>

          <p style={{ marginTop: "1rem" }}>{footerText}</p>
        </div>
      </div>
    </Card>
  );
};
