import { Outlet, useNavigate } from "react-router";
import Sidebar from "../components/sidebar";
import type { RootState } from "../redux/store";
import { useEffect } from "react";
import { fetchUser } from "../redux/slices/user.slice";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import type { IContextMain } from "../types/global.interface";
import type { IUser } from "../types/user.interface";
import type { IDashboard } from "../types/dashboard.interface";
import { fetchDashboard } from "../redux/slices/dashboard.slice";
import { fetchCategories } from "../redux/slices/category.slise";
import type { ICategory } from "../types/category.interface";

export default function MainLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.value);
  const dashboard = useAppSelector((state: RootState) => state.dashboard.value);
  const userStatus = useAppSelector((state: RootState) => state.user.status);
  const dashboardStatus = useAppSelector(
    (state: RootState) => state.dashboard.status
  );
  const categories = useAppSelector((state: RootState) => state.category.value);
  const categoryStatus = useAppSelector(
    (state: RootState) => state.category.status
  );

  useEffect(() => {
    if (userStatus === "idle" && Object.keys(user).length === 0) {
      dispatch(fetchUser());
      dispatch(fetchDashboard());
      dispatch(fetchCategories());
    }
  }, [dispatch, user, userStatus, dashboard, dashboardStatus, categoryStatus]);

  if (userStatus === "failed" && Object.keys(user).length === 0) {
    navigate("/auth/login");
  }

  const context: IContextMain = {
    user: user as IUser,
    dashboard: dashboard as IDashboard,
    dashboardStatus,
    userStatus,
    categories: categories as ICategory[],
    categoriesStatus: categoryStatus,
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      <div className="p-3 h-screen mx-auto">
        <div className="flex gap-6 h-full ">
          <Sidebar />
          <main className="flex-1">
            <Outlet context={context} />
          </main>
        </div>
      </div>
    </div>
  );
}
