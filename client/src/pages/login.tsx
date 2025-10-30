import { useOutletContext } from "react-router";
import Form from "../components/ui/form";

interface IContext {
  setMessageText: (text: string) => void;
  setMessageType: (type: "success" | "info" | "error") => void;
}

export default function Login() {
  const { setMessageText, setMessageType } = useOutletContext<IContext>();

  return (
    <div>
      <Form
        type="login"
        setMessageText={setMessageText}
        setMessageType={setMessageType}
      />
    </div>
  );
}
