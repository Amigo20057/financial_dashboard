type VariantStyles = "purple";

interface IProps {
  customStyles?: string;
  text: string;
  onClickEvent: () => void;
  variantStyles?: VariantStyles;
}

export default function CommonButton({
  onClickEvent,
  text,
  customStyles = "",
  variantStyles = "purple",
}: IProps) {
  let buttonStyles;

  switch (variantStyles) {
    case "purple":
      buttonStyles = "w-[200px] h-full bg-[#4f39f6] rounded-xl";
      break;
    default:
      buttonStyles = "";
      break;
  }

  return (
    <div
      className={`flex items-center justify-center text-white text-[18px] cursor-pointer ${buttonStyles} ${customStyles}`}
      onClick={onClickEvent}
    >
      {text}
    </div>
  );
}
