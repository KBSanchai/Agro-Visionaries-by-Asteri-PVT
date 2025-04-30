
import React from "react";

interface WeatherForecastProps {
  day: string;
  weatherType: "sunny" | "cloudy" | "rainy" | "stormy" | "cold" | "hot";
  high: number;
  low: number;
}

export const WeatherForecast: React.FC<WeatherForecastProps> = ({
  day,
  weatherType,
  high,
  low
}) => {
  const getWeatherIcon = () => {
    switch (weatherType) {
      case "sunny":
        return "☀️";
      case "cloudy":
        return "⛅";
      case "rainy":
        return "🌧️";
      case "stormy":
        return "⛈️";
      case "cold":
        return "❄️";
      case "hot":
        return "🔥";
      default:
        return "🌤️";
    }
  };

  const getBgClass = () => {
    switch (weatherType) {
      case "sunny":
        return "bg-yellow-50";
      case "cloudy":
        return "bg-gray-50";
      case "rainy":
        return "bg-blue-50";
      case "stormy":
        return "bg-purple-50";
      case "cold":
        return "bg-indigo-50";
      case "hot":
        return "bg-orange-50";
      default:
        return "bg-blue-50";
    }
  };

  const isToday = day === "Today";

  return (
    <div className={`flex items-center justify-between ${getBgClass()} p-3 rounded-lg ${isToday ? 'border-2 border-drone-blue' : ''}`}>
      <div className="flex items-center">
        <div className="text-2xl mr-3">{getWeatherIcon()}</div>
        <div>
          <p className="font-medium">{day}</p>
          <p className="text-xs text-gray-600">
            {weatherType.charAt(0).toUpperCase() + weatherType.slice(1)}
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="font-medium">{high}°C</p>
        <p className="text-xs text-gray-600">{low}°C</p>
      </div>
    </div>
  );
};
