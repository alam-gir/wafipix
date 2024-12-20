import { FC } from "react";
import Logo from "./logo";
import AddressBox from "../pages/contact/address-box";
import { navLinks } from "@/data";
import Link from "next/link";
import NewsletterForm from "./news-letter-form";
import { Copyright } from "lucide-react";
import FollowList from "./follow-list";

interface footerProps {}

const Footer: FC<footerProps> = ({}) => {
  return (
    <footer className="h-full w-full p-4 lg:px-8">
      <div className="px-4 lg:px-24 py-24 from-accent3 to-accent4 bg-gradient-to-br rounded-2xl">
        <div className="py-4">
          <Logo type={"name"} className="text-primary-foreground" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 h-full w-full">
          {/* logo + addressBox */}
          <div className="">
            <AddressBox className="text-primary-foreground" />
          </div>

          {/* quick links + follo icons */}
          <div className="grid grid-cols-2 justify-between">
            <div className="h-fit w-full">
              <h3 className="text-articleTitle md:text-articleTitleMd lg:text-articleTitleLg text-primary-foreground">
                Quick Links
              </h3>
              <ul>
                {navLinks?.map((link, index) => (
                  <li
                    key={`footer_link${index}`}
                    className="w-fit text-articlePara md:text-articleParaMd lg:text-articleParaLg text-primary-foreground/80 hover:underline hover:text-primary-foreground duration-100"
                  >
                    <Link href={link?.href} className="h-full w-full">
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className=" h-fit w-full">
              <h3 className="text-articleTitle md:text-articleTitleMd lg:text-articleTitleLg text-primary-foreground">
                Follow Us On
              </h3>
              <FollowList />
            </div>
          </div>

          {/* newsletter signup form */}
          <div className="h-full w-full">
            <NewsletterForm />
          </div>
        </div>
        {/* hr line */}
        <div className={"min-h-[1px] bg-transparent py-16 w-full"}>
          <div className="min-h-1px h-[1px] bg-primary-foreground" />
        </div>

        {/* copyright text */}
        <div className="flex gap-1 text-primary-foreground items-center">
          <Copyright className="h-[18px] w-[18px]" />{" "}
          <span>Wafipix 2024. All rights reserved.</span>
        </div>
    </div>
    </footer>
  );
};

export default Footer;
