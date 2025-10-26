import { useNavigate } from "react-router";

interface IProps {
  text: string;
  path: string;
}

export default function SidebarBtn({ text, path }: IProps) {
  const navigation = useNavigate();
  return (
    <button
      className="text-left py-2 px-3 cursor-pointer rounded hover:bg-gray-100"
      onClick={() => {
        navigation(path);
      }}
    >
      {text}
    </button>
  );
}
