import { useEffect, useState } from "react";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { fetchTransactions } from "../redux/slices/transaction.slice";
import { useOutletContext } from "react-router";
import type { IContextMain } from "../types/global.interface";
import type { ITransaction } from "../types/dashboard.interface";
import { List, Card, Tag, Empty, Spin } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

export default function Transactions() {
  const { categories } = useOutletContext<IContextMain>();
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const response = await dispatch(fetchTransactions());
      if (response.payload) {
        setTransactions(response.payload);
      }
      setLoading(false);
    };
    fetchData();
  }, [dispatch]);

  const getCategoryById = (categoryId: number | string | undefined) => {
    if (!categoryId) return undefined;
    const id =
      typeof categoryId === "string" ? parseInt(categoryId, 10) : categoryId;
    return categories?.find((cat) => cat.id === id);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("uk-UA", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatAmount = (amount: string) => {
    return parseFloat(amount).toFixed(2);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "50px" }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      style={{
        padding: "24px",
        maxWidth: "1400px",
        margin: "0 auto",
        height: "90vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <h1 style={{ marginBottom: "24px", fontSize: "28px", fontWeight: 600 }}>
        Транзакції
      </h1>

      {transactions.length === 0 ? (
        <Empty description="Немає транзакцій" />
      ) : (
        <div style={{ flex: 1, overflowY: "auto", paddingRight: "8px" }}>
          <List
            dataSource={transactions}
            renderItem={(transaction) => {
              const category = getCategoryById(transaction.category_id);
              const isIncome = transaction.type === "income";

              return (
                <Card
                  style={{
                    marginBottom: "16px",
                    borderRadius: "12px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                    borderLeft: `4px solid ${category?.color || "#d9d9d9"}`,
                  }}
                  bodyStyle={{ padding: "20px" }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      <div
                        style={{
                          width: "48px",
                          height: "48px",
                          borderRadius: "12px",
                          backgroundColor: category?.color || "#d9d9d9",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: "20px",
                        }}
                      >
                        {isIncome ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
                      </div>

                      <div>
                        <div
                          style={{
                            fontSize: "16px",
                            fontWeight: 600,
                            marginBottom: "4px",
                          }}
                        >
                          {category?.name || "Без категорії"}
                        </div>

                        <div
                          style={{
                            fontSize: "13px",
                            color: "#8c8c8c",
                            display: "flex",
                            alignItems: "center",
                            gap: "6px",
                          }}
                        >
                          <CalendarOutlined />
                          {formatDate(transaction.date)}
                        </div>

                        {transaction.description && (
                          <div
                            style={{
                              fontSize: "13px",
                              color: "#595959",
                              marginTop: "4px",
                            }}
                          >
                            {transaction.description}
                          </div>
                        )}
                      </div>
                    </div>

                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{
                          fontSize: "20px",
                          fontWeight: 700,
                          color: isIncome ? "#52c41a" : "#ff4d4f",
                        }}
                      >
                        {isIncome ? "+" : "-"} ₴
                        {formatAmount(transaction.amount)}
                      </div>

                      <Tag
                        color={isIncome ? "success" : "error"}
                        style={{ marginTop: "8px" }}
                      >
                        {isIncome ? "Дохід" : "Витрата"}
                      </Tag>
                    </div>
                  </div>
                </Card>
              );
            }}
          />
        </div>
      )}
    </div>
  );
}
