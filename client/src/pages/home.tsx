import { useOutletContext } from "react-router";
import CommonButton from "../components/ui/common-btn";
import type { IContextMain } from "../types/global.interface";

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
      <div className="mt-5 w-full flex justify-between">
        <div className="min-w-[350px] shadow-md p-[20px] rounded-2xl">
          <p>Дохід за місяць</p>
          <h1 className="text-[24px] font-bold text-black">4.200$</h1>
          <p>Порівняно з попереднім місяцем +12%</p>
        </div>
        <div className="min-w-[350px] shadow-md p-[20px] rounded-2xl">
          <p>Витрати за місяць</p>
          <h1 className="text-[24px] font-bold text-black">1.100$</h1>
          <p>
            Ліміт: 2000$ - <span className="text-red-500">Перевищено</span>
          </p>
        </div>
        <div className="min-w-[350px] shadow-md p-[20px] rounded-2xl">
          <p>Коеф. заощаджень</p>
          <h1 className="text-[24px] font-bold text-black">38%</h1>
          <p>Порада зменшити витрати на розваги</p>
        </div>
      </div>
    </div>
  );
}
