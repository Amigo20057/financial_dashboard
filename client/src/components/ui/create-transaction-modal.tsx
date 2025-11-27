import { XOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import type { ICategory } from "../../types/category.interface";

interface IFormData {
  type: "income" | "expense";
  category: string;
  amount: number;
  date: string;
  description: string;
}

interface Props {
  onClose: () => void;
  categories: ICategory[];
}

export default function CreateTransactionModal({ onClose, categories }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      type: "expense",
      category: categories[0]?.name || "",
      amount: 0,
      date: new Date().toISOString().split("T")[0],
      description: "",
    },
  });

  const submit = async (data: IFormData) => {
    console.log("Submitted data:", data);
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
          Нова транзакція
        </h2>

        <form onSubmit={handleSubmit(submit)} className="flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Тип транзакції
            </label>
            <div className="flex gap-3">
              <label className="flex-1">
                <input
                  type="radio"
                  value="expense"
                  {...register("type")}
                  className="peer sr-only"
                />
                <div className="cursor-pointer px-4 py-3 rounded-xl border-2 border-gray-300 text-center font-medium text-gray-700 peer-checked:border-red-500 peer-checked:bg-red-50 peer-checked:text-red-700 transition">
                  Витрата
                </div>
              </label>
              <label className="flex-1">
                <input
                  type="radio"
                  value="income"
                  {...register("type")}
                  className="peer sr-only"
                />
                <div className="cursor-pointer px-4 py-3 rounded-xl border-2 border-gray-300 text-center font-medium text-gray-700 peer-checked:border-green-500 peer-checked:bg-green-50 peer-checked:text-green-700 transition">
                  Дохід
                </div>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Категорія
            </label>
            <select
              {...register("category", {
                required: "Оберіть категорію",
              })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            >
              {categories.length === 0 ? (
                <option value="">Ви не створили жодної категорії</option>
              ) : (
                categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.name}
                  </option>
                ))
              )}
            </select>
            {errors.category && (
              <p className="text-red-500 text-sm mt-1">
                {errors.category.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Сума
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                {...register("amount", {
                  required: "Введіть суму",
                  min: { value: 0.01, message: "Сума повинна бути більше 0" },
                })}
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                placeholder="0.00"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                ₴
              </span>
            </div>
            {errors.amount && (
              <p className="text-red-500 text-sm mt-1">
                {errors.amount.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Дата
            </label>
            <input
              type="date"
              {...register("date", {
                required: "Оберіть дату",
              })}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
            />
            {errors.date && (
              <p className="text-red-500 text-sm mt-1">{errors.date.message}</p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Опис (необов'язково)
            </label>
            <textarea
              {...register("description")}
              rows={3}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
              placeholder="Додайте коментар до транзакції..."
            />
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
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-sm"
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
