import { GiPlantRoots } from "react-icons/gi";
import { Button } from "../ui/button";
import Link from "next/link";

const Logo = () => {
  return (
    <Button size="icon" className="w-16 h-12" variant="ghost" asChild>
      <Link href="/">
        <GiPlantRoots
          style={{ width: "100%", height: "100%", padding: "0.25rem" }}
          className="text-[#004d26] hover:text-[#004d26] transition-colors"
        />
      </Link>
    </Button>
  );
};

export default Logo;
