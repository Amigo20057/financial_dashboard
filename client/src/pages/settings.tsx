import { useOutletContext } from "react-router";
import type { IContextMain } from "../types/global.interface";
import {
  MailOutlined,
  UserOutlined,
  CalendarOutlined,
} from "@ant-design/icons";

export default function Settings() {
  const { user } = useOutletContext<IContextMain>();

  const initials = (user?.name?.[0] || "") + (user?.surname?.[0] || "");

  const formatDate = (dateValue?: string | Date) => {
    if (!dateValue) return "-";

    const date = dateValue instanceof Date ? dateValue : new Date(dateValue);

    return date.toLocaleDateString("uk-UA", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="w-full h-full px-8 py-6">
      <h1 className="text-[32px] font-semibold mb-8 text-gray-900 tracking-tight">
        Налаштування профілю
      </h1>

      <div className="bg-white border border-gray-200 rounded-3xl shadow-sm p-8 flex flex-col md:flex-row items-center md:items-start gap-8 transition-all duration-300 hover:shadow-md">
        <div className="relative flex justify-center items-center w-[150px] h-[150px] rounded-full bg-gradient-to-br from-indigo-500 to-blue-500 text-white text-5xl font-semibold shadow-md select-none">
          {initials}
        </div>

        <div className="flex-1 w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-5 gap-x-8">
            <div>
              <p className="text-sm uppercase text-gray-500 font-medium tracking-wide mb-1">
                Ім’я
              </p>
              <p className="text-mds font-semibold text-gray-900">
                <UserOutlined />
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-sm uppercase text-gray-500 font-medium tracking-wide mb-1">
                Прізвище
              </p>
              <p className="text-mds font-semibold text-gray-900">
                <UserOutlined />
                {user.surname}
              </p>
            </div>

            <div className="col-span-2">
              <p className="text-sm uppercase text-gray-500 font-medium tracking-wide mb-1">
                Емейл
              </p>
              <div className="flex items-center gap-2 text-mds font-semibold text-gray-900">
                <MailOutlined className="text-indigo-500" />
                <span>{user.email}</span>
              </div>
            </div>

            <div>
              <p className="text-sm uppercase text-gray-500 font-medium tracking-wide mb-1">
                Дата створення
              </p>
              <div className="flex items-center gap-2 text-mds font-semibold text-gray-900">
                <CalendarOutlined className="text-indigo-500" />
                <span>{formatDate(user.created_at)}</span>
              </div>
            </div>

            <div>
              <p className="text-sm uppercase text-gray-500 font-medium tracking-wide mb-1">
                Останнє оновлення
              </p>
              <div className="flex items-center gap-2 text-mds font-semibold text-gray-900">
                <CalendarOutlined className="text-indigo-500" />
                <span>{formatDate(user.updated_at)}</span>
              </div>
            </div>
          </div>

          <div className="mt-8">
            <button className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white font-medium text-sm hover:bg-indigo-700 transition shadow-sm">
              Редагувати профіль
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
