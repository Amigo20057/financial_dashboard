import CommonButton from "../components/ui/common-btn";

export default function Home() {
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
            <p className="font-bold text-[18px]">3.000 $</p>
          </div>
          <CommonButton
            onClickEvent={() => console.log("TEST")}
            text="+ Додати транзакцію"
          />
        </div>
      </div>
      <div>
        
      </div>
    </div>
  );
}
