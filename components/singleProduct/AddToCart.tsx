"use client";
import { useEffect, useState } from "react";
import SelectProductAmount from "./SingleProductAmount";
import { Mode } from "./SingleProductAmount";
import FormContainer from "../form/FormContainer";
import { SubmitButton } from "../form/Buttons";
import { addToCartAction } from "@/utils/actions";
import { useAuth } from "@clerk/nextjs";
import { ProductSignInButton } from "../form/Buttons";

function AddToCart({
  productSizeId,
  maxQuantity,
}: {
  productSizeId: number;
  maxQuantity: number;
}) {
  const [amount, setAmount] = useState(1);
  useEffect(() => {
    setAmount(1);
  }, [productSizeId]);
  const { userId } = useAuth();
  return (
    <div className="mt-4">
      <SelectProductAmount
        mode={Mode.SingleProduct}
        maxAmount={maxQuantity}
        amount={amount}
        setAmount={setAmount}
      />
      {userId ? (
        <FormContainer action={addToCartAction}>
          <input type="hidden" name="productSizeId" value={productSizeId} />
          <input type="hidden" name="amount" value={amount} />
          <SubmitButton text="add to cart" className="mt-8" />
        </FormContainer>
      ) : (
        <ProductSignInButton />
      )}
    </div>
  );
}
export default AddToCart;
