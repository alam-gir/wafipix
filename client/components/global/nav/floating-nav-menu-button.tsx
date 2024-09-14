"use client";

import { cn } from "@/lib/utils";
import { FC, useState } from "react";
import NavLinkBox from "./nav-link-box";
import NavboxOverlay from "./navbox-overlay";

interface FloatingNavMenuButtonProps {
  onClick: () => void;
  isMenuOpen: boolean;
}

const FloatingNavMenuButton: FC<FloatingNavMenuButtonProps> = ({
  onClick,
  isMenuOpen,
}) => {
  const [isMouseDown, setMouseDown] = useState<boolean>(false);

  const boxClassName = cn(
    `shadow-accent3 shadow-lg h-10 w-10 round-full bg-primary-foreground rounded-full flex flex-col items-center justify-center gap-1.5 duration-100 transition-all group cursor-pointer`,
    {
      "scale-95": isMouseDown,
      "scale-100": !isMouseDown,
      "fixed top-4 right-4 z-30 md: top-8 right-12": isMenuOpen,
    },
    
  );

  return (
    <div>
      <div
        onClick={onClick}
        onMouseDown={() => setMouseDown(true)}
        onMouseUp={() => setMouseDown(false)}
        className={boxClassName}
      >
        <div
          className={`h-1 w-5 bg-transparent rounded  ${
            isMenuOpen
              ? "absolute -rotate-45 transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              : ""
          }`}
        >
          <div
            className={`h-full w-full bg-primary/60 rounded duration-300 transition-all ${
              !isMenuOpen ? "group-hover:w-6" : ""
            }`}
          />
        </div>
        <div
          className={`h-1 w-5 bg-transparent rounded ${
            isMenuOpen
              ? "absolute rotate-45 transform left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
              : ""
          }`}
        >
          <div
            className={`h-full w-full bg-primary/60 rounded duration-300 transition-all ${
              !isMenuOpen ? "group-hover:w-1/2" : ""
            }`}
          />
        </div>
      </div>
      <div>
        <NavLinkBox isMenuOpen={isMenuOpen} onClick={onClick} />
        <NavboxOverlay onClick={onClick} isMenuOpen={isMenuOpen} />
      </div>
    </div>
  );
};

export default FloatingNavMenuButton;
