import { Outlet } from "react-router";
import Sidebar from "../components/sidebar";

export default function MainLayout() {
  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      <div className="max-w-[1400px] h-screen mx-auto">
        <div className="flex gap-6 h-full ">
          <Sidebar />
          <main className="flex-1">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
