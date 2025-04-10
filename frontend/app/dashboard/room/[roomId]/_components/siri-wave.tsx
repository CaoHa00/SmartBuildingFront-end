"use client";

import { useEffect, useRef } from "react";

export const SiriWave = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let phase = 0;

    const drawWave = (offset: number, color: string, amplitude: number) => {
      ctx.beginPath();
      const width = canvas.width;
      const height = canvas.height;
      
      for (let x = 0; x < width; x++) {
        const y = height / 2 + 
          Math.sin(x * 0.02 + phase + offset) * amplitude * Math.sin(phase * 0.5) +
          Math.sin(x * 0.01 + phase * 1.1 + offset) * (amplitude - 5);
        
        if (x === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }

      ctx.strokeStyle = color;
      ctx.lineWidth = 2;
      ctx.stroke();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw multiple waves with different colors and phases
      drawWave(0, '#00ff8844', 20);
      drawWave(Math.PI / 2, '#0ff8', 15);
      drawWave(Math.PI, '#ff00ff44', 25);
      
      phase += 0.1;
      animationId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationId);
  }, []);

  return (
    <canvas 
      ref={canvasRef}
      width={200}
      height={60}
      className="w-full h-full"
    />
  );
};
