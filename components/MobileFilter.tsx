"use client";

import { useState } from "react";

import { Color, Size } from "@/types";
import { Button } from "@/components/ui/button";
import { Plus, X } from "lucide-react";
import { Dialog, DialogPanel } from "@headlessui/react";
import IconButton from "@/components/ui/icon-button";
import Filter from "./Filter";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

interface MobileFilterProps {
  sizes: Size[];
  colors: Color[];
}

const MobileFilter: React.FC<MobileFilterProps> = ({ sizes, colors }) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => setOpen(false);

  return (
    <>
      <Sheet>
        <SheetTrigger className="flex gap-x-2 items-center lg:hidden bg-black text-white px-4 py-2 rounded-lg">
          Filters
          <Plus size={20} />
        </SheetTrigger>

        <SheetContent>
          <SheetHeader>
            <SheetTitle>Filters</SheetTitle>
            <SheetDescription></SheetDescription>
          </SheetHeader>
          <div className="">
            {/* filter */}
            <div className="p-4">
              <Filter valueKey="sizeId" name="Sizes" data={sizes} />
              <Filter valueKey="colorId" name="Colors" data={colors} />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileFilter;
