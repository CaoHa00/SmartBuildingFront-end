"use client";

import {
  CloudSun,
  CloudRain,
  Sun,
  Cloud,
  Moon,
  CloudMoon,
  MapPin,
  Calendar,
} from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/components/providers/language-provider";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface WeatherComponentProps {
  temperature: number;
  weatherCode: number;
  dailyMinTemp: number;
  dailyMaxTemp: number;
}

export default function WeatherComponent({
  temperature,
  weatherCode,
  dailyMinTemp,
  dailyMaxTemp,
}: WeatherComponentProps) {
  const { isEnglish } = useLanguage();
  const [currentTime, setCurrentTime] = useState(new Date());
  // const [city, setCity] = useState("Loading...");

  // useEffect(() => {
  //   if ("geolocation" in navigator) {
  //     navigator.geolocation.getCurrentPosition(
  //       async (position) => {
  //         const { latitude, longitude } = position.coords;
  //         fetchCityName(latitude, longitude);
  //       },
  //       (error) => {
  //         console.error("Error getting location:", error);
  //         setCity("Unknown Location");
  //       }
  //     );
  //   } else {
  //     setCity("Geolocation Not Supported");
  //   }
  // }, []);

  // async function fetchCityName(lat: number, lon: number) {
  //   try {
  //     const apiKey = "b9cea54cd1514bebac07eb8d1c904dd8";
  //     const response = await fetch(
  //       `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`
  //     );
  //     const data = await response.json();
  //     const cityName =
  //       data.results[0]?.components.city || data.results[0]?.components.town;
  //     setCity(cityName || "Unknown City");
  //   } catch (error) {
  //     console.error("Error fetching city name:", error);
  //     setCity("Unknown City");
  //   }
  // }

  const formattedDate = currentTime.toLocaleDateString(
    isEnglish ? "en-US" : "vi-VN",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }
  );

  const formattedTime = currentTime.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  const text = {
    date: formattedDate,
    weather: getWeatherDescription(weatherCode, isEnglish),
  };

  const weatherIcon = getWeatherIcon(weatherCode);

  const content = [
    <div key="1">
      <div className="flex justify-between pt-20 md:pt-16">
        <div className="">
          <div className="flex">
            <MapPin fill="red" className="mr-1" />
            {/* <p className="text-xl md:text-2xl">{city}</p> */}
            <p className="text-xl md:text-2xl">Thủ Dầu Một</p>
          </div>
          <div className="flex">
            <Calendar className="mr-1" />
            <p className="text-xl md:text-2xl">{text.date}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-between md:justify-around">
        <div className="text-[130px] leading-[1.2] md:leading-[1.5] md:text-[150px]">
          {Math.round(temperature)}°
        </div>
        {weatherIcon}
      </div>
      <div className="text-xl italic md:text-3xl pb-6">
        {Math.round(dailyMinTemp)}° - {Math.round(dailyMaxTemp)}° {text.weather}
      </div>
    </div>,

    <div
      key="2"
      className="h-full flex flex-col relative justify-center item-center text-center"
    >
      <p className="text-xl md:text-3xl italic mb-10 w-full">
        <span className="not-italic">☀️</span> Hiện tại chỉ số tia UV đang rất
        cao. Hãy hạn chế ra ngoài và nhớ mang theo ô{" "}
        <span className="not-italic">☂️</span> hoặc áo khoác chống nắng{" "}
        <span className="not-italic">🧥</span>.
      </p>
      <p className="text-base md:text-2xl italic w-full">
        <span className="not-italic">☀️</span> The UV index is currently very
        high. Try to limit going outside and remember to bring an umbrella{" "}
        <span className="not-italic">☂️</span> or a sun-protective jacket{" "}
        <span className="not-italic">🧥</span>.
      </p>
    </div>,

    <div
      key="2"
      className="h-full flex flex-col justify-center item-center text-center"
    >
      <p className="text-xl md:text-3xl italic mb-10 w-full">
        <span className="not-italic">🌡️</span> Nhiệt độ bên ngoài và trong phòng
        đang chênh lệch cao. Hãy điều chỉnh nhiệt độ điều hòa để tránh tình
        trạng sốc nhiệt.
      </p>
      <p className="text-base md:text-2xl italic w-full">
        <span className="not-italic">🌡️</span> The temperature difference
        between indoors and outdoors is quite high. Adjust the air conditioning
        to avoid temperature shock.
      </p>
    </div>,

    <div
      key="4"
      className="h-full flex flex-col justify-center item-center text-center"
    >
      <p className="text-xl md:text-3xl italic mb-10 w-full">
        Đừng quên uống đủ 2 lít <span className="not-italic">💧</span> nước mỗi
        ngày. Bạn đã uống nước hôm nay chưa?{" "}
        <span className="not-italic">🥛</span>
      </p>
      <p className="text-base md:text-2xl italic w-full">
        Don't forget to drink at least 2 liters of{" "}
        <span className="not-italic">💧</span> water daily. Have you had any
        water today? <span className="not-italic">🥛</span>
      </p>
    </div>,
  ];

  const [index, setIndex] = useState(0);
  const duration = 10;

  useEffect(() => {
    const englishTimer = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % content.length);
    }, duration * 1000);
    return () => {
      clearInterval(englishTimer);
    };
  }, [content.length]);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 500);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="bg-[#5e83ba] relative rounded-xl aspect-auto pl-5 md:pl-8 pr-3 h-full md:h-[480px] overflow-hidden">
      <div className="absolute pt-3 top-0 right-0 font-bold text-2xl md:text-4xl pr-3">
        {formattedTime}
      </div>
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

function getWeatherDescription(
  weatherCode: number,
  isEnglish: boolean
): string {
  const descriptions: { [key: number]: { en: string; vi: string } } = {
    0: { en: "Clear Sky", vi: "Trời quang" },
    1: { en: "Mainly Clear", vi: "Trời ít mây" },
    2: { en: "Partly Cloudy", vi: "Trời có mây" },
    3: { en: "Overcast", vi: "Nhiều mây" },
    45: { en: "Fog", vi: "Sương mù" },
    61: { en: "Light Rain", vi: "Mưa nhỏ" },
    63: { en: "Moderate Rain", vi: "Mưa vừa" },
    65: { en: "Heavy Rain", vi: "Mưa lớn" },
    80: { en: "Slight Rain Showers", vi: "Mưa rào" },
    95: { en: "Slight to Moderate Thunderstorm", vi: "Mưa giông vừa và nhỏ" },
    96: { en: "Heavy Thunderstorm", vi: "Mưa giông lớn" },
  };

  return descriptions[weatherCode]
    ? isEnglish
      ? descriptions[weatherCode].en
      : descriptions[weatherCode].vi
    : isEnglish
    ? "Unknown Weather"
    : "Thời tiết không xác định";
}

function getWeatherIcon(weatherCode: number) {
  const iconSize = 100;
  const hour = new Date().getHours();
  const isDaytime = hour >= 6 && hour < 18;
  const icons: {
    [key: number]: { day: React.ReactNode; night: React.ReactNode };
  } = {
    0: {
      day: (
        <Image
          src="/icon/Sun.svg"
          alt="Sun"
          width={iconSize}
          height={iconSize}
        />
      ),
      night: (
        <Image
          src="/icon/Moon.svg"
          alt="Moon"
          width={iconSize}
          height={iconSize}
        />
      ),
    },
    1: {
      day: (
        <Image
          src="/icon/CloudSun.svg"
          alt="CloudSun"
          width={iconSize}
          height={iconSize}
        />
      ),
      night: (
        <Image
          src="/icon/CloudMoon.svg"
          alt="CloudMoon"
          width={iconSize}
          height={iconSize}
        />
      ),
    },
    2: {
      day: (
        <Image
          src="/icon/CloudSun.svg"
          alt="CloudSun"
          width={iconSize}
          height={iconSize}
        />
      ),
      night: (
        <Image
          src="/icon/CloudMoon.svg"
          alt="CloudMoon"
          width={iconSize}
          height={iconSize}
        />
      ),
    },
    3: {
      day: (
        <Image
          src="/icon/Cloud.svg"
          alt="Cloud"
          width={iconSize}
          height={iconSize}
        />
      ),
      night: (
        <Image
          src="/icon/Cloud.svg"
          alt="Cloud"
          width={iconSize}
          height={iconSize}
        />
      ),
    },
    45: {
      day: (
        <Image
          src="/icon/Cloud.svg"
          alt="Cloud"
          width={iconSize}
          height={iconSize}
        />
      ),
      night: (
        <Image
          src="/icon/Cloud.svg"
          alt="Cloud"
          width={iconSize}
          height={iconSize}
        />
      ),
    },
    61: {
      day: (
        <Image
          src="/icon/Rain.svg"
          alt="Rain"
          width={iconSize}
          height={iconSize}
        />
      ),
      night: (
        <Image
          src="/icon/Rain.svg"
          alt="Rain"
          width={iconSize}
          height={iconSize}
        />
      ),
    },
    63: {
      day: (
        <Image
          src="/icon/Rain.svg"
          alt="Rain"
          width={iconSize}
          height={iconSize}
        />
      ),
      night: (
        <Image
          src="/icon/Rain.svg"
          alt="Rain"
          width={iconSize}
          height={iconSize}
        />
      ),
    },
    65: {
      day: (
        <Image
          src="/icon/Rain.svg"
          alt="Rain"
          width={iconSize}
          height={iconSize}
        />
      ),
      night: (
        <Image
          src="/icon/Rain.svg"
          alt="Rain"
          width={iconSize}
          height={iconSize}
        />
      ),
    },
    80: {
      day: (
        <Image
          src="/icon/Rain.svg"
          alt="Rain"
          width={iconSize}
          height={iconSize}
        />
      ),
      night: (
        <Image
          src="/icon/Rain.svg"
          alt="Rain"
          width={iconSize}
          height={iconSize}
        />
      ),
    },
    95: {
      day: (
        <Image
          src="/icon/Storm.svg"
          alt="Storm"
          width={iconSize}
          height={iconSize}
        />
      ),
      night: (
        <Image
          src="/icon/Storm.svg"
          alt="Storm"
          width={iconSize}
          height={iconSize}
        />
      ),
    },
    96: {
      day: (
        <Image
          src="/icon/Storm.svg"
          alt="Storm"
          width={iconSize}
          height={iconSize}
        />
      ),
      night: (
        <Image
          src="/icon/Storm.svg"
          alt="Storm"
          width={iconSize}
          height={iconSize}
        />
      ),
    },
  };

  return icons[weatherCode] ? (
    isDaytime ? (
      icons[weatherCode].day
    ) : (
      icons[weatherCode].night
    )
  ) : (
    <CloudSun size={iconSize} />
  );
}
