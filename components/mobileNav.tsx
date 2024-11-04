"use client"

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MobileNavProps {
  data: Category[];
}

const MobileNav: React.FC<MobileNavProps> = ({ data }) => {
  const pathName = usePathname();
  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathName === `/category/${route.id}`,
  }));

  return (
    <div className="grid gap-2 py-6">
      {routes.map((route) => (
        <Link 
        href={route.href} 
        key={route.href}
        className={cn(
            "transition-colors hover:text-black flex w-full items-center py-2 text-lg font-semibold",
            route.active ? "text-black" : "text-neutral-500"
        )}
        >
            {route.label}
        </Link>
      ))}
    </div>
  );
};

export default MobileNav;
