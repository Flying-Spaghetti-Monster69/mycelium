import Link from "next/link";
import { Button } from "../ui/button";
import { MdOutlineShoppingBag } from "react-icons/md";
const CartButton = async () => {
  const numsItemsInCart = 0;

  return (
    <Button
      asChild
      variant="outline"
      size="icon"
      className="flex justify-center items-center relative"
    >
      <Link href="/cart">
        <MdOutlineShoppingBag />
        <span className="absolute h-6 w-6 flex items-center justify-center -top-3 -right-3 bg-[#004d26] text-white rounded-full text-xs ">
          {numsItemsInCart}
        </span>
      </Link>
    </Button>
  );
};

export default CartButton;
