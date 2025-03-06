"use client";

import { useState } from "react";
import ColorSelector from "./ColorSelector";
import AddToCart from "./AddToCart";

type SelectedOptions = {
  colorIndex: number;
  sizeIndex: number;
};

type SizeOption = {
  id: number;
  size: string;
  quantity: number;
  colorId: number;
};

type ColorOption = {
  id: number;
  color_name: string;
  color_hex: string;
  productId: number;
};

type Option = ColorOption & {
  sizes: SizeOption[];
};

const ChoosePurchase = ({ options }: { options: Option[] }) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOptions>({
    colorIndex: 0,
    sizeIndex: 0,
  });

  const selectedSize =
    options[selectedOptions.colorIndex].sizes[selectedOptions.sizeIndex];

  return (
    <>
      <ColorSelector
        options={options}
        selectedOptions={selectedOptions}
        onOptionsChange={setSelectedOptions}
      />
      <AddToCart
        productSizeId={selectedSize.id}
        maxQuantity={selectedSize.quantity}
      />
    </>
  );
};

export default ChoosePurchase;
