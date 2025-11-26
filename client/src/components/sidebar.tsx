import { useNavigate } from "react-router";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logoutUser } from "../redux/slices/user.slice";
import SidebarBtn from "./ui/sidebar-btn";

export default function Sidebar() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const sidebarBts = [
    { text: "Дашборд", path: "/dashboard" },
    { text: "Категорії", path: "/category" },
    { text: "Операції", path: "/operations" },
    { text: "Звіти", path: "/reports" },
    { text: "Налаштування", path: "/settings" },
  ];

  const logout = () => {
    dispatch(logoutUser());
    navigate("/auth/login");
  };

  return (
    <aside className="min-w-72 bg-white rounded-2xl shadow p-4 flex flex-col gap-6 h-full">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-400 rounded-full flex items-center justify-center text-white font-bold">
          FD
        </div>
        <div>
          <div className="font-semibold">Financial Dashboard</div>
          <div className="text-xs text-gray-500">особистий кабінет</div>
        </div>
      </div>

      <nav className="flex flex-col gap-2 text-sm flex-1">
        {sidebarBts.map((btn) => (
          <SidebarBtn key={btn.path} text={btn.text} path={btn.path} />
        ))}
      </nav>

      <div className="mt-auto text-red-700">
        <div className="flex flex-col gap-2 flex-1">
          <button
            className="text-left py-2 px-3 cursor-pointer rounded hover:bg-gray-100"
            onClick={logout}
          >
            Вийти
          </button>
        </div>
      </div>
    </aside>
  );
}
