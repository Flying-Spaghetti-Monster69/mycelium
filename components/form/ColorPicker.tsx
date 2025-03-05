import { Input } from "@/components/ui/input";

interface ColorPickerProps {
  color: string;
  onChange: (value: string) => void;
}

export function ColorPicker({ color, onChange }: ColorPickerProps) {
  return (
    <div className="flex items-center gap-2">
      <Input
        type="color"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        className="w-12 h-10 p-1 rounded cursor-pointer"
      />
      <Input
        type="text"
        value={color}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Color"
        className="flex-1"
      />
    </div>
  );
}
