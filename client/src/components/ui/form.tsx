import { useForm } from "react-hook-form";
import type { ILogin, IRegister } from "../../types/user.interface";
import { Link, useNavigate } from "react-router";
import { loginUser, registerUser } from "../../redux/slices/user.slice";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppDispatch";
import type { RootState } from "../../redux/store";

interface IProps {
  type: "login" | "register";
  setMessageType?: (type: "success" | "info" | "error") => void;
  setMessageText?: (text: string) => void;
}

export default function Form({ type, setMessageType, setMessageText }: IProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    watch,
  } = useForm<IRegister & ILogin>({
    mode: "onChange",
  });
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userState = useAppSelector((state: RootState) => state.user);

  const watchedFields = watch();

  const isFormValid = () => {
    if (type === "register") {
      return (
        watchedFields.fullName &&
        watchedFields.email &&
        watchedFields.password &&
        isValid
      );
    } else {
      return watchedFields.email && watchedFields.password && isValid;
    }
  };

  const onSubmit = async (data: IRegister | ILogin) => {
    try {
      let result;
      if (type === "register") {
        result = await dispatch(registerUser(data as IRegister)).unwrap();
      } else if (type === "login") {
        result = await dispatch(loginUser(data as ILogin)).unwrap();
      }
      if (result) {
        navigate("/dashboard");
      }
    } catch (err: unknown) {
      if (setMessageType && setMessageText) {
        setMessageType("error");
        setMessageText(err instanceof Error ? err.message : String(err));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold !text-gray-900">
          {type === "register" ? "Створити акаунт" : "Ласкаво просимо назад"}
        </h2>
        <p className="text-gray-600 text-sm mt-1">
          {type === "register"
            ? "Зареєструйтесь, щоб розпочати"
            : "Увійдіть у свій обліковий запис"}
        </p>
      </div>

      {type === "register" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ПІ
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className={`h-5 w-5 ${
                    errors.fullName ? "text-red-400" : "text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <input
                type="text"
                {...register("fullName", {
                  required: "ПІ є обов'язковим",
                  minLength: {
                    value: 2,
                    message: "Ім'я має містити щонайменше 2 символи",
                  },
                  maxLength: {
                    value: 50,
                    message: "Ім'я не повинно перевищувати 50 символів",
                  },
                  validate: {
                    hasTwoWords: (value) =>
                      value.trim().split(" ").length >= 2 ||
                      "Повне ім'я повинно містити щонайменше ім'я та прізвище",
                  },
                })}
                placeholder="John Doe"
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-4 outline-none transition-all duration-200 !text-gray-900 placeholder-gray-400 ${
                  errors.fullName
                    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                }`}
              />
              {errors.fullName && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            {errors.fullName && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Електронна пошта
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className={`h-5 w-5 ${
                    errors.email ? "text-red-400" : "text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              <input
                type="email"
                {...register("email", {
                  required: "Необхідно вказати адресу електронної пошти",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Недійсна адреса електронної пошти",
                  },
                })}
                placeholder="john@example.com"
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-4 outline-none transition-all duration-200 !text-gray-900 placeholder-gray-400 ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                }`}
              />
              {errors.email && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Пароль
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className={`h-5 w-5 ${
                    errors.password ? "text-red-400" : "text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                type="password"
                {...register("password", {
                  required: "Необхідно ввести пароль",
                  minLength: {
                    value: 5,
                    message: "Пароль має містити щонайменше 5 символів",
                  },
                  maxLength: {
                    value: 100,
                    message: "Пароль не повинен перевищувати 100 символів",
                  },
                })}
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-4 outline-none transition-all duration-200 !text-gray-900 placeholder-gray-400 ${
                  errors.password
                    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                }`}
              />
              {errors.password && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            {errors.password && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
      )}

      {type === "login" && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Електронна пошта
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className={`h-5 w-5 ${
                    errors.email ? "text-red-400" : "text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </div>
              <input
                type="email"
                {...register("email", {
                  required: "Необхідно вказати адресу електронної пошти",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Недійсна адреса електронної пошти",
                  },
                })}
                placeholder="john@example.com"
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-4 outline-none transition-all duration-200 !text-gray-900 placeholder-gray-400 ${
                  errors.email
                    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                }`}
              />
              {errors.email && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            {errors.email && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Пароль
              </label>
            </div>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className={`h-5 w-5 ${
                    errors.password ? "text-red-400" : "text-gray-400"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <input
                type="password"
                {...register("password", {
                  required: "Необхідно ввести пароль",
                  minLength: {
                    value: 5,
                    message: "Пароль має містити щонайменше 5 символів",
                  },
                })}
                placeholder="••••••••"
                className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:ring-4 outline-none transition-all duration-200 !text-gray-900 placeholder-gray-400 ${
                  errors.password
                    ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                    : "border-gray-200 focus:border-blue-500 focus:ring-blue-100"
                }`}
              />
              {errors.password && (
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                  <svg
                    className="h-5 w-5 text-red-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </div>
            {errors.password && (
              <p className="mt-1.5 text-sm text-red-600 flex items-center">
                <svg
                  className="w-4 h-4 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
      )}

      <button
        type="submit"
        disabled={!isFormValid() || userState.status === "loading"}
        className={`w-full py-3.5 px-4 rounded-xl font-semibold text-white transition-all duration-200 flex items-center justify-center gap-2
    ${
      !isFormValid() || userState.status === "loading"
        ? "bg-gray-400 cursor-not-allowed"
        : "bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700"
    }`}
      >
        {userState.status === "loading" && (
          <svg
            className="animate-spin h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        )}
        {userState.status === "loading"
          ? "Обробка..."
          : type === "register"
          ? "Створити акаунт"
          : "Увійти"}
      </button>

      <p className="text-center text-sm text-gray-600 mt-6">
        {type === "register" ? (
          <>
            Вже є акаунт?{" "}
            <Link
              to="/auth/login"
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Увійти
            </Link>
          </>
        ) : (
          <>
            Немає облікового запису?{" "}
            <Link
              to="/auth/register"
              className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Зареєструватися
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
