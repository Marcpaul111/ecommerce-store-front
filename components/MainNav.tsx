"use client"

import { cn } from "@/lib/utils";
import { Category } from "@/types";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface MainNavProps {
  data: Category[];
}

const MainNav: React.FC<MainNavProps> = ({ data }) => {
  const pathName = usePathname();
  const routes = data.map((route) => ({
    href: `/category/${route.id}`,
    label: route.name,
    active: pathName === `/category/${route.id}`,
  }));

  return (
    <nav className="mx-6 lg:flex items space-x-4 lg:space-x-6 hidden">
      {routes.map((route) => (
        <Link 
        href={route.href} 
        key={route.href}
        className={cn(
          "relative text-sm font-medium transition-colors hover:text-black",
          route.active ? "text-black" : "text-neutral-500",
          "after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-full after:origin-bottom-right after:scale-x-0 dark:after:bg-white after:bg-neutral-800 after:transition-transform after:duration-300 after:ease-[cubic-bezier(0.65_0.05_0.36_1)] hover:after:origin-bottom-left hover:after:scale-x-100"
        )}
        >
            {route.label}
        </Link>
      ))}
    </nav>
  );
};

export default MainNav;
