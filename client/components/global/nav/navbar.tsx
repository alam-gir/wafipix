"use client";

import { FC } from "react";
import NavigationMenus from "./navigation-menus";
import Button2 from "../buttons/button2";
import MobileNav from "./mobile-nav";
import { MoveRight } from "lucide-react";
import Logo from "../logo";
import WidthWrapper from "../width-wrapper";

interface NavbarProps { }

const Navbar: FC<NavbarProps> = ({ }) => {

  return (
    <nav className="h-16 lg:h-20 w-full z-50 flex items-center justify-center fixed top-0 from-accent3/60 to-background2 via-background2 bg-gradient-to-br backdrop-blur-lg">
      <WidthWrapper>
        <div className=" flex items-center justify-between h-full w-full text-primary">

          {/* LOGO */}
          <div>
            <Logo />
          </div>
          {/* NAVIGATION LINKS */}
          <div className="hidden lg:block">
            <NavigationMenus />
          </div>
          {/* BOOK BUTTON */}
          <div className="hidden lg:flex min-w-60  justify-end">
            <Button2 size={"lg"} title="GET YOUR DESIGN" href="/contact" icon={<MoveRight />}/>
          </div>

          {/* MOBILE NAVBAR */}
          <div className="lg:hidden flex items-center gap-4">
            <Button2 size={"sm"} title="BOOK A CALL" href="/contact"/>
            <MobileNav />
          </div>
        </div>
      </WidthWrapper>
    </nav>
  );
};

export default Navbar;