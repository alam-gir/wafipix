"use client";
import { FC } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll, { AutoScrollOptionsType } from "embla-carousel-auto-scroll";
import CompanyCarouselContent from "./company-carousel-content";
import { TTopCustomers } from "@/lib/URL-services/top-customers";



interface CompanyCarouselProps {
  slides: TTopCustomers[];
  options?: EmblaOptionsType;
  autoScrollOptions?: AutoScrollOptionsType
}

const CompanyCarousel: FC<CompanyCarouselProps> = (props) => {
  
  const { slides } = props;

  let autoScrollOptions : AutoScrollOptionsType = {
    playOnInit: true,
    stopOnFocusIn: false,
    stopOnInteraction: false,
    stopOnMouseEnter: false,
    active: true,
    ...props.autoScrollOptions
  }
  
  let emblaOptions : EmblaOptionsType = {
    loop: true,
    ...props.options
  }
  
  const autoScroll = [
    AutoScroll(autoScrollOptions),
  ];


  const [emblaRef] = useEmblaCarousel(emblaOptions, autoScroll);

  return (
    <div className="embla relative">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides?.map((item, index) => (
            <div
              className="embla__slide h-16 max-w-72"
              key={index}
            >
              <div className="h-full w-full flex items-center justify-center">
                <CompanyCarouselContent slide={item} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CompanyCarousel;
