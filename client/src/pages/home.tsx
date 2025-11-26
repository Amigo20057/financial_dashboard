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

const COLORS = ["#4F46E5", "#06B6D4", "#F59E0B", "#EF4444", "#10B981"];

const mockLineData = [
  { date: "01 Oct", income: 200, expenses: 150 },
  { date: "05 Oct", income: 0, expenses: 60 },
  { date: "10 Oct", income: 1200, expenses: 300 },
  { date: "15 Oct", income: 800, expenses: 500 },
  { date: "20 Oct", income: 0, expenses: 200 },
  { date: "25 Oct", income: 1000, expenses: 349.5 },
  { date: "30 Oct", income: 0, expenses: 100 },
];

const mockCategoryData = [
  { name: "Їжа", value: 420 },
  { name: "Транспорт", value: 180 },
  { name: "Розваги", value: 240 },
  { name: "Комуналка", value: 300 },
  { name: "Інше", value: 519.5 },
];

export default function Home() {
  const { dashboard, dashboardStatus } = useOutletContext<IContextMain>();

  const renderSkeletonLoading = () => {
    return <>....</>;
  };

  console.log(dashboard);
  console.log(dashboardStatus);

  return (
    <div>
      <div className="flex justify-between">
        <div>
          <h1 className="text-[26px]">Огляд фінансів</h1>
          <p>Статистика та аналітика за вашими транзакціями</p>
        </div>
        <div className="flex">
          <div className="mr-5 flex flex-col justify-around">
            <p className="text-end">Баланс</p>
            {dashboardStatus === "loading" ? (
              renderSkeletonLoading()
            ) : (
              <p className="font-bold text-[18px]">{dashboard.balance} $</p>
            )}
          </div>
          <CommonButton
            onClickEvent={() => console.log("TEST")}
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
              <AreaChart data={mockLineData}>
                <defs>
                  <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
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

          {/* PieChart контейнер */}
          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={mockCategoryData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={70}
                  innerRadius={30}
                  paddingAngle={2}
                >
                  {mockCategoryData.map((_, idx) => (
                    <Cell key={idx} fill={COLORS[idx % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
            {mockCategoryData.map((c, i) => (
              <div key={c.name} className="flex items-center gap-2">
                <div
                  style={{
                    width: 10,
                    height: 10,
                    background: COLORS[i % COLORS.length],
                  }}
                  className="rounded"
                />
                <div>
                  <div className="font-semibold">{c.name}</div>
                  <div className="text-xs text-gray-500">{c.value} ₴</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
