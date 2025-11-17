import { useState } from 'react';
import { Card } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface DayWeather {
  date: string;
  day: number;
  temp: number;
  condition: 'sunny' | 'cloudy' | 'rainy' | 'snow' | 'partlyCloudy';
  humidity: number;
  wind: number;
}

const weatherIcons = {
  sunny: 'Sun',
  cloudy: 'Cloud',
  rainy: 'CloudRain',
  snow: 'Snowflake',
  partlyCloudy: 'CloudSun',
};

const generateMonthWeather = (): DayWeather[] => {
  const conditions: Array<'sunny' | 'cloudy' | 'rainy' | 'snow' | 'partlyCloudy'> = [
    'sunny',
    'cloudy',
    'rainy',
    'snow',
    'partlyCloudy',
  ];
  
  const monthNames = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
  const currentMonth = new Date().getMonth();
  
  return Array.from({ length: 30 }, (_, i) => ({
    date: `${i + 1} ${monthNames[currentMonth]}`,
    day: i + 1,
    temp: Math.floor(Math.random() * 30) - 5,
    condition: conditions[Math.floor(Math.random() * conditions.length)],
    humidity: Math.floor(Math.random() * 40) + 40,
    wind: Math.floor(Math.random() * 15) + 2,
  }));
};

const Index = () => {
  const [selectedDay, setSelectedDay] = useState<DayWeather | null>(null);
  const monthWeather = generateMonthWeather();
  const currentMonth = new Date().toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-weather-blue via-weather-purple to-weather-pink">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-12 animate-fade-in">
          <h1 className="text-6xl font-bold text-white mb-4" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Прогноз погоды
          </h1>
          <p className="text-2xl text-white/90" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            {currentMonth}
          </p>
        </header>

        <div className="mb-8 bg-white/10 backdrop-blur-md rounded-3xl p-6 animate-scale-in">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-semibold text-white" style={{ fontFamily: 'Montserrat, sans-serif' }}>
              График температуры
            </h2>
          </div>
          <div className="relative h-64 flex items-end justify-between gap-1">
            {monthWeather.map((day, index) => {
              const maxTemp = 25;
              const minTemp = -5;
              const height = ((day.temp - minTemp) / (maxTemp - minTemp)) * 100;
              
              return (
                <div
                  key={index}
                  className="relative flex-1 group cursor-pointer"
                  onClick={() => setSelectedDay(day)}
                  style={{ animationDelay: `${index * 0.02}s` }}
                >
                  <div
                    className="w-full bg-gradient-to-t from-weather-orange to-weather-pink rounded-t-lg transition-all duration-300 hover:opacity-80 animate-fade-in"
                    style={{ height: `${Math.max(height, 10)}%` }}
                  />
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white text-gray-900 px-2 py-1 rounded text-xs whitespace-nowrap">
                    {day.temp}°C
                  </div>
                </div>
              );
            })}
          </div>
          <div className="flex justify-between mt-4 text-white/70 text-sm">
            <span>1</span>
            <span>10</span>
            <span>20</span>
            <span>30</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4">
          {monthWeather.map((day, index) => (
            <Card
              key={index}
              className="bg-white/20 backdrop-blur-lg border-white/30 hover:bg-white/30 hover:scale-105 transition-all duration-300 cursor-pointer animate-fade-in group"
              onClick={() => setSelectedDay(day)}
              style={{ animationDelay: `${index * 0.03}s` }}
            >
              <div className="p-4 text-center">
                <div className="text-white/80 text-sm mb-2" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  {day.date}
                </div>
                <div className="flex justify-center mb-3 animate-float">
                  <Icon
                    name={weatherIcons[day.condition]}
                    size={40}
                    className="text-white drop-shadow-lg"
                  />
                </div>
                <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {day.temp > 0 ? '+' : ''}{day.temp}°
                </div>
                <div className="text-white/60 text-xs space-y-1" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  <div className="flex items-center justify-center gap-1">
                    <Icon name="Droplets" size={12} />
                    {day.humidity}%
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Icon name="Wind" size={12} />
                    {day.wind} м/с
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {selectedDay && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-fade-in"
            onClick={() => setSelectedDay(null)}
          >
            <Card
              className="bg-white max-w-md w-full animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {selectedDay.date}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedDay(null)}
                    className="text-gray-400 hover:text-gray-900 transition-colors"
                  >
                    <Icon name="X" size={24} />
                  </button>
                </div>

                <div className="flex items-center justify-center mb-8">
                  <Icon
                    name={weatherIcons[selectedDay.condition]}
                    size={80}
                    className="text-weather-blue animate-float"
                  />
                  <div className="text-6xl font-bold ml-4 bg-gradient-to-r from-weather-blue to-weather-purple bg-clip-text text-transparent" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {selectedDay.temp > 0 ? '+' : ''}{selectedDay.temp}°C
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-weather-blue/10 to-weather-purple/10 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Icon name="Droplets" size={24} className="text-weather-blue" />
                      <span className="text-gray-700 font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>Влажность</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">{selectedDay.humidity}%</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-weather-purple/10 to-weather-pink/10 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Icon name="Wind" size={24} className="text-weather-purple" />
                      <span className="text-gray-700 font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>Ветер</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900">{selectedDay.wind} м/с</span>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-gradient-to-r from-weather-orange/10 to-weather-pink/10 rounded-xl">
                    <div className="flex items-center gap-3">
                      <Icon name="CloudSun" size={24} className="text-weather-orange" />
                      <span className="text-gray-700 font-medium" style={{ fontFamily: 'Open Sans, sans-serif' }}>Условия</span>
                    </div>
                    <span className="text-xl font-bold text-gray-900 capitalize">
                      {selectedDay.condition === 'sunny' && 'Солнечно'}
                      {selectedDay.condition === 'cloudy' && 'Облачно'}
                      {selectedDay.condition === 'rainy' && 'Дождь'}
                      {selectedDay.condition === 'snow' && 'Снег'}
                      {selectedDay.condition === 'partlyCloudy' && 'Переменно'}
                    </span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>

      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700;800&family=Open+Sans:wght@300;400;600;700&display=swap" rel="stylesheet" />
    </div>
  );
};

export default Index;
