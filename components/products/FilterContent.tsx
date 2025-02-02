"use client";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { DualRangeSlider } from "../ui/dual-range-slider";
import { Button } from "../ui/button";

const filters = [
  {
    id: "category",
    name: "Category",
    options: ["T-Shirts", "Jeans", "Dresses", "Jackets"],
  },
  {
    id: "size",
    name: "Size",
    options: ["XS", "S", "M", "L", "XL"],
  },
  {
    id: "color",
    name: "Color",
    options: ["Black", "White", "Blue", "Red", "Green"],
  },
];

const FilterContent = () => {
  const [priceRange, setPriceRange] = useState([1000, 500000]);

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        {filters.map((section) => (
          <AccordionItem value={section.id} key={section.id}>
            <AccordionTrigger>{section.name}</AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {section.options.map((option) => (
                  <div className="flex items-center space-x-2" key={option}>
                    <Checkbox id={`${section.id}-${option}`} />
                    <Label htmlFor={`${section.id}-${option}`}>{option}</Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-2">Price Range</h3>
        <DualRangeSlider
          min={1000}
          max={500000}
          step={1000}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value)}
          className="mb-2"
        />

        <div className="flex justify-between text-sm text-gray-500">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
      <Button className="w-full mt-6">Apply Filters</Button>
    </>
  );
};

export default FilterContent;
