"use client";
import { useState } from "react";
import { Button } from "../ui/button";

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

const ColorSelector = ({ options }: { options: Option[] }) => {
  const [selectedColorIndex, setSelectedColorIndex] = useState(0);
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);

  return (
    <>
      <div className="flex gap-2 mt-4">
        {options.map((option, index) => {
          return (
            <button
              key={option.id}
              className={
                selectedColorIndex === index
                  ? `border-primary border-2 w-6 h-6`
                  : `border-white border-2 w-6 h-6`
              }
              style={{ backgroundColor: option.color_hex }}
              onClick={() => {
                setSelectedSizeIndex(0);
                setSelectedColorIndex(index);
              }}
            ></button>
          );
        })}
      </div>

      <div className="flex gap-2 mt-4">
        {options[selectedColorIndex].sizes.map((size, index) => {
          return (
            <Button
              variant={selectedSizeIndex === index ? "default" : "secondary"}
              key={size.id}
              onClick={() => setSelectedSizeIndex(index)}
            >
              {size.size}
            </Button>
          );
        })}
      </div>
      <p className="text-lg my-2">
        Stock: {options[selectedColorIndex].sizes[selectedSizeIndex].quantity}
      </p>
    </>
  );
};

export default ColorSelector;
