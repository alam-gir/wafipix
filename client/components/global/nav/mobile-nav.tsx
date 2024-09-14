"use client";
import { FC, useState } from "react";
import FloatingNavMenuButton from "./floating-nav-menu-button";

interface MobileNavProps {}

const MobileNav: FC<MobileNavProps> = ({}) => {
  const [isMenuOpen, setMenuOpen] = useState<boolean>(false);

  const handleMunuTrigger = () => setMenuOpen(!isMenuOpen);

  return (
    <div>
      <FloatingNavMenuButton
        onClick={handleMunuTrigger}
        isMenuOpen={isMenuOpen}
      />
    </div>
  );
};

export default MobileNav;
