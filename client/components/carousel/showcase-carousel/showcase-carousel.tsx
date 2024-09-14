"use client";
import { FC } from "react";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll, { AutoScrollOptionsType } from "embla-carousel-auto-scroll";
import ShowcaseCarouselContent from "./showcase-carousel-content";
import { TPortfolio } from "@/lib/URL-services/portfolios";


interface ShowcaseCarouselProps {
  slides: TPortfolio[];
  options?: EmblaOptionsType;
  autoScrollOptions?: AutoScrollOptionsType
}

const ShowcaseCarousel: FC<ShowcaseCarouselProps> = (props) => {
  
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
              className="embla__slide h-full max-w-[36rem]"
              key={index}
            >
                <ShowcaseCarouselContent slide={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ShowcaseCarousel;
