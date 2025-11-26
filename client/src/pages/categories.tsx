import { useState } from "react";
import { Button, Modal, Input, Space, Card, ColorPicker } from "antd";
import { PlusOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";

interface ICategory {
  id: number;
  name: string;
  color: string;
  value: number;
}

const mockCategories: ICategory[] = [
  { id: 1, name: "Їжа", color: "#4F46E5", value: 420 },
  { id: 2, name: "Транспорт", color: "#06B6D4", value: 180 },
  { id: 3, name: "Розваги", color: "#F59E0B", value: 240 },
  { id: 4, name: "Комуналка", color: "#EF4444", value: 300 },
  { id: 5, name: "Інше", color: "#10B981", value: 519.5 },
];

export default function Categories() {
  const [categories, setCategories] = useState<ICategory[]>(mockCategories);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [name, setName] = useState("");
  const [color, setColor] = useState("#4F46E5");

  const handleSave = () => {
    if (editingId) {
      setCategories(
        categories.map((cat) =>
          cat.id === editingId ? { ...cat, name, color } : cat
        )
      );
    } else {
      const newCategory: ICategory = {
        id: Date.now(),
        name,
        color,
        value: 0,
      };
      setCategories([...categories, newCategory]);
    }
    setIsModalOpen(false);
    setEditingId(null);
    setName("");
    setColor("#4F46E5");
  };

  const handleDelete = (id: number) => {
    setCategories(categories.filter((cat) => cat.id !== id));
  };

  const handleEdit = (category: ICategory) => {
    setEditingId(category.id);
    setName(category.name);
    setColor(category.color);
    setIsModalOpen(true);
  };

  const openCreateModal = () => {
    setEditingId(null);
    setName("");
    setColor("#4F46E5");
    setIsModalOpen(true);
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
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={openCreateModal}
          size="large"
        >
          Створити категорію
        </Button>
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
                <Bar dataKey="value" radius={[0, 8, 8, 0]}>
                  {categories.map((entry, index) => (
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
            {categories.map((category) => (
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
                        {category.value} ₴
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

      <Modal
        title={
          <span className="text-lg">
            {editingId ? "Редагувати категорію" : "Створити категорію"}
          </span>
        }
        open={isModalOpen}
        onOk={handleSave}
        onCancel={() => setIsModalOpen(false)}
        okText="Зберегти"
        cancelText="Скасувати"
      >
        <div className="space-y-4 mt-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Назва</label>
            <Input
              placeholder="Введіть назву категорії"
              value={name}
              onChange={(e) => setName(e.target.value)}
              size="large"
            />
          </div>
          <div>
            <label className="block mb-2 text-sm font-medium">Колір</label>
            <ColorPicker
              value={color}
              onChange={(_, hex) => setColor(hex)}
              showText
              size="large"
              className="w-full"
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
