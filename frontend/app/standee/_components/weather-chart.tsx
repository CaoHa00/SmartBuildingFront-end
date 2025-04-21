"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getWeatherIcon } from "./weather-suggestions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface WeatherChartProps {
  hourlyTemp2m: number[];
  hourlyWeatherCodes: number[];
  hourlyTime: Date[];
}

export default function WeatherChart({
  hourlyTemp2m,
  hourlyWeatherCodes,
  hourlyTime,
}: WeatherChartProps) {
  const now = new Date();
  const futureTime = new Date(now.getTime() + 6 * 60 * 60 * 1000);
  const data = hourlyTemp2m
    .map((temp, index) => {
      const time = hourlyTime[index];
      return {
        time: time.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }),
        temperature: temp,
        weatherCode: hourlyWeatherCodes[index],
        timestamp: time,
      };
    })
    .filter((d) => d.timestamp >= now && d.timestamp <= futureTime);

  const getGradient = (
    ctx: CanvasRenderingContext2D,
    chartArea: any,
    data: { temperature: number }[]
  ) => {
    const gradient = ctx.createLinearGradient(
      chartArea.left,
      0,
      chartArea.right,
      0
    );

    const temperatures = data.map((d) => d.temperature);

    temperatures.forEach((temp, index) => {
      const position = index / (temperatures.length - 1);

      let color = "";
      if (temp >= 20 && temp <= 24) {
        // Green to Yellow (RGB: Green = rgb(0, 255, 0), Yellow = rgb(255, 255, 0))
        const r = Math.round((temp - 20) * (255 / 4)); // Gradient from 0 (green) to 255 (yellow)
        const g = 255; // Green goes from 255 to 0
        const b = 0; // Constant value
        color = `rgb(${r}, ${g}, ${b})`;
      } else if (temp > 24 && temp <= 32) {
        // Yellow to Orange (RGB: Yellow = rgb(255, 255, 0), Orange = rgb(255, 127, 0))
        const r = 255; // Red stays constant at 255
        const g = Math.round(255 - (temp - 25) * (128 / 6)); // Green goes from 255 to 165
        const b = 0; // Constant value
        color = `rgb(${r}, ${g}, ${b})`;
      } else if (temp > 32) {
        // Orange to Red (RGB: Orange = rgb(255, 127, 0), Red = rgb(255, 0, 0))
        const r = 255; // Red stays constant at 255
        const g = Math.round(127 - (temp - 32) * (127 / 3)); // Green decreases to 0
        const b = 0; // Constant value
        color = `rgb(${r}, ${g}, ${b})`;
      }

      if (/^rgb\(\d{1,3}, \d{1,3}, \d{1,3}\)$/.test(color)) {
        gradient.addColorStop(position, color);
      } else {
        console.warn(`Invalid color generated: ${color}`);
      }
    });

    return gradient;
  };

  return (
    <div className="w-full h-full rounded-xl p-3 pt-0 mb-3 bg-muted/30">
      <Line
        data={{
          labels: data.map((d) => d.time),
          datasets: [
            {
              data: data.map((d) => d.temperature),
              borderColor: (context) => {
                const chart = context.chart;
                if (!chart?.ctx || !chart?.chartArea) return "#FFFFFF";
                return getGradient(chart.ctx, chart.chartArea, data);
              },
              backgroundColor: "transparent",
              pointBackgroundColor: "#FFFFFF",
              pointBorderColor: "#FFFFFF",
              pointRadius: 2,
              pointHoverRadius: 2,
            },
          ],
        }}
        options={{
          responsive: true,
          layout: {
            padding: { top: 10, left: 15, right: 15 },
          },
          plugins: {
            legend: { display: false },
            tooltip: { enabled: false },
            datalabels: {
              align: (context: any) => {
                const rawData = context.chart.data.datasets[0].data;
                const values = rawData.map((v: any) =>
                  typeof v === "number" ? v : Number(v)
                );

                const currentValue = context.dataset.data[context.dataIndex];
                const currentNumber =
                  typeof currentValue === "number"
                    ? currentValue
                    : Number(currentValue);

                const max = Math.max(...values);
                const min = Math.min(...values);

                const highThreshold = max - (max - min) * 0.2;

                if (currentNumber >= highThreshold) return "bottom";
                return "top";
              },
              anchor: "center",
              color: "#FFFFFF",
              font: {
                family: "Montserrat, sans-serif",
                size: 14,
              },
              formatter: function (value: any) {
                return `${Math.round(value)}°`;
              },
              offset: 4,
              padding: { left: 10, right: 10 },
            },
          },
          scales: {
            x: { display: false },
            y: { display: false },
          },
        }}
        plugins={[ChartDataLabels]}
      />
      <div className="flex justify-between mt-2">
        {data.map((d, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-xs relative"
          >
            <span className="h-7">
              {getWeatherIcon(d.weatherCode, 24, d.timestamp)}
            </span>
            <span>{d.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
