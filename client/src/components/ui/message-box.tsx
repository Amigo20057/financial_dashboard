import { motion, AnimatePresence } from "framer-motion";

interface IProps {
  text: string;
  type: "success" | "info" | "error";
}

const colorClasses: Record<IProps["type"], string> = {
  success: "bg-green-500",
  info: "bg-blue-500",
  error: "bg-red-500",
};

export default function MessageBox({ text, type }: IProps) {
  const bgClass = colorClasses[type];

  return (
    <AnimatePresence>
      {text && (
        <motion.div
          key={text}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className={`${bgClass} text-white p-4 rounded-md mt-4 shadow-lg`}
        >
          {text}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
