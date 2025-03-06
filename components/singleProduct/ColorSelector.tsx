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
type SelectedOptions = {
  colorIndex: number;
  sizeIndex: number;
};

interface ColorSelectorProps {
  options: Option[];
  selectedOptions: SelectedOptions;
  onOptionsChange: (options: SelectedOptions) => void;
}

const ColorSelector = ({
  options,
  selectedOptions,
  onOptionsChange,
}: ColorSelectorProps) => {
  const { colorIndex, sizeIndex } = selectedOptions;

  return (
    <>
      <div className="flex gap-2 mt-4">
        {options.map((option, index) => {
          return (
            <button
              key={option.id}
              className={
                colorIndex === index
                  ? `border-primary border-2 w-6 h-6`
                  : `border-white border-2 w-6 h-6`
              }
              style={{ backgroundColor: option.color_hex }}
              onClick={() => {
                onOptionsChange({ colorIndex: index, sizeIndex: 0 });
              }}
            ></button>
          );
        })}
      </div>

      <div className="flex gap-2 mt-4">
        {options[colorIndex].sizes.map((size, index) => {
          return (
            <Button
              variant={sizeIndex === index ? "default" : "secondary"}
              key={size.id}
              onClick={() => onOptionsChange({ colorIndex, sizeIndex: index })}
            >
              {size.size}
            </Button>
          );
        })}
      </div>
      <p className="text-lg my-2">
        Stock: {options[colorIndex].sizes[sizeIndex].quantity}
      </p>
    </>
  );
};

export default ColorSelector;
