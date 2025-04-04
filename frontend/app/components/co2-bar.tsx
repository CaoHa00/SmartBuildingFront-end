"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
} from "chart.js";
import annotationPlugin from "chartjs-plugin-annotation";
import { useRef, useState, useEffect } from "react";

// Register chart.js components
Chart.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  annotationPlugin
);

// CO2BarChartProps type definition
interface CO2BarChartProps {
  co2Emission: number; // CO₂ emission value from the parent component
}

const CO2BarChart = ({ co2Emission }: CO2BarChartProps) => {
  const maxCO2 = 1; // Set the max CO₂ limit (1t)
  const chartRef = useRef<any>(null); // Reference to the chart instance
  const [gradient, setGradient] = useState<CanvasGradient | null>(null); // Store the gradient

  // Function to create the gradient (green to red)
  const createGradient = (ctx: CanvasRenderingContext2D, chartArea: any) => {
    if (!ctx || !chartArea) return null;

    const gradientFill = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );
    gradientFill.addColorStop(0, "rgba(0, 200, 0, 1)"); // Green (low)
    gradientFill.addColorStop(0.5, "rgba(255, 165, 0, 1)"); // Yellow (moderate)
    gradientFill.addColorStop(1, "rgba(255, 0, 0, 1)"); // Red (high)

    return gradientFill;
  };
  // useEffect hook to set the gradient once the chart instance is initialized
  useEffect(() => {
    const chartInstance = chartRef.current?.chart;
    if (chartInstance) {
      const chartArea = chartInstance.chartArea;
      const ctx = chartInstance.ctx;
      if (ctx && chartArea) {
        const newGradient = createGradient(ctx, chartArea);
        setGradient(newGradient);
      }
      chartInstance.update();
    }
  }, [co2Emission]); // Runs on initial mount or when `co2Emission` changes

  // Chart data: it uses the maxCO2 value and applies the gradient
  const data = {
    labels: [""], // Empty label to center the bar
    datasets: [
      {
        data: [Math.min(co2Emission, maxCO2)], // Use min(co2Emission, maxCO2) to clamp the value
        backgroundColor: gradient ?? "rgba(0, 200, 0, 1)", // Apply the gradient or fallback color
      },
    ],
  };

  // Chart options, similar to what you might have in the WeatherChart
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
      annotation: {
        annotations: {
          line1: {
            // Annotation line for 1t CO₂
            xMin: 0,
            xMax: 0,
            yMin: maxCO2,
            yMax: maxCO2,
            borderColor: "white",
            borderWidth: 2,
            label: {
              content: "1t CO₂", // Label content
              position: "center",
              font: {
                size: 12,
                family: "Montserrat, sans-serif",
                weight: "bold",
              },
              color: "#FFFFFF", // Label color
            },
          },
        },
      },
    },
    scales: {
      x: { display: false },
      y: {
        display: false, // Hide the y-axis
        min: 0,
        max: maxCO2, // Set max limit for the bar
      },
    },
  };

  // Return the Bar component with the chart data and options
  return (
    <div className="h-[84px] w-12 mx-auto">
      <Bar ref={chartRef} data={data} options={options} />
    </div>
  );
};

export default CO2BarChart;
