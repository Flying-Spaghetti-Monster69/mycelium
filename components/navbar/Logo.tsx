import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

const Logo = () => {
  return (
    <Button
      size="icon"
      className="w-fit h-fit hover:bg-green-700"
      variant="ghost"
      asChild
    >
      <Link href="/" className="w-16 h-10 p-[-1rem]">
        <Image
          src="/images/Logo1.png"
          width={64}
          height={60}
          alt="Mycelium"
          className=" scale-125"
        />
      </Link>
    </Button>
  );
};

export default Logo;
