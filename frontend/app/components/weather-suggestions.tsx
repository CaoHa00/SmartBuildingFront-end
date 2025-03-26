"use client";

import { CloudSun } from "lucide-react";
// import Autoplay from "embla-carousel-autoplay";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
// } from "@/components/ui/carousel";
import { useLanguage } from "@/components/providers/language-provider";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function WeatherComponent() {
  const { isEnglish } = useLanguage();

  const text = isEnglish
    ? {
        date: "Friday, March 21st, 2025",
        weather: "Cloudy",
      }
    : {
        date: "Thứ 6, 21 tháng 3, 2025",
        weather: "Nhiều mây",
      };

  const content = [
    <div key="1" className="pt-3">
      <div className="flex justify-between relative pt-7 md:pt-16">
        <div className="">
          <p className="text-xl leading-none md:text-2xl">Thủ Dầu Một</p>
          <p className="text-xl leading-none md:text-2xl">{text.date}</p>
        </div>
        <div className="absolute top-0 right-0 font-bold text-2xl md:text-4xl pr-3">
          10:30
        </div>
      </div>
      <div className="flex justify-between md:justify-around">
        <div className="text-[130px] leading-[1.2] md:leading-[1.5] md:text-[150px]">
          34°
        </div>
        <CloudSun size={150} className="md:w-[200px] md:h-[200px]" />
      </div>
      <div className="text-xl italic md:text-3xl pb-6">
        27° - 34° {text.weather}
      </div>
    </div>,

    <div
      key="2"
      className="h-full flex flex-col justify-center item-center text-center"
    >
      <p className="text-xl md:text-3xl italic mb-10 w-full">
        Hiện tại chỉ số tia UV đang rất cao. Hãy hạn chế ra ngoài và nhớ mang
        theo ô hoặc áo khoác chống nắng.
      </p>
      <p className="text-base md:text-2xl italic w-full">
        The UV index is currently very high. Try to limit going outside and
        remember to bring an umbrella or a sun-protective jacket.
      </p>
    </div>,

    <div
      key="2"
      className="h-full flex flex-col justify-center item-center text-center"
    >
      <p className="text-xl md:text-3xl italic mb-10 w-full">
        Nhiệt độ bên ngoài và trong phòng đang chênh lệch cao. Hãy điều chỉnh
        nhiệt độ điều hòa để tránh tình trạng sốc nhiệt.
      </p>
      <p className="text-base md:text-2xl italic w-full">
        The temperature difference between indoors and outdoors is quite high.
        Adjust the air conditioning to avoid temperature shock.
      </p>
    </div>,

    <div
      key="4"
      className="h-full flex flex-col justify-center item-center text-center"
    >
      <p className="text-xl md:text-3xl italic mb-10 w-full">
        Đừng quên uống đủ 2 lít nước mỗi ngày. Bạn đã uống nước hôm nay chưa?
      </p>
      <p className="text-base md:text-2xl italic w-full">
        Don't forget to drink at least 2 liters of water daily. Have you had any
        water today?
      </p>
    </div>,
  ];

  const [index, setIndex] = useState(0);
  const duration = 10;

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % content.length);
    }, duration * 1000);

    return () => clearInterval(timer);
  }, [content.length]);

  return (
    // <Carousel
    //   plugins={[
    //     Autoplay({
    //       delay: 8000,
    //     }),
    //   ]}
    // >
    //   <CarouselContent>
    //     <CarouselItem>
    //       <div className="row-span-2 bg-muted/40 rounded-xl aspect-auto pl-5 md:pl-8 pr-3 pt-4 mb-2 h-full">
    //         <div className="flex justify-between relative">
    //           <div className="">
    //             <p className="text-sm leading-none md:text-2xl">Thủ Dầu Một</p>
    //             <p className="text-sm leading-none md:text-2xl">{text.date}</p>
    //           </div>
    //           <div className="font-bold text-2xl md:text-4xl pr-3">10:30</div>
    //         </div>
    //         <div className="flex justify-between md:justify-around">
    //           <div className="text-[80px] leading-none md:leading-[1.5] md:text-[150px]">
    //             34°
    //           </div>
    //           <CloudSun size={80} className="md:w-[200px] md:h-[200px]" />
    //         </div>
    //         <div className="text-base italic md:text-3xl mb-2">
    //           27° - 34° {text.weather}
    //         </div>
    //       </div>
    //     </CarouselItem>
    //     <CarouselItem>
    //       <div className="row-span-2 h-full bg-muted/40 rounded-xl aspect-auto pl-5 md:pl-8 pr-3 mb-2 flex flex-col justify-center item-center text-center">
    //         <p className="text-sm md:text-2xl italic mb-2 md:mb-8 w-full">
    //           Hiện tại chỉ số tia UV đang rất cao. Hãy hạn chế ra ngoài và nhớ
    //           mang theo ô hoặc áo khoác chống nắng.
    //         </p>
    //         <p className="text-sm md:text-2xl italic w-full">
    //           The UV index is currently very high. Try to limit going outside
    //           and remember to bring an umbrella or a sun-protective jacket.
    //         </p>
    //       </div>
    //     </CarouselItem>
    //     <CarouselItem>
    //       <div className="row-span-2 h-full bg-muted/40 rounded-xl aspect-auto pl-5 md:pl-8 pr-3 mb-2 flex flex-col justify-center item-center text-center">
    //         <p className="text-sm md:text-2xl italic mb-2 md:mb-8 w-full">
    //           Nhiệt độ bên ngoài và trong phòng đang chênh lệch cao. Hãy điều
    //           chỉnh nhiệt độ điều hòa để tránh tình trạng sốc nhiệt.
    //         </p>
    //         <p className="text-sm md:text-2xl italic w-full">
    //           The temperature difference between indoors and outdoors is quite
    //           high. Adjust the air conditioning to avoid temperature shock.
    //         </p>
    //       </div>
    //     </CarouselItem>
    //     <CarouselItem>
    //       <div className="row-span-2 h-full bg-muted/40 rounded-xl aspect-auto pl-5 md:pl-8 pr-3 mb-2 flex flex-col justify-center item-center text-center">
    //         <p className="text-sm md:text-2xl italic mb-2 md:mb-8 w-full">
    //           Đừng quên uống đủ 2 lít nước mỗi ngày. Bạn đã uống nước hôm nay
    //           chưa?
    //         </p>
    //         <p className="text-sm md:text-2xl italic w-full">
    //           Don't forget to drink at least 2 liters of water daily. Have you
    //           had any water today?
    //         </p>
    //       </div>
    //     </CarouselItem>
    //   </CarouselContent>
    // </Carousel>
    <div className="bg-muted/40 rounded-xl aspect-auto pl-5 md:pl-8 pr-3 h-[310px] md:h-[480px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="w-full h-full"
        >
          {content[index]}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
