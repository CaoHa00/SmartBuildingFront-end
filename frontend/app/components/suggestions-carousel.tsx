"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselApi,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";
import Autoplay from "embla-carousel-autoplay";

export function Example() {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      // ...
    </Carousel>
  );
}

export function SuggestionCarousel() {
  //   const [api, setApi] = useState<CarouselApi>();
  //   const [current, setCurrent] = useState(0);
  //   const [count, setCount] = useState(0);

  //   useEffect(() => {
  //     if (!api) {
  //       return;
  //     }

  //     setCount(api.scrollSnapList().length);
  //     setCurrent(api.selectedScrollSnap() + 1);

  //     api.on("select", () => {
  //       setCurrent(api.selectedScrollSnap() + 1);
  //     });
  //   }, [api]);

  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      plugins={[
        Autoplay({
          delay: 7000,
        }),
      ]}
    >
      <CarouselContent>
        <CarouselItem>
          <h1 className="text-3xl md:text-5xl italic mb-4 mt-20 text-center">
            Suggestions - VN
          </h1>
          <h1 className="text-3xl md:text-5xl italic mb-4 text-center">
            Suggestions - EN
          </h1>
        </CarouselItem>
        <CarouselItem>
          <h1 className="text-3xl md:text-5xl italic mb-4 mt-20 text-center">
            Suggestions - VN
          </h1>
          <h1 className="text-3xl md:text-5xl italic mb-4 text-center">
            Suggestions - EN
          </h1>
        </CarouselItem>
        <CarouselItem>
          <h1 className="text-3xl md:text-5xl italic mb-4 mt-20 text-center">
            Suggestions - VN
          </h1>
          <h1 className="text-3xl md:text-5xl italic mb-4 text-center">
            Suggestions - EN
          </h1>
        </CarouselItem>
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
  );
}
