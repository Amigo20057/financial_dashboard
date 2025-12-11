import { useState } from "react";
import { Card } from "antd";
import { Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";
import "antd/dist/reset.css";

// Mock files grouped by month
type FileItem = {
  name: string;
  url: string;
  size: string;
};

type MonthFiles = {
  month: string;
  files: FileItem[];
};

const mockData: MonthFiles[] = [
  {
    month: "Грудень 2025",
    files: [
      { name: "Transactions-12-2025.csv", url: "#", size: "124 KB" },
      { name: "Report-12-2025.pdf", url: "#", size: "312 KB" },
    ],
  },
  {
    month: "Листопад 2025",
    files: [
      { name: "Transactions-11-2025.csv", url: "#", size: "118 KB" },
      { name: "Report-11-2025.pdf", url: "#", size: "290 KB" },
    ],
  },
];

export default function FilesPage() {
  const [data] = useState(mockData);

  return (
    <div style={{ padding: 24 }}>
      <h1 style={{ fontSize: 26, fontWeight: 600 }}>Файли / Експорт даних</h1>
      <p style={{ color: "#777", marginBottom: 20 }}>
        Завантажуйте підготовлені файли за місяцями
      </p>

      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {data.map((group, index) => (
          <Card key={index} bordered style={{ borderRadius: 16 }}>
            <h2 style={{ fontSize: 20, marginBottom: 16 }}>{group.month}</h2>

            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {group.files.map((file, idx) => (
                <div
                  key={idx}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "14px 18px",
                    background: "#fafafa",
                    borderRadius: 12,
                    border: "1px solid #eee",
                  }}
                >
                  <div>
                    <p style={{ margin: 0, fontWeight: 500 }}>{file.name}</p>
                    <p style={{ margin: 0, fontSize: 13, color: "#888" }}>
                      {file.size}
                    </p>
                  </div>

                  <Button
                    type="default"
                    icon={<DownloadOutlined />}
                    shape="round"
                  >
                    Завантажити
                  </Button>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
