import "../index.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <AntdRegistry>{children}</AntdRegistry>;
}
