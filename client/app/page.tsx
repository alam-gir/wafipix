import Separator from "@/components/global/separator";
import ContactUsCard from "@/components/pages/contact/contact-us-card";
import HeroBlock from "@/components/pages/home/hero-block";
import PackagesBlock from "@/components/pages/home/packages-block";
import ServiceBlock from "@/components/pages/home/service-block";
import ShowcaseBlock from "@/components/pages/home/showcase-block";

const Home = () => {
  return (
    <main className="h-full w-full">

      <HeroBlock />

      <Separator className="h-[68px]" />

      <PackagesBlock />

      <Separator className=" lg:h-[160px]" />

      <ShowcaseBlock />

      <Separator className="lg:h-[160px]" />

      <ServiceBlock />
      
      <Separator className="lg:h-[160px]" />

      <ContactUsCard />

      <Separator className="lg:h-[160px]" />
    </main>
  );
};

export default Home;
