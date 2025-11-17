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
  weekday: string;
}

const weatherIcons = {
  sunny: 'Sun',
  cloudy: 'Cloud',
  rainy: 'CloudRain',
  snow: 'Snowflake',
  partlyCloudy: 'CloudSun',
};

const weatherConditionsRu = {
  sunny: 'Солнечно',
  cloudy: 'Облачно',
  rainy: 'Дождь',
  snow: 'Снег',
  partlyCloudy: 'Переменная облачность',
};

const generateMonthWeather = (): DayWeather[] => {
  const conditions: Array<'sunny' | 'cloudy' | 'rainy' | 'snow' | 'partlyCloudy'> = [
    'sunny',
    'cloudy',
    'rainy',
    'snow',
    'partlyCloudy',
  ];
  
  const monthNames = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
  const weekdays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  const currentMonth = new Date().getMonth();
  const today = new Date();
  
  return Array.from({ length: 30 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    const weekdayIndex = date.getDay();
    
    return {
      date: `${date.getDate()} ${monthNames[currentMonth]}`,
      day: date.getDate(),
      temp: Math.floor(Math.random() * 30) - 5,
      condition: conditions[Math.floor(Math.random() * conditions.length)],
      humidity: Math.floor(Math.random() * 40) + 40,
      wind: Math.floor(Math.random() * 15) + 2,
      weekday: weekdays[weekdayIndex],
    };
  });
};

const Index = () => {
  const [selectedDay, setSelectedDay] = useState<DayWeather | null>(null);
  const monthWeather = generateMonthWeather();
  const today = monthWeather[0];
  const currentMonth = new Date().toLocaleDateString('ru-RU', { month: 'long', year: 'numeric' });

  return (
    <div className="min-h-screen bg-gradient-to-br from-weather-blue via-weather-purple to-weather-pink">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
            Прогноз погоды
          </h1>
          <p className="text-xl text-white/90" style={{ fontFamily: 'Open Sans, sans-serif' }}>
            {currentMonth}
          </p>
        </header>

        <Card className="bg-white/95 backdrop-blur-lg border-none mb-8 overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8">
              <div className="flex items-center gap-6">
                <div className="bg-gradient-to-br from-weather-blue to-weather-purple p-6 rounded-3xl">
                  <Icon
                    name={weatherIcons[today.condition]}
                    size={80}
                    className="text-white"
                  />
                </div>
                <div>
                  <div className="text-7xl font-bold bg-gradient-to-r from-weather-blue to-weather-purple bg-clip-text text-transparent mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                    {today.temp > 0 ? '+' : ''}{today.temp}°
                  </div>
                  <div className="text-2xl text-gray-700 font-semibold mb-1" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    {weatherConditionsRu[today.condition]}
                  </div>
                  <div className="text-lg text-gray-500" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    Сегодня, {today.date}
                  </div>
                </div>
              </div>

              <div className="flex gap-6">
                <div className="text-center px-6 py-4 bg-gradient-to-br from-weather-blue/10 to-weather-purple/10 rounded-2xl">
                  <Icon name="Droplets" size={32} className="text-weather-blue mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{today.humidity}%</div>
                  <div className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>Влажность</div>
                </div>
                <div className="text-center px-6 py-4 bg-gradient-to-br from-weather-purple/10 to-weather-pink/10 rounded-2xl">
                  <Icon name="Wind" size={32} className="text-weather-purple mx-auto mb-2" />
                  <div className="text-3xl font-bold text-gray-900 mb-1">{today.wind} м/с</div>
                  <div className="text-sm text-gray-600" style={{ fontFamily: 'Open Sans, sans-serif' }}>Ветер</div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        <h2 className="text-3xl font-bold text-white mb-6" style={{ fontFamily: 'Montserrat, sans-serif' }}>
          Прогноз на месяц
        </h2>

        <div className="grid grid-cols-7 gap-3">
          {monthWeather.map((day, index) => (
            <Card
              key={index}
              className="bg-white/95 backdrop-blur-lg border-none hover:bg-white hover:scale-105 transition-all duration-200 cursor-pointer"
              onClick={() => setSelectedDay(day)}
            >
              <div className="p-3 text-center">
                <div className="text-gray-900 font-semibold text-sm mb-1" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  {day.weekday}
                </div>
                <div className="text-gray-700 text-xs mb-3" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  {day.day}
                </div>
                <div className="flex justify-center mb-3">
                  <Icon
                    name={weatherIcons[day.condition]}
                    size={32}
                    className="text-weather-blue"
                  />
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-2" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                  {day.temp > 0 ? '+' : ''}{day.temp}°
                </div>
                <div className="text-gray-600 text-xs space-y-1" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                  <div className="flex items-center justify-center gap-1">
                    <Icon name="Droplets" size={10} className="text-weather-blue" />
                    {day.humidity}%
                  </div>
                  <div className="flex items-center justify-center gap-1">
                    <Icon name="Wind" size={10} className="text-weather-purple" />
                    {day.wind} м/с
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {selectedDay && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedDay(null)}
          >
            <Card
              className="bg-white max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-1" style={{ fontFamily: 'Montserrat, sans-serif' }}>
                      {selectedDay.weekday}, {selectedDay.date}
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
                  <div className="bg-gradient-to-br from-weather-blue to-weather-purple p-6 rounded-3xl">
                    <Icon
                      name={weatherIcons[selectedDay.condition]}
                      size={64}
                      className="text-white"
                    />
                  </div>
                  <div className="text-6xl font-bold ml-6 bg-gradient-to-r from-weather-blue to-weather-purple bg-clip-text text-transparent" style={{ fontFamily: 'Montserrat, sans-serif' }}>
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
                    <span className="text-xl font-bold text-gray-900">
                      {weatherConditionsRu[selectedDay.condition]}
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
