"use client";

import { useState, useEffect } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Available sizes for selection
const availableSizes = ["XS", "S", "M", "L", "XL", "XXL"];

type SizeQuantity = {
  size: string;
  quantity: number;
};

interface SizeQuantitySelectorProps {
  value?: Array<{ size: string; quantity: number }>;
  onChange?: (sizes: Array<{ size: string; quantity: number }>) => void;
}
export default function SizeQuantitySelector({
  value = [],
  onChange,
}: SizeQuantitySelectorProps) {
  const [selectedItems, setSelectedItems] = useState<SizeQuantity[]>(value);
  const [currentSize, setCurrentSize] = useState<string>("");

  // Sync with parent value when it changes
  useEffect(() => {
    if (JSON.stringify(value) !== JSON.stringify(selectedItems)) {
      setSelectedItems(value);
    }
  }, [value]);

  // Get remaining sizes that haven't been selected yet
  const remainingSizes = availableSizes.filter(
    (size) => !selectedItems.some((item) => item.size === size)
  );

  // Add a new size with default quantity of 1
  const addSize = () => {
    if (
      currentSize &&
      !selectedItems.some((item) => item.size === currentSize)
    ) {
      const newItems = [...selectedItems, { size: currentSize, quantity: 1 }];
      setSelectedItems(newItems);
      onChange?.(newItems); // Call onChange directly instead of using useEffect
      setCurrentSize("");
    }
  };

  // Update quantity for a specific size
  const updateQuantity = (size: string, quantity: number) => {
    const newItems = selectedItems.map((item) =>
      item.size === size ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setSelectedItems(newItems);
    onChange?.(newItems); // Call onChange directly
  };

  // Remove a size from selection
  const removeSize = (size: string) => {
    const newItems = selectedItems.filter((item) => item.size !== size);
    setSelectedItems(newItems);
    onChange?.(newItems); // Call onChange directly
  };

  return (
    <div className="w-full max-w-md space-y-6">
      <div>
        <div className="mt-2 flex gap-2">
          <Select
            value={currentSize}
            onValueChange={setCurrentSize}
            disabled={remainingSizes.length === 0}
          >
            <SelectTrigger id="size-select" className="w-full">
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {remainingSizes.map((size) => (
                <SelectItem key={size} value={size}>
                  {size}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button
            type="button"
            onClick={addSize}
            disabled={!currentSize || remainingSizes.length === 0}
            className="shrink-0"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>

      {selectedItems.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-sm font-medium text-muted-foreground">
            Selected sizes:
          </h3>
          <div className="space-y-3">
            {selectedItems.map((item) => (
              <div
                key={item.size}
                className="flex items-center gap-3 rounded-md border p-3"
              >
                <div className="flex-1">
                  <p className="font-medium">{item.size}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Label htmlFor={`quantity-${item.size}`} className="sr-only">
                    Quantity for size {item.size}
                  </Label>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-2">
                      Qty:
                    </span>
                    <Input
                      id={`quantity-${item.size}`}
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(
                          item.size,
                          Number.parseInt(e.target.value) || 1
                        )
                      }
                      className="w-16 h-8"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeSize(item.size)}
                    className="h-8 w-8"
                  >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Remove size {item.size}</span>
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <p className="text-sm font-medium">Summary:</p>
            <ul className="mt-1 text-sm">
              {selectedItems.map((item) => (
                <li key={item.size}>
                  {item.size}: {item.quantity}{" "}
                  {item.quantity === 1 ? "unit" : "units"}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {selectedItems.length === 0 && (
        <p className="text-sm text-muted-foreground">No sizes selected yet.</p>
      )}
    </div>
  );
}
