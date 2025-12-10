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
import { getTransactionDataForGraphic } from "../redux/slices/transaction.slice";
import type { IChartData, IGroupedData } from "../types/dashboard.interface";

export default function Home() {
  const { dashboard, dashboardStatus, categories, categoriesStatus } =
    useOutletContext<IContextMain>();
  const [isOpenCreateTransactionModal, setIsOpenCreateTransactionModal] =
    useState(false);
  const [lineData, setLineData] = useState<IChartData[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const res = await dispatch(getTransactionDataForGraphic());
      console.log(res.payload);

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
        console.log("Chart data:", chartData);
      }
    };

    fetchData();
  }, [dispatch]);

  const renderSkeletonLoading = () => {
    return <>....</>;
  };

  console.log(dashboard);
  console.log(dashboardStatus);
  console.log(categories);

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
            <h1 className="text-[24px] font-bold text-black">4.200$</h1>
            <p>Порівняно з попереднім місяцем +12%</p>
          </div>
          <div className="min-w-[350px] shadow-md p-[20px] rounded-2xl mr-[20px]">
            <p>Витрати за місяць</p>
            <h1 className="text-[24px] font-bold text-black">1.100$</h1>
            <p>
              Ліміт: 2000$ - <span className="text-red-500">Перевищено</span>
            </p>
          </div>
          <div className="min-w-[350px] shadow-md p-[20px] rounded-2xl mr-[20px]">
            <p>Коеф. заощаджень</p>
            <h1 className="text-[24px] font-bold text-black">38%</h1>
            <p>Порада: зменшити витрати на розваги</p>
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
