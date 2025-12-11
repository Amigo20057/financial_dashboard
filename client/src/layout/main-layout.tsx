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
import { fetchCategories } from "../redux/slices/category.slice";
// import { fetchTransactions } from "../redux/slices/transaction.slice";
import type { ICategory } from "../types/category.interface";

export default function MainLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const user = useAppSelector((state: RootState) => state.user.value);
  const userStatus = useAppSelector((state: RootState) => state.user.status);

  const dashboard = useAppSelector((state: RootState) => state.dashboard.value);
  const dashboardStatus = useAppSelector(
    (state: RootState) => state.dashboard.status
  );

  const categories = useAppSelector((state: RootState) => state.category.value);
  const categoryStatus = useAppSelector(
    (state: RootState) => state.category.status
  );

  // const transactions = useAppSelector(
  //   (state: RootState) => state.transaction.value
  // );
  // const transactionStatus = useAppSelector(
  //   (state: RootState) => state.transaction.status
  // );

  useEffect(() => {
    if (userStatus === "idle") {
      dispatch(fetchUser());
    }
  }, [dispatch, userStatus]);

  useEffect(() => {
    if (userStatus === "succeeded") {
      if (dashboardStatus === "idle") dispatch(fetchDashboard());
      if (categoryStatus === "idle") dispatch(fetchCategories());
      // if (transactionStatus === "idle") dispatch(fetchTransactions());
    }

    if (userStatus === "failed") {
      navigate("/auth/login");
    }
  }, [
    userStatus,
    dashboardStatus,
    categoryStatus,
    // transactionStatus,
    dispatch,
    navigate,
  ]);

  const isLoading =
    userStatus === "loading" ||
    dashboardStatus === "loading" ||
    categoryStatus === "loading";
  // transactionStatus === "loading";

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <div className="text-xl font-bold animate-pulse">Loading...</div>
      </div>
    );
  }

  const context: IContextMain = {
    user: user as IUser,
    userStatus,
    dashboard: dashboard as IDashboard,
    dashboardStatus,
    categories: categories as ICategory[],
    categoriesStatus: categoryStatus,
    // transactions: transactions as ITransaction[],
    // transactionStatus: transactionStatus,
  };

  return (
    <div className="min-h-screen w-full bg-gray-50 text-gray-900">
      <div className="flex h-screen p-3 mx-auto gap-6">
        <Sidebar />
        <main className="flex-1">
          <Outlet context={context} />
        </main>
      </div>
    </div>
  );
}
