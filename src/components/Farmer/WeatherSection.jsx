import React, { useState, useEffect } from 'react';
import { 
  Wind, Droplets, Sun, Cloud, CloudRain, 
  MapPin, Search, Calendar, Thermometer,
  Navigation, Eye, Gauge, Sprout
} from 'lucide-react';

const WeatherSection = () => {
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [city, setCity] = useState("Bhopal");
  const [searchInput, setSearchInput] = useState("");
  const [error, setError] = useState(null);

  const API_KEY = "828cc99e0335c9476a8f751b7c386d9a"; // Replace with your actual API Key

  useEffect(() => {
    fetchData(city);
  }, []);

  const fetchData = async (targetCity) => {
    try {
      setLoading(true);
      setError(null);
      
      const currentRes = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${targetCity}&units=metric&appid=${API_KEY}`
      );
      if (!currentRes.ok) throw new Error("City not found");
      const currentData = await currentRes.json();

      const forecastRes = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${targetCity}&units=metric&appid=${API_KEY}`
      );
      const forecastData = await forecastRes.json();

      const dailyData = forecastData.list.filter(item => item.dt_txt.includes("12:00:00"));

      setWeather(currentData);
      setForecast(dailyData);
      setCity(currentData.name);
    } catch (err) {
      setError("Location not found. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      fetchData(searchInput);
      setSearchInput("");
    }
  };

  const getFarmingAdvice = (temp, humidity, weatherMain) => {
    if (weatherMain === 'Rain') return "High chance of rain. Postpone irrigation and chemical spraying to prevent runoff.";
    if (temp > 35) return "Extreme heat detected. Increase water frequency for crops and avoid heavy field work during peak hours.";
    if (humidity > 80) return "High humidity levels. Monitor crops closely for fungal diseases or pest infestations.";
    return "Weather is stable. Ideal conditions for applying fertilizers or harvesting mature crops.";
  };

  if (loading) return (
    <div className="flex h-96 items-center justify-center">
      <div className="flex flex-col items-center gap-3">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>
        <p className="text-sm font-semibold text-slate-500">Syncing with satellite data...</p>
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto p-0 space-y-6 animate-in fade-in duration-500">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
            <MapPin className="text-blue-600" size={24} />
            {weather?.name}, {weather?.sys?.country}
          </h1>
          <p className="text-sm text-slate-500 font-medium">Station: Live Agricultural Monitoring</p>
        </div>

        <form onSubmit={handleSearch} className="flex w-full md:w-auto gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input 
              type="text" 
              placeholder="Search by city or state..." 
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              className="w-full md:w-72 pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all text-sm"
            />
          </div>
          <button type="submit" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-sm">
            Check
          </button>
        </form>
      </div>

      {error && <div className="p-4 bg-red-50 border border-red-200 text-red-600 rounded-xl text-sm font-bold">{error}</div>}

      {/* Farming Advisory Section */}
      <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-lg flex items-start gap-5 shadow-sm">
        <div className="bg-emerald-500 text-white p-3 rounded-xl shadow-md">
           <Sprout size={28} />
        </div>
        <div>
          <h4 className="text-emerald-900 font-bold text-sm uppercase tracking-wider">Smart Farming Advisory</h4>
          <p className="text-emerald-700 font-semibold mt-1 leading-relaxed">
            {getFarmingAdvice(weather?.main?.temp, weather?.main?.humidity, weather?.weather[0]?.main)}
          </p>
        </div>
      </div>

      {/* Main Weather Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        
        {/* Left: Temperature Details */}
        <div className="lg:col-span-3 bg-white border border-slate-100 rounded-xl p-8 md:p-5 flex flex-col md:flex-row items-center justify-between shadow-sm border-b-4 border-b-blue-500">
          <div className="text-center md:text-left">
            <span className="text-blue-600 font-bold uppercase tracking-widest text-[10px] bg-blue-50 px-3 py-1 rounded-full">Current Metrics</span>
            <div className="flex items-center gap-6 mt-4 justify-center md:justify-start">
               <h2 className="text-8xl font-black text-slate-900">{Math.round(weather?.main?.temp)}°</h2>
               <div>
                  <p className="text-2xl font-bold text-slate-700 capitalize">{weather?.weather[0]?.description}</p>
                  <p className="text-sm font-semibold text-slate-400">High: {Math.round(weather?.main?.temp_max)}° • Low: {Math.round(weather?.main?.temp_min)}°</p>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-10 mt-10 md:mt-0 w-full md:w-auto md:border-l border-slate-100 md:pl-12">
            <div className="flex flex-col items-center md:items-start">
               <Droplets className="text-blue-500 mb-2" size={24} />
               <span className="text-[10px] uppercase font-bold text-slate-400">Humidity</span>
               <span className="text-xl font-black text-slate-800">{weather?.main?.humidity}%</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
               <Wind className="text-blue-500 mb-2" size={24} />
               <span className="text-[10px] uppercase font-bold text-slate-400">Wind Velocity</span>
               <span className="text-xl font-black text-slate-800">{weather?.wind?.speed} <small className="text-xs font-medium text-slate-400">km/h</small></span>
            </div>
            <div className="flex flex-col items-center md:items-start col-span-2 md:col-span-1">
               <Thermometer className="text-blue-500 mb-2" size={24} />
               <span className="text-[10px] uppercase font-bold text-slate-400">Feels Like</span>
               <span className="text-xl font-black text-slate-800">{Math.round(weather?.main?.feels_like)}°C</span>
            </div>
          </div>
        </div>

        {/* Right: Atmospheric Data */}
        <div className="bg-slate-900 text-white rounded-xl p-4 flex flex-col justify-between shadow-xl">
           <div className="space-y-8">
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-2 text-slate-400"><Eye size={18}/> <span className="text-xs font-bold uppercase">Visibility</span></div>
                 <span className="font-bold">{(weather?.visibility / 1000).toFixed(1)} km</span>
              </div>
              <div className="flex justify-between items-center">
                 <div className="flex items-center gap-2 text-slate-400"><Gauge size={18}/> <span className="text-xs font-bold uppercase">Pressure</span></div>
                 <span className="font-bold">{weather?.main?.pressure} hPa</span>
              </div>
           </div>
           
           <div className="pt-6 border-t border-slate-800">
              <div className="flex items-center gap-3 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                 <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
                 Active Telemetry
              </div>
           </div>
        </div>
      </div>

      {/* 5-Day Extended Forecast */}
      <div className="space-y-5 pt-4">
        <h3 className="text-lg font-black text-slate-800 uppercase tracking-wider flex items-center gap-2">
          <Calendar size={20} className="text-blue-600" />
          5-Day Future Outlook
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {forecast.map((day, index) => (
            <div key={index} className="bg-white border border-slate-100 p-6 rounded-2xl hover:border-blue-400 transition-all text-center group">
              <p className="text-slate-400 text-[10px] font-black uppercase mb-4">
                {new Date(day.dt_txt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
              </p>
              
              <div className="flex justify-center mb-4 transform group-hover:scale-110 transition-transform">
                 {day.weather[0].main === 'Rain' ? <CloudRain className="text-blue-500" size={36} /> : 
                  day.weather[0].main === 'Clear' ? <Sun className="text-amber-400" size={36} /> : <Cloud className="text-slate-400" size={36} />}
              </div>

              <p className="text-3xl font-black text-slate-800">{Math.round(day.main.temp)}°</p>
              <p className="text-[10px] font-bold text-blue-500 bg-blue-50 py-1 px-3 rounded-full uppercase mt-2 inline-block">
                {day.weather[0].main}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WeatherSection;