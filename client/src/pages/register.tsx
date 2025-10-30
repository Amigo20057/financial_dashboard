import { useOutletContext } from "react-router";
import Form from "../components/ui/form";

interface IContext {
  setMessageText: (text: string) => void;
  setMessageType: (type: "success" | "info" | "error") => void;
}

export default function Register() {
  const { setMessageText, setMessageType } = useOutletContext<IContext>();

  return (
    <div>
      <Form
        type="register"
        setMessageText={setMessageText}
        setMessageType={setMessageType}
      />
    </div>
  );
}
