import { useOutletContext } from "react-router";
import CommonButton from "../components/ui/common-btn";
import type { IContextMain } from "../types/global.interface";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import { useEffect, useState } from "react";
import CreateTransactionModal from "../components/ui/create-transaction-modal";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  fetchTransactions,
  getTransactionDataForGraphic,
} from "../redux/slices/transaction.slice";
import type {
  IChartData,
  IGroupedData,
  ITransaction,
} from "../types/dashboard.interface";
import { Card, Empty, List, Tag } from "antd";
import {
  ArrowUpOutlined,
  ArrowDownOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

export default function Home() {
  const { dashboard, dashboardStatus, categories, categoriesStatus } =
    useOutletContext<IContextMain>();
  const [isOpenCreateTransactionModal, setIsOpenCreateTransactionModal] =
    useState(false);
  const [lineData, setLineData] = useState<IChartData[]>([]);
  const [maxIncome, setMaxIncome] = useState(0);
  const [maxExpense, setMaxExpense] = useState(0);
  const [savingsRate, setSavingsRate] = useState(0);
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(getTransactionDataForGraphic());
      const transactionsRes = await dispatch(fetchTransactions({ limit: 10 }));
      setTransactions(transactionsRes.payload);

      if (res.payload && Array.isArray(res.payload)) {
        const groupedByDate = res.payload.reduce((acc, transaction) => {
          const originalDate = new Date(transaction.date);
          const dateKey = originalDate.toISOString().split("T")[0];

          const formattedDate = originalDate.toLocaleDateString("uk-UA", {
            day: "2-digit",
            month: "short",
          });

          if (!acc[dateKey]) {
            acc[dateKey] = {
              date: formattedDate,
              timestamp: originalDate.getTime(),
              income: 0,
              expenses: 0,
            };
          }

          const amount = parseFloat(transaction.amount);
          if (transaction.type === "income") {
            acc[dateKey].income += amount;
          } else if (transaction.type === "expense") {
            acc[dateKey].expenses += amount;
          }

          return acc;
        }, {} as Record<string, IGroupedData>);

        const chartData: IChartData[] = (
          Object.values(groupedByDate) as IGroupedData[]
        )
          .sort((a, b) => a.timestamp - b.timestamp)
          // eslint-disable-next-line @typescript-eslint/no-unused-vars
          .map(({ timestamp, ...rest }): IChartData => rest as IChartData);

        setLineData(chartData);

        if (chartData.length > 0) {
          const totalIncome = chartData.reduce((sum, item) => {
            return sum + Number(item.income);
          }, 0);

          const totalExpense = chartData.reduce((sum, item) => {
            return sum + Number(item.expenses);
          }, 0);

          setMaxIncome(totalIncome);
          setMaxExpense(totalExpense);
        }

        if (chartData.length > 0) {
          const totalIncome = chartData.reduce((sum, item) => {
            return sum + Number(item.income);
          }, 0);

          const totalExpense = chartData.reduce((sum, item) => {
            return sum + Number(item.expenses);
          }, 0);

          setMaxIncome(totalIncome);
          setMaxExpense(totalExpense);

          if (totalIncome > 0) {
            const rate = ((totalIncome - totalExpense) / totalIncome) * 100;
            setSavingsRate(Math.round(rate));
          } else {
            setSavingsRate(0);
          }
        }
      }
    };

    fetchData();
  }, [dispatch, savingsRate]);

  const renderSkeletonLoading = () => {
    return <>....</>;
  };

  return (
    <>
      <div>
        <div className="flex justify-between">
          <div>
            <h1 className="text-[26px]">Огляд фінансів</h1>
            <p>Статистика та аналітика за вашими транзакціями</p>
          </div>
          <div className="flex items-center">
            <div className="mr-5 flex flex-col justify-around">
              <p className="text-end">Баланс</p>
              {dashboardStatus === "loading" ? (
                renderSkeletonLoading()
              ) : (
                <p className="font-bold text-[18px]">{dashboard.balance} $</p>
              )}
            </div>
            <CommonButton
              customStyles="!h-[50px]"
              onClickEvent={() => setIsOpenCreateTransactionModal(true)}
              text="+ Додати транзакцію"
            />
          </div>
        </div>
        <div className="mt-5 mb-5 w-full flex">
          <div className="min-w-[350px] shadow-md p-[20px] rounded-2xl mr-[20px]">
            <p>Дохід за місяць</p>
            <h1 className="text-[24px] !font-bold text-black">{maxIncome}$</h1>
          </div>
          <div className="min-w-[350px] shadow-md p-[20px] rounded-2xl mr-[20px]">
            <p>Витрати за місяць</p>
            <h1 className="text-[24px] !font-bold text-black">{maxExpense}$</h1>
          </div>
          <div className="min-w-[350px] shadow-md p-[20px] rounded-2xl mr-[20px]">
            <p>Коеф. заощаджень</p>
            <h1 className="text-[24px] !font-bold text-black">
              {savingsRate}%
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
          <div className="col-span-2 bg-white p-4 rounded-2xl shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold">Динаміка доходів / витрат</div>
              <div className="text-xs text-gray-500">Останні 30 днів</div>
            </div>
            <div style={{ height: 240 }}>
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={lineData.length > 0 ? lineData : []}>
                  <defs>
                    <linearGradient
                      id="colorIncome"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#06B6D4" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient
                      id="colorExpenses"
                      x1="0"
                      y1="0"
                      x2="0"
                      y2="1"
                    >
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="income"
                    stroke="#06B6D4"
                    fillOpacity={1}
                    fill="url(#colorIncome)"
                  />
                  <Area
                    type="monotone"
                    dataKey="expenses"
                    stroke="#EF4444"
                    fillOpacity={1}
                    fill="url(#colorExpenses)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-white p-4 rounded-2xl shadow">
            <div className="flex items-center justify-between mb-2">
              <div className="font-semibold">Витрати по категоріям</div>
              <div className="text-xs text-gray-500">Цей місяць</div>
            </div>

            {categoriesStatus === "loading" ? (
              <div
                className="flex items-center justify-center"
                style={{ height: 180 }}
              >
                {renderSkeletonLoading()}
              </div>
            ) : categoriesStatus === "succeeded" && categories?.length > 0 ? (
              <>
                <div style={{ height: 180 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categories
                          .filter((c) => parseFloat(c.amount) > 0)
                          .map((c) => ({
                            ...c,
                            amount: parseFloat(c.amount),
                          }))}
                        dataKey="amount"
                        nameKey="name"
                        outerRadius={70}
                        innerRadius={30}
                        paddingAngle={2}
                      >
                        {categories
                          .filter((c) => parseFloat(c.amount) > 0)
                          .map((c) => (
                            <Cell key={c.name} fill={c.color} />
                          ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                  {categories.map((c) => (
                    <div key={c.name} className="flex items-center gap-2">
                      <div
                        style={{
                          width: 10,
                          height: 10,
                          background: c.color,
                        }}
                        className="rounded"
                      />
                      <div>
                        <div className="font-semibold">{c.name}</div>
                        <div className="text-xs text-gray-500">
                          {c.amount} ₴
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div
                className="flex items-center justify-center text-gray-500"
                style={{ height: 180 }}
              >
                Немає даних
              </div>
            )}
          </div>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow flex flex-col max-h-[300px]">
          <div className="flex items-center justify-between mb-2 flex-shrink-0">
            <div className="font-semibold">Операції</div>
            <div className="text-xs text-gray-500">10 останніх</div>
          </div>

          <div className="flex-1 overflow-y-auto pr-2">
            {transactions.length === 0 ? (
              <Empty description="Немає транзакцій" />
            ) : (
              <List
                dataSource={transactions}
                renderItem={(transaction) => {
                  const category = getCategoryById(transaction.category_id);
                  const isIncome = transaction.type === "income";

                  return (
                    <Card
                      className="!mb-4 rounded-xl shadow-sm border-l-4"
                      style={{
                        borderLeftColor: category?.color || "#d9d9d9",
                      }}
                      bodyStyle={{ padding: "20px" }}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-4">
                          <div
                            className="w-12 h-12 rounded-xl flex items-center justify-center text-white text-xl"
                            style={{
                              backgroundColor: category?.color || "#d9d9d9",
                            }}
                          >
                            {isIncome ? (
                              <ArrowUpOutlined />
                            ) : (
                              <ArrowDownOutlined />
                            )}
                          </div>

                          <div>
                            <div className="text-base font-semibold mb-1">
                              {category?.name || "Без категорії"}
                            </div>
                            <div className="text-xs text-gray-400 flex items-center gap-1">
                              <CalendarOutlined />
                              {formatDate(transaction.date)}
                            </div>
                            {transaction.description && (
                              <div className="text-xs text-gray-600 mt-1">
                                {transaction.description}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <div
                            className={`text-lg font-bold ${
                              isIncome ? "text-green-500" : "text-red-500"
                            }`}
                          >
                            {isIncome ? "+" : "-"} ₴
                            {formatAmount(transaction.amount)}
                          </div>

                          <Tag
                            color={isIncome ? "success" : "error"}
                            className="mt-2"
                          >
                            {isIncome ? "Дохід" : "Витрата"}
                          </Tag>
                        </div>
                      </div>
                    </Card>
                  );
                }}
              />
            )}
          </div>
        </div>
      </div>
      {isOpenCreateTransactionModal && (
        <CreateTransactionModal
          onClose={() => setIsOpenCreateTransactionModal(false)}
          categories={categories}
        />
      )}
    </>
  );
}
