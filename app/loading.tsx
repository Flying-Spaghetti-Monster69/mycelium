import { AiOutlineLoading3Quarters } from "react-icons/ai";

const loading = () => {
  return (
    <div className="flex justify-center items-center text-primary h-[calc(100vh-113.6px)]">
      <AiOutlineLoading3Quarters className="w-16 h-16 animate-spin" />
    </div>
  );
};

export default loading;
