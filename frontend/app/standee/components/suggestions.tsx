"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const messages = [
  "Hôm nay trời nắng và chỉ số tia UV cao. Hãy hạn chế ra ngoài và nhớ mang theo ô.",
  "Nhiệt độ ngoài trời và nhiệt độ trong phòng đang chênh lệch cao. Hãy điều chỉnh nhiệt độ điều hòa.",
  "Đừng quên uống đủ 2 lít nước mỗi ngày. Bạn đã uống nước hôm nay chưa?",
];

export function SuggestionRunner() {

  const [index, setIndex] = useState(0);
  const [key, setKey] = useState(0);

  const baseSpeed = 4;
  const speedFactor = 0.2;
  const duration = baseSpeed + messages[index].length * speedFactor;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndex((prevIndex) => (prevIndex + 1) % messages.length);
      setKey((prevKey) => prevKey + 1);
    }, duration * 1000);

    return () => clearTimeout(timer);
  }, [index, duration]);

  return (
    <div className="relative tracking-wide italic w-full mt-[75px] md:mt-24 mb-2 md:mb-6 text-xl md:text-3xl overflow-hidden text-white h-10 flex items-center">
      <motion.div
        key={key}
        initial={{ x: "100%" }}
        animate={{ x: "-100%" }}
        transition={{ duration: duration, ease: "linear" }}
        className="absolute whitespace-nowrap"
      >
        {messages[index]}
      </motion.div>
    </div>
  );
}
