import { Outlet, useNavigate } from "react-router";
import Sidebar from "../components/sidebar";
import type { RootState } from "../redux/store";
import { useEffect } from "react";
import { fetchUser } from "../redux/slices/user.slice";
import { useAppDispatch, useAppSelector } from "../hooks/useAppDispatch";
import type { IContextMain } from "../types/global.interface";
import type { IUser } from "../types/user.interface";

export default function MainLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useAppSelector((state: RootState) => state.user.value);
  const userStatus = useAppSelector((state: RootState) => state.user.status);

  useEffect(() => {
    if (userStatus === "idle" && Object.keys(user).length === 0) {
      dispatch(fetchUser());
    }
  }, [dispatch, user, userStatus]);

  if (userStatus === "failed" && Object.keys(user).length === 0) {
    navigate("/auth/login");
  }

  const context: IContextMain = {
    user: user as IUser,
    userStatus,
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
