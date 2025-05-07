"use client";

export const useGreeting = () => {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good morning, IIC";
    if (hour >= 12 && hour < 17) return "Good afternoon, IIC";
    if (hour >= 17 && hour < 22) return "Good evening, IIC";
    return "Good night, IIC";
  };

  return { greeting: getGreeting() };
};