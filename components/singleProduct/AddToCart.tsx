import { Button } from "../ui/button";

const AddToCart = ({ id }: { id: string }) => {
  return (
    <Button className="capitalize mt-8" size="lg">
      Add to cart
    </Button>
  );
};

export default AddToCart;
