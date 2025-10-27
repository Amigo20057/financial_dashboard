interface IProps {
  text: string;
  type: "success" | "info" | "error";
}

export default function MessageBox({ text, type }: IProps) {}
