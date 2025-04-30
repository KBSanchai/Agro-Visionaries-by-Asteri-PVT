
import React, { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  CloudSun, 
  Cloud, 
  CloudRain, 
  Sun, 
  Thermometer, 
  CalendarDays,
  MessageCircle
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { WeatherSpirit } from "@/components/WeatherSpirit";
import { WeatherForecast } from "@/components/WeatherForecast";
import { WeatherTip } from "@/components/WeatherTip";
import { 
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Weather types
type WeatherType = "sunny" | "cloudy" | "rainy" | "stormy" | "cold" | "hot";

// Mock weather data (would normally come from API)
const mockWeather = {
  current: {
    type: "sunny" as WeatherType,
    temp: 28,
    humidity: 65,
    description: "Sunny with some clouds",
  },
  forecast: [
    { day: "Today", type: "sunny", high: 29, low: 22 },
    { day: "Tomorrow", type: "cloudy", high: 27, low: 21 },
    { day: "Wed", type: "rainy", high: 25, low: 20 },
    { day: "Thu", type: "sunny", high: 28, low: 22 },
    { day: "Fri", type: "cloudy", high: 26, low: 21 },
    { day: "Sat", type: "sunny", high: 30, low: 23 },
    { day: "Sun", type: "sunny", high: 31, low: 24 },
  ],
};

// Weather tips based on weather type
const weatherTips = {
  sunny: [
    "Perfect day to dry harvested grains in the sun!",
    "Consider adding extra irrigation as evaporation will be high today",
    "Good day for planting sun-loving crops",
  ],
  cloudy: [
    "Great day for transplanting seedlings with reduced transplant shock",
    "Moderate watering needed today",
    "Good day for applying foliar sprays with less risk of leaf burn",
  ],
  rainy: [
    "Check drainage systems in your fields",
    "Hold off on applying fertilizers to prevent runoff",
    "Monitor low-lying areas for potential flooding",
  ],
  stormy: [
    "Secure any farm equipment and structures",
    "Stay indoors during lightning",
    "Check for crop damage after the storm passes",
  ],
  cold: [
    "Protect sensitive crops with row covers",
    "Delay irrigation to prevent frost damage",
    "Mulch around plants to insulate soil",
  ],
  hot: [
    "Water early morning or evening to reduce evaporation",
    "Use mulch to retain soil moisture",
    "Provide shade for heat-sensitive crops",
  ],
};

// Crop advice based on weather type
const cropAdvice = {
  sunny: [
    { crop: "Tomatoes", advice: "Add extra mulch to retain soil moisture" },
    { crop: "Wheat", advice: "Great day for harvesting and drying" },
    { crop: "Peppers", advice: "Consider shade cloth during peak hours" },
  ],
  cloudy: [
    { crop: "Lettuce", advice: "Perfect day for planting leafy greens" },
    { crop: "Cabbage", advice: "Apply pest management treatments today" },
    { crop: "Spinach", advice: "Water lightly if soil appears dry" },
  ],
  rainy: [
    { crop: "Rice", advice: "Check paddy water levels" },
    { crop: "Root vegetables", advice: "Ensure proper drainage" },
    { crop: "Beans", advice: "Watch for signs of rust" },
  ],
  stormy: [
    { crop: "All crops", advice: "Inspect for damage after storm" },
    { crop: "Tall crops", advice: "Consider staking or support" },
    { crop: "Fruit trees", advice: "Check for broken branches" },
  ],
  cold: [
    { crop: "Winter wheat", advice: "Monitor for frost heaving" },
    { crop: "Peas", advice: "Add row covers during frost advisories" },
    { crop: "Citrus", advice: "Be ready to protect from frost" },
  ],
  hot: [
    { crop: "Corn", advice: "Increase irrigation frequency" },
    { crop: "Cucumbers", advice: "Provide afternoon shade" },
    { crop: "Melons", advice: "Water deeply at base, avoid wetting foliage" },
  ],
};

const WeatherSpiritPage: React.FC = () => {
  const [currentWeather, setCurrentWeather] = useState(mockWeather.current);
  const [forecast, setForecast] = useState(mockWeather.forecast);
  const [timeOfDay, setTimeOfDay] = useState<"morning" | "day" | "evening" | "night">("day");
  const [showChat, setShowChat] = useState(false);
  const [activeChatMode, setActiveChatMode] = useState<"weather" | "crop">("weather");
  const [chatExpanded, setChatExpanded] = useState(false);

  // Determine time of day for UI theming
  useEffect(() => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 10) setTimeOfDay("morning");
    else if (hour >= 10 && hour < 17) setTimeOfDay("day");
    else if (hour >= 17 && hour < 20) setTimeOfDay("evening");
    else setTimeOfDay("night");
  }, []);

  // Classes for background based on time of day
  const bgClasses = {
    morning: "bg-gradient-to-b from-blue-200 to-blue-50",
    day: "bg-gradient-to-b from-blue-400 to-blue-100",
    evening: "bg-gradient-to-b from-orange-300 to-blue-200",
    night: "bg-gradient-to-b from-blue-900 to-blue-700",
  };

  // Text color based on time of day
  const textClasses = {
    morning: "text-gray-800",
    day: "text-gray-900",
    evening: "text-gray-800",
    night: "text-white",
  };

  // Handle weather tips button click
  const handleWeatherTipsClick = () => {
    setActiveChatMode("weather");
    setShowChat(true);
    setChatExpanded(true);
  };

  // Handle crop advice button click
  const handleCropAdviceClick = () => {
    setActiveChatMode("crop");
    setShowChat(true);
    setChatExpanded(true);
  };

  // Get content based on active chat mode
  const getChatContent = () => {
    if (activeChatMode === "weather") {
      return (
        <>
          <h3 className="text-sm font-medium mb-3">Weather Tips</h3>
          <div className="space-y-3">
            {weatherTips[currentWeather.type].map((tip, index) => (
              <div key={index} className="p-2 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
                <p className="text-sm">{tip}</p>
              </div>
            ))}
          </div>
        </>
      );
    } else {
      return (
        <>
          <h3 className="text-sm font-medium mb-3">Crop Advice</h3>
          <div className="space-y-3">
            {cropAdvice[currentWeather.type].map((item, index) => (
              <div key={index} className="p-2 bg-white bg-opacity-10 rounded-lg backdrop-blur-sm">
                <p className="text-sm font-medium">{item.crop}</p>
                <p className="text-xs opacity-90">{item.advice}</p>
              </div>
            ))}
          </div>
        </>
      );
    }
  };

  return (
    <Layout>
      <div className={`min-h-screen ${bgClasses[timeOfDay]} transition-colors duration-1000`}>
        <div className="max-w-md mx-auto px-4 py-6 relative">
          {/* Animated elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="cloud absolute top-[10%] left-[5%] opacity-80 animate-float">
              <Cloud className="text-white h-12 w-12" />
            </div>
            <div className="cloud absolute top-[5%] right-[15%] opacity-60 animate-float" style={{animationDelay: '2s'}}>
              <Cloud className="text-white h-8 w-8" />
            </div>
            <div className="cloud absolute top-[20%] right-[5%] opacity-70 animate-float" style={{animationDelay: '4s'}}>
              <Cloud className="text-white h-10 w-10" />
            </div>
          </div>
          
          {/* Header */}
          <header className="mb-6 relative z-10">
            <div className="flex items-center justify-between">
              <div>
                <h1 className={`text-2xl font-bold ${textClasses[timeOfDay]}`}>
                  Weather Spirit
                </h1>
                <p className={`text-sm ${textClasses[timeOfDay]} opacity-80`}>
                  Your farming weather companion
                </p>
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-md p-2 rounded-full shadow-lg">
                {currentWeather.type === "sunny" ? (
                  <Sun className="h-6 w-6 text-yellow-500" />
                ) : currentWeather.type === "rainy" ? (
                  <CloudRain className="h-6 w-6 text-blue-500" />
                ) : (
                  <CloudSun className="h-6 w-6 text-blue-400" />
                )}
              </div>
            </div>
          </header>

          {/* Weather Spirit Character */}
          <div className="mb-6 flex justify-center">
            <WeatherSpirit 
              weatherType={currentWeather.type} 
              temperature={currentWeather.temp} 
              timeOfDay={timeOfDay}
            />
          </div>

          {/* Current Weather */}
          <Card className="bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-20 shadow-lg p-4 mb-6 transition-all duration-300 hover:bg-opacity-30">
            <div className="flex items-center justify-between mb-2">
              <h2 className={`text-lg font-semibold ${textClasses[timeOfDay]}`}>
                Current Weather
              </h2>
              <Thermometer className="h-5 w-5 text-red-500" />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-3xl font-bold">{currentWeather.temp}°C</p>
                <p className="text-sm opacity-80">{currentWeather.description}</p>
                <p className="text-xs opacity-70">Humidity: {currentWeather.humidity}%</p>
              </div>
              <div className="text-4xl">
                {currentWeather.type === "sunny" ? "☀️" : 
                 currentWeather.type === "cloudy" ? "⛅" :
                 currentWeather.type === "rainy" ? "🌧️" :
                 currentWeather.type === "stormy" ? "⛈️" :
                 currentWeather.type === "cold" ? "❄️" : "🔥"}
              </div>
            </div>
          </Card>

          {/* Weather Tips Carousel */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <h2 className={`text-lg font-semibold ${textClasses[timeOfDay]}`}>
                Today's Weather Tips
              </h2>
              <MessageCircle className="h-5 w-5 text-green-600" />
            </div>
            <Carousel className="w-full">
              <CarouselContent>
                {weatherTips[currentWeather.type].map((tip, index) => (
                  <CarouselItem key={index}>
                    <WeatherTip 
                      tip={tip} 
                      weatherType={currentWeather.type} 
                      index={index} 
                    />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex justify-center mt-2">
                <CarouselPrevious className="static translate-y-0 mx-1" />
                <CarouselNext className="static translate-y-0 mx-1" />
              </div>
            </Carousel>
          </div>

          {/* Weather Forecast */}
          <Card className="bg-white bg-opacity-20 backdrop-blur-md border border-white border-opacity-20 shadow-lg p-4 mb-6 transition-all duration-300 hover:bg-opacity-30">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-lg font-semibold ${textClasses[timeOfDay]}`}>
                7-Day Forecast
              </h2>
              <CalendarDays className="h-5 w-5 text-blue-500" />
            </div>
            <ScrollArea className="h-[180px]">
              <div className="space-y-3">
                {forecast.map((day, index) => (
                  <WeatherForecast 
                    key={index} 
                    day={day.day} 
                    weatherType={day.type as WeatherType} 
                    high={day.high} 
                    low={day.low} 
                  />
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Chat Button */}
          <div className="fixed bottom-20 right-4 z-20">
            <Button 
              onClick={() => setShowChat(!showChat)}
              className="h-12 w-12 rounded-full bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 shadow-lg flex items-center justify-center transform transition-all duration-300 hover:scale-105 active:scale-95"
            >
              <MessageCircle className="h-6 w-6 text-white" />
            </Button>
          </div>

          {/* Chat Dialog */}
          {showChat && (
            <div className={`fixed bottom-36 right-4 bg-white/10 backdrop-blur-md rounded-lg shadow-xl border border-white/20 p-4 transition-all duration-300 ${chatExpanded ? 'w-[300px] h-[400px]' : 'w-[300px]'} z-20 animate-fade-in`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center">
                  <div className="mr-2">
                    {currentWeather.type === "sunny" ? "☀️" : 
                     currentWeather.type === "cloudy" ? "⛅" :
                     currentWeather.type === "rainy" ? "🌧️" : "🌤️"}
                  </div>
                  <p className="text-sm font-medium text-white">
                    {!chatExpanded && (currentWeather.type === "sunny" 
                      ? "It's sunny and bright today—perfect for airing out your grains. Want a crop tip for this weather?"
                      : currentWeather.type === "rainy"
                      ? "Rain's coming down! Let's talk about water management for your crops."
                      : "How can I help with your farming today?")}
                  </p>
                </div>
                <button 
                  onClick={() => setChatExpanded(!chatExpanded)}
                  className="text-white hover:bg-white/20 rounded-full p-1 transition-colors"
                >
                  {chatExpanded ? '🔽' : '🔼'}
                </button>
              </div>
              
              {chatExpanded ? (
                <div className="h-[320px] overflow-auto pr-1 scrollbar-thin">
                  {getChatContent()}
                </div>
              ) : (
                <div className="flex space-x-2 mt-2">
                  <Button 
                    onClick={handleWeatherTipsClick}
                    size="sm" 
                    variant="outline" 
                    className="text-xs flex-1 bg-white/5 text-white border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    Weather tips
                  </Button>
                  <Button 
                    onClick={handleCropAdviceClick}
                    size="sm" 
                    variant="outline" 
                    className="text-xs flex-1 bg-white/5 text-white border-white/20 hover:bg-white/20 transition-all duration-300"
                  >
                    Crop advice
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default WeatherSpiritPage;
