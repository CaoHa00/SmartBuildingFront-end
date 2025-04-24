import { useWeather } from "../../../hooks/use-weather";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Thermometer,
  Droplets,
  Sun,
  Cloud,
  CloudFog,
  CloudRain,
  CloudSnow,
  CloudLightning,
  Wind,
  Umbrella,
  MapPin,
  Moon,
  MoonStar,
  Sunset,
  Sunrise,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { InfoIcon, AlertTriangle, AlertCircle } from "lucide-react";
import { useClock } from "@/hooks/use-clock";

const WeatherIcon = ({
  condition,
  isDaytime,
}: {
  condition: string;
  isDaytime: boolean;
}) => {
  switch (condition) {
    case "Sunny":
      return isDaytime ? (
        <Sun className="w-10 h-10 text-yellow-500" />
      ) : (
        <Moon className="w-10 h-10 text-slate-300" />
      );
    case "Partly Cloudy":
      return isDaytime ? (
        <Cloud className="w-10 h-10 text-gray-500" />
      ) : (
        <MoonStar className="w-10 h-10 text-slate-300" />
      );
    case "Foggy":
      return <CloudFog className="w-10 h-10 text-gray-400" />;
    case "Rainy":
      return <CloudRain className="w-10 h-10 text-blue-500" />;
    case "Snowy":
      return <CloudSnow className="w-10 h-10 text-blue-200" />;
    default:
      return <CloudLightning className="w-10 h-10 text-yellow-600" />;
  }
};

const NewsIcon = ({ severity }: { severity: string }) => {
  switch (severity) {
    case "info":
      return <InfoIcon className="w-4 h-4 text-blue-500" />;
    case "warning":
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    case "alert":
      return <AlertCircle className="w-4 h-4 text-red-500" />;
    default:
      return <InfoIcon className="w-4 h-4" />;
  }
};

const WeatherForecast = () => {
  const { adminWeather, loading } = useWeather();
  const clock = useClock();

  if (loading) {
    return (
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Skeleton className="h-4 w-[100px]" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!adminWeather) {
    return (
      <Card className="w-[350px]">
        <CardContent>
          <p className="text-destructive">Failed to load weather data</p>
        </CardContent>
      </Card>
    );
  }

  const formattedDate = adminWeather.timestamp.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div
      className={`flex flex-col gap-4 bg-primary
      } p-6 rounded-lg`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-red-500" />
          <span className={`text-2xl font-semibold text-primary-foreground`}>
            {adminWeather.location}
          </span>
        </div>
        {adminWeather.isDaytime ? (
          <Sunrise className="w-6 h-6 text-orange-500" />
        ) : (
          <Sunset className="w-6 h-6 text-indigo-400" />
        )}
      </div>

      <div className={`text-sm text-muted-foreground`}>
        <p>{formattedDate}</p>
        <p>{clock}</p>
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-4">
          <WeatherIcon
            condition={adminWeather.condition}
            isDaytime={adminWeather.isDaytime}
          />
          <span className={`text-2xl font-semibold text-primary-foreground`}>
            {adminWeather.condition}
          </span>
        </div>

        <div
          className={`space-y-2 ${
            adminWeather.isDaytime ? "text-slate-700" : "text-slate-200"
          }`}
        >
          <div className="flex items-center gap-2">
            <Thermometer className="w-4 h-4 text-orange-500" />
            <p className="text-muted-foreground">
              Temperature: {adminWeather.temperature}°C
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Droplets className="w-4 h-4 text-blue-500" />
            <p className="text-muted-foreground">
              Humidity: {adminWeather.humidity}%
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Wind className="w-4 h-4 text-slate-500" />
            <p className="text-muted-foreground">
              Wind Speed: {adminWeather.windSpeed} km/h
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Umbrella className="w-4 h-4 text-indigo-500" />
            <p className="text-muted-foreground">
              Precipitation: {adminWeather.precipitation} mm
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {adminWeather.news.map((news, index) => (
          <Alert
            key={index}
            variant={news.severity === "warning" ? "destructive" : "default"}
          >
            <div className="flex items-start gap-2">
              <NewsIcon severity={news.severity} />
              <div className="flex-1">
                <AlertTitle>{news.title}</AlertTitle>
                <AlertDescription>
                  {news.description}
                  <p className="text-xs text-muted-foreground mt-1">
                    {news.time}
                  </p>
                </AlertDescription>
              </div>
            </div>
          </Alert>
        ))}
      </div>
    </div>
  );
};

export default WeatherForecast;
