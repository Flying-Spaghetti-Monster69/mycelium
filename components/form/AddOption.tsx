"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, X } from "lucide-react";
import { ColorPicker } from "./ColorPicker";
import SizeQuantitySelector from "./SizeQuantitySelector";

// Update the type to include sizes instead of field3
type InputRow = {
  color_hex: string;
  color_name: string;
  sizes: Array<{ size: string; quantity: number }>;
};

export default function AddOption() {
  const [rows, setRows] = useState<InputRow[]>([
    { color_hex: "#000000", color_name: "", sizes: [] },
  ]);

  const addRow = () => {
    setRows([...rows, { color_hex: "#000000", color_name: "", sizes: [] }]);
  };

  const removeRow = (index: number) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  // Add this new function to handle size changes
  const handleSizeChange = (
    index: number,
    sizes: Array<{ size: string; quantity: number }>
  ) => {
    const newRows = [...rows];
    newRows[index].sizes = sizes;
    setRows(newRows);
  };

  const handleInputChange = (
    index: number,
    field: keyof InputRow,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value: any
  ) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  return (
    <div className="w-full mx-auto space-y-4 p-4">
      <input type="hidden" name="options" value={JSON.stringify(rows)} />
      {rows.map((row, index) => (
        <div
          key={index}
          className="flex flex-col sm:flex-row items-start sm:items-center gap-2 p-4 border rounded-md"
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 w-full">
            <div className="flex items-center gap-2">
              <ColorPicker
                color={row.color_hex}
                onChange={(value) =>
                  handleInputChange(index, "color_hex", value)
                }
              />
            </div>
            <div className="flex items-center gap-2">
              <Input
                value={row.color_name}
                onChange={(e) =>
                  handleInputChange(index, "color_name", e.target.value)
                }
                placeholder="Color Name"
                className="flex-1"
              />
            </div>
            <div className="flex-1">
              <SizeQuantitySelector
                value={row.sizes}
                onChange={(sizes) => handleSizeChange(index, sizes)}
              />
            </div>
          </div>

          {rows.length > 1 && (
            <Button
              variant="outline"
              type="button"
              size="icon"
              onClick={() => removeRow(index)}
              aria-label="Remove row"
              className="mt-2 sm:mt-0"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}

      <Button
        onClick={addRow}
        type="button"
        variant="outline"
        className="flex items-center gap-2"
      >
        <Plus className="h-4 w-4" />
        <span>Add Row</span>
      </Button>
    </div>
  );
}
