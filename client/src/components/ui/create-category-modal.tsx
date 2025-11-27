import { Input, ColorPicker } from "antd";
import { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { XOutlined } from "@ant-design/icons";
import type { ICategory } from "../../types/category.interface";

interface IFormData {
  name: string;
  color: string;
}

interface Props {
  isOpen: boolean;
  editingCategory: ICategory | null;
  onClose: () => void;
  onSave: (name: string, color: string) => void;
}

export default function CreateCategoryModal({
  isOpen,
  editingCategory,
  onClose,
  onSave,
}: Props) {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IFormData>({
    defaultValues: {
      name: "",
      color: "#4F46E5",
    },
  });

  useEffect(() => {
    if (editingCategory) {
      reset({
        name: editingCategory.name,
        color: editingCategory.color,
      });
    } else {
      reset({
        name: "",
        color: "#4F46E5",
      });
    }
  }, [editingCategory, isOpen, reset]);

  const onSubmit = (data: IFormData) => {
    onSave(data.name, data.color);
    reset();
  };

  const handleCancel = () => {
    reset();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-white rounded-2xl w-[90%] max-w-lg p-8 shadow-xl relative animate-slideUp">
        <button
          onClick={handleCancel}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition"
        >
          <XOutlined />
        </button>

        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {editingCategory ? "Редагувати категорію" : "Створити категорію"}
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Назва</label>
            <Controller
              name="name"
              control={control}
              rules={{
                required: "Назва обов'язкова",
                minLength: {
                  value: 2,
                  message: "Назва має бути не менше 2 символів",
                },
              }}
              render={({ field }) => (
                <Input
                  {...field}
                  placeholder="Введіть назву категорії"
                  size="large"
                  status={errors.name ? "error" : ""}
                />
              )}
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium">Колір</label>
            <Controller
              name="color"
              control={control}
              rules={{ required: "Оберіть колір" }}
              render={({ field }) => (
                <ColorPicker
                  value={field.value}
                  onChange={(_, hex) => field.onChange(hex)}
                  showText
                  size="large"
                  className="w-full"
                />
              )}
            />
            {errors.color && (
              <p className="text-red-500 text-sm mt-1">
                {errors.color.message}
              </p>
            )}
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={handleCancel}
              className="px-4 py-2 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
            >
              Скасувати
            </button>
            <button
              type="submit"
              className="px-5 py-2 rounded-xl bg-indigo-600 text-white font-medium hover:bg-indigo-700 transition shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
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
