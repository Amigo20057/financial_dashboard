import { XOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import type { IUser } from "../../types/user.interface";
import { useAppDispatch } from "../../hooks/useAppDispatch";
import { updateUser } from "../../redux/slices/user.slice";

interface IFormData {
  name: string;
  surname: string;
}

interface Props {
  onClose: () => void;
  user: IUser;
}

export default function UserSettingsModal({ onClose, user }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      name: user.name || "",
      surname: user.surname || "",
    },
  });
  const dispatch = useAppDispatch();

  const submit = async (data: IFormData) => {
    await dispatch(updateUser(data));
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl w-[90%] max-w-lg p-8 shadow-xl relative animate-slideUp">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <XOutlined />
        </button>

        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          Редагування профілю
        </h2>

        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm text-gray-600 mb-1 font-medium">
              Ім’я
            </label>
            <input
              {...register("name", { required: "Введіть ім’я" })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1 font-medium">
              Прізвище
            </label>
            <input
              {...register("surname", { required: "Введіть прізвище" })}
              className="w-full border border-gray-300 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-indigo-500 outline-none"
            />
            {errors.surname && (
              <p className="text-red-500 text-sm mt-1">
                {errors.surname.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
            >
              Скасувати
            </button>

            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 !text-white font-medium hover:bg-indigo-700 transition shadow-sm"
            >
              Зберегти
            </button>
          </div>
        </form>
      </div>

      <style>
        {`
        .animate-fadeIn {
          animation: fadeIn .2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp .25s ease-out;
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        `}
      </style>
    </div>
  );
}
