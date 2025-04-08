"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Chart,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useRef, useState, useEffect } from "react";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  ChartDataLabels
);

interface CO2BarChartProps {
  co2Emission: number;
}

const CO2BarChart = ({ co2Emission }: CO2BarChartProps) => {
  const maxCO2 = 1;
  const chartRef = useRef<Chart<"bar"> | null>(null);
  const [gradient, setGradient] = useState<string | CanvasGradient>(
    "rgba(0, 200, 0, 1)"
  );

  const onChartReady = (chart: Chart<"bar">) => {
    if (!chart) return;
    chartRef.current = chart;

    const { ctx, chartArea } = chart;
    if (!chartArea) return;

    const gradientFill = ctx.createLinearGradient(
      0,
      chartArea.bottom,
      0,
      chartArea.top
    );
    gradientFill.addColorStop(0, "rgba(0, 200, 0, 1)");
    gradientFill.addColorStop(0.3, "rgba(255, 255, 0, 1)");
    gradientFill.addColorStop(0.6, "rgba(255, 165, 0, 1)");
    gradientFill.addColorStop(1, "rgba(255, 0, 0, 1)");

    setGradient(gradientFill);
  };

  useEffect(() => {
    if (chartRef.current) {
      const chart = chartRef.current;
      if (chart.chartArea) {
        onChartReady(chart);
        chart.update();
      }
    }
  }, [co2Emission]);

  const clampedCO2Emission = Math.min(co2Emission, maxCO2);

  const data = {
    labels: [""],
    datasets: [
      {
        data: [clampedCO2Emission],
        backgroundColor: gradient,
        borderWidth: 1.5,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 14, // increase to reveal the label
      },
    },
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
      datalabels: {
        display: true,
        align: "end" as const,
        anchor: "end" as const,
        offset: -4,
        color: "white",
        font: {
          family: "Montserrat, sans-serif",
          size: 14,
        },
        formatter: (value: number) => `${value.toFixed(1)}tCO₂`,
      },
    },
    scales: {
      x: { display: false },
      y: {
        display: false,
        min: 0,
        max: maxCO2,
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="h-[70px] w-12 mx-auto">
      <Bar
        data={data}
        options={options}
        ref={(node) => {
          if (node && node.chartArea) {
            onChartReady(node);
          } else {
            setTimeout(() => {
              if (node && node.chartArea) onChartReady(node);
            }, 100);
          }
        }}
      />
    </div>
  );
};

export default CO2BarChart;
