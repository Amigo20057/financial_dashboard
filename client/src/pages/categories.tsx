import { useState } from "react";
import { Button, Space, Card } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import CreateCategoryModal from "../components/ui/create-category-modal";
import { useOutletContext } from "react-router";
import type { IContextMain } from "../types/global.interface";
import type { ICategory } from "../types/category.interface";
import { useAppDispatch } from "../hooks/useAppDispatch";
import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "../redux/slices/category.slice";
import CommonButton from "../components/ui/common-btn";

export default function Categories() {
  const { categories, categoriesStatus } = useOutletContext<IContextMain>();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<ICategory | null>(
    null
  );
  const dispatch = useAppDispatch();

  console.log("status: ", categoriesStatus);
  console.log("Categories from context:", categories);

  if (!Array.isArray(categories)) {
    return <div>Loading...</div>;
  }

  const handleSave = (name: string, color: string) => {
    if (editingCategory) {
      dispatch(updateCategory({ id: editingCategory.id, name, color }));
    } else {
      const newCategory: ICategory = {
        id: Date.now(),
        name,
        color,
        amount: "0",
      };
      dispatch(createCategory(newCategory));
    }
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleDelete = (id: number) => {
    dispatch(deleteCategory(id));
  };

  const handleEdit = (category: ICategory) => {
    setEditingCategory(category);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingCategory(null);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-[26px] text-black">Категорії витрат</h1>
          <p className="text-gray-600">
            Керуйте категоріями для відстеження витрат
          </p>
        </div>
        {/* <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={openCreateModal}
          size="large"
        >
          Створити категорію
        </Button> */}
        <CommonButton
          text="+ Створити категорію"
          onClickEvent={openCreateModal}
          variantStyles="purple"
          customStyles="!h-[50px]"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        <div className="col-span-2 bg-white p-6 rounded-2xl shadow">
          <div className="flex items-center justify-between mb-4">
            <div className="font-semibold text-black text-lg">
              Витрати по категоріям
            </div>
            <div className="text-xs text-gray-500">Цей місяць</div>
          </div>
          <div style={{ height: 400 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categories} layout="vertical">
                <XAxis type="number" stroke="#666" />
                <YAxis
                  type="category"
                  dataKey="name"
                  width={120}
                  stroke="#666"
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#fff",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                    color: "#000",
                  }}
                />
                <Bar dataKey="amount" radius={[0, 8, 8, 0]}>
                  {categories?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow">
          <div className="font-semibold text-black text-lg mb-4">
            Всі категорії
          </div>
          <div className="space-y-3 max-h-[400px] overflow-y-auto">
            {categories?.map((category) => (
              <Card
                key={category.id}
                className="bg-gray-50 border border-gray-200"
                bodyStyle={{ padding: "12px" }}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div
                      style={{
                        width: 20,
                        height: 20,
                        backgroundColor: category.color,
                        borderRadius: "4px",
                      }}
                    />
                    <div>
                      <div className="text-black font-semibold">
                        {category.name}
                      </div>
                      <div className="text-gray-600 text-sm">
                        {category.amount} ₴
                      </div>
                    </div>
                  </div>
                  <Space>
                    <Button
                      type="text"
                      icon={<EditOutlined />}
                      onClick={() => handleEdit(category)}
                      className="text-gray-600 hover:text-black"
                    />
                    <Button
                      type="text"
                      danger
                      icon={<DeleteOutlined />}
                      onClick={() => handleDelete(category.id)}
                      className="hover:!bg-transparent"
                    />
                  </Space>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>

      <CreateCategoryModal
        isOpen={isModalOpen}
        editingCategory={editingCategory}
        onClose={handleCloseModal}
        onSave={handleSave}
      />
    </div>
  );
}
