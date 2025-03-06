"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from "react";

export enum Mode {
  SingleProduct = "singleProduct",
  CartItem = "cartItem",
}

type SelectProductAmountProps = {
  mode: Mode.SingleProduct;
  amount: number;
  maxAmount: number;
  setAmount: (value: number) => void;
};

type SelectCartItemAmountProps = {
  mode: Mode.CartItem;
  amount: number;
  maxAmount: number;
  setAmount: (value: number) => Promise<void>;
  isLoading: boolean;
};

function SelectProductAmount(
  props: SelectProductAmountProps | SelectCartItemAmountProps
) {
  const { mode, amount, maxAmount, setAmount } = props;

  useEffect(() => {
    if (amount > maxAmount) {
      setAmount(1);
    }
  }, [maxAmount, amount, setAmount]);

  const cartItem = mode === Mode.CartItem;

  return (
    <>
      <h4 className="mb-2">Amount : </h4>
      <Select
        value={amount.toString()}
        onValueChange={(value) => setAmount(Number(value))}
        disabled={cartItem ? props.isLoading : false}
      >
        <SelectTrigger
          className={`bg-white ${cartItem ? "w-[100px]" : "w-[150px]"}`}
        >
          <SelectValue placeholder="1" />
        </SelectTrigger>
        <SelectContent>
          {Array.from(
            { length: maxAmount > 10 ? 10 : maxAmount },
            (_, index) => {
              const selectValue = (index + 1).toString();
              return (
                <SelectItem key={selectValue} value={selectValue}>
                  {selectValue}
                </SelectItem>
              );
            }
          )}
        </SelectContent>
      </Select>
    </>
  );
}
export default SelectProductAmount;
