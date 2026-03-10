import React, { useState, useEffect } from 'react';
import { MapPin, Droplets, Wind, Info, Cloud, Clock, ChevronDown } from 'lucide-react';

// We map our locations to both the "Zone" (for Waktu Solat) and the "City" (for WeatherAPI)
const LOCATIONS = [
  // Wilayah Persekutuan
  { id: 'WLY01', city: 'Kuala Lumpur', name: 'Kuala Lumpur & Putrajaya', state: 'Wilayah Persekutuan' },
  { id: 'WLY02', city: 'Labuan', name: 'Labuan', state: 'Wilayah Persekutuan' },
  
  // Selangor
  { id: 'SGR01', city: 'Shah Alam', name: 'Gombak, Petaling, Sepang, Hulu Langat, Hulu Selangor, S.Alam', state: 'Selangor' },
  { id: 'SGR02', city: 'Kuala Selangor', name: 'Kuala Selangor, Sabak Bernam', state: 'Selangor' },
  { id: 'SGR03', city: 'Klang', name: 'Klang, Kuala Langat', state: 'Selangor' },
  
  // Johor
  { id: 'JHR01', city: 'Mersing', name: 'Pulau Aur & Pulau Pemanggil', state: 'Johor' },
  { id: 'JHR02', city: 'Johor Bahru', name: 'Johor Bahru, Kota Tinggi, Mersing', state: 'Johor' },
  { id: 'JHR03', city: 'Kluang', name: 'Kluang, Pontian', state: 'Johor' },
  { id: 'JHR04', city: 'Batu Pahat', name: 'Batu Pahat, Muar, Segamat, Gemas', state: 'Johor' },
  
  // Kedah
  { id: 'KDH01', city: 'Alor Setar', name: 'Kota Setar, Kubang Pasu, Pokok Sena', state: 'Kedah' },
  { id: 'KDH02', city: 'Sungai Petani', name: 'Kuala Muda, Yan, Pendang', state: 'Kedah' },
  { id: 'KDH03', city: 'Sik', name: 'Padang Terap, Sik', state: 'Kedah' },
  { id: 'KDH04', city: 'Baling', name: 'Baling', state: 'Kedah' },
  { id: 'KDH05', city: 'Kulim', name: 'Bandar Baharu, Kulim', state: 'Kedah' },
  { id: 'KDH06', city: 'Langkawi', name: 'Langkawi', state: 'Kedah' },
  { id: 'KDH07', city: 'Gurun', name: 'Gunung Jerai', state: 'Kedah' },
  
  // Kelantan
  { id: 'KTN01', city: 'Kota Bharu', name: 'Kota Bharu, Bachok, Pasir Puteh, Tumpat, Pasir Mas, dll', state: 'Kelantan' },
  { id: 'KTN02', city: 'Gua Musang', name: 'Gua Musang, Jeli, Lojing', state: 'Kelantan' },
  
  // Melaka
  { id: 'MLK01', city: 'Malacca', name: 'Seluruh Negeri Melaka', state: 'Melaka' },
  
  // Negeri Sembilan
  { id: 'NSN01', city: 'Tampin', name: 'Tampin, Jempol', state: 'Negeri Sembilan' },
  { id: 'NSN02', city: 'Seremban', name: 'Seremban, Port Dickson, Kuala Pilah, Jelebu, Rembau', state: 'Negeri Sembilan' },
  
  // Pahang
  { id: 'PHG01', city: 'Tioman', name: 'Pulau Tioman', state: 'Pahang' },
  { id: 'PHG02', city: 'Kuantan', name: 'Kuantan, Pekan, Rompin, Muadzam Shah', state: 'Pahang' },
  { id: 'PHG03', city: 'Temerloh', name: 'Jerantut, Temerloh, Maran, Bera, Jengka', state: 'Pahang' },
  { id: 'PHG04', city: 'Bentong', name: 'Bentong, Lipis, Raub', state: 'Pahang' },
  { id: 'PHG05', city: 'Bukit Tinggi', name: 'Genting Sempah, Janda Baik, Bukit Tinggi', state: 'Pahang' },
  { id: 'PHG06', city: 'Cameron Highlands', name: 'Cameron Highlands, Genting Highlands, Bukit Fraser', state: 'Pahang' },
  
  // Perak
  { id: 'PRK01', city: 'Tapah', name: 'Tapah, Slim River, Tanjung Malim', state: 'Perak' },
  { id: 'PRK02', city: 'Ipoh', name: 'Ipoh, Kuala Kangsar, Sg. Siput, Batu Gajah, Kampar', state: 'Perak' },
  { id: 'PRK03', city: 'Gerik', name: 'Lenggong, Pengkalan Hulu, Gerik', state: 'Perak' },
  { id: 'PRK04', city: 'Gerik', name: 'Temengor, Belum', state: 'Perak' },
  { id: 'PRK05', city: 'Teluk Intan', name: 'Teluk Intan, Lumut, Sitiawan, Kg Gajah, dll', state: 'Perak' },
  { id: 'PRK06', city: 'Taiping', name: 'Taiping, Bagan Serai, Parit Buntar, Selama', state: 'Perak' },
  { id: 'PRK07', city: 'Taiping', name: 'Bukit Larut', state: 'Perak' },
  
  // Perlis
  { id: 'PLS01', city: 'Kangar', name: 'Seluruh Negeri Perlis', state: 'Perlis' },
  
  // Pulau Pinang
  { id: 'PNG01', city: 'Georgetown', name: 'Seluruh Negeri Pulau Pinang', state: 'Pulau Pinang' },
  
  // Sabah
  { id: 'SBH01', city: 'Sandakan', name: 'Sandakan (Timur), Bukit Garam, dll', state: 'Sabah' },
  { id: 'SBH02', city: 'Beluran', name: 'Beluran, Telupid, Pinangah, dll', state: 'Sabah' },
  { id: 'SBH03', city: 'Lahad Datu', name: 'Lahad Datu, Silabukan, Tungku, Semporna', state: 'Sabah' },
  { id: 'SBH04', city: 'Tawau', name: 'Bandar Tawau, Balong, Merotai, Kalabakan', state: 'Sabah' },
  { id: 'SBH05', city: 'Kudat', name: 'Kudat, Kota Marudu, Pitas, Pulau Banggi', state: 'Sabah' },
  { id: 'SBH06', city: 'Ranau', name: 'Gunung Kinabalu', state: 'Sabah' },
  { id: 'SBH07', city: 'Kota Kinabalu', name: 'Kota Kinabalu, Penampang, Papar, Putatan, dll', state: 'Sabah' },
  { id: 'SBH08', city: 'Keningau', name: 'Pensiangan, Keningau, Tambunan, Nabawan', state: 'Sabah' },
  { id: 'SBH09', city: 'Beaufort', name: 'Beaufort, Kuala Penyu, Sipitang, Tenom, dll', state: 'Sabah' },
  
  // Sarawak
  { id: 'SWK01', city: 'Limbang', name: 'Limbang, Lawas, Sundar, Trusan', state: 'Sarawak' },
  { id: 'SWK02', city: 'Miri', name: 'Miri, Niah, Bekenu, Sibuti, Marudi', state: 'Sarawak' },
  { id: 'SWK03', city: 'Bintulu', name: 'Pandan, Belaga, Suai, Tatau, Bintulu', state: 'Sarawak' },
  { id: 'SWK04', city: 'Sibu', name: 'Sibu, Mukah, Dalat, Song, Igan, Oya, dll', state: 'Sarawak' },
  { id: 'SWK05', city: 'Sarikei', name: 'Sarikei, Matu, Julau, Rajang, Daro, dll', state: 'Sarawak' },
  { id: 'SWK06', city: 'Sri Aman', name: 'Lubok Antu, Sri Aman, Betong, Saratok, dll', state: 'Sarawak' },
  { id: 'SWK07', city: 'Serian', name: 'Serian, Simunjan, Samarahan, Sebuyau, dll', state: 'Sarawak' },
  { id: 'SWK08', city: 'Kuching', name: 'Kuching, Bau, Lundu, Sematan', state: 'Sarawak' },
];

const PRAYERS = [
  { key: 'imsak', label: 'Imsak' },
  { key: 'fajr', label: 'Subuh' },
  { key: 'syuruk', label: 'Syuruk' },
  { key: 'dhuha', label: 'Dhuha' },
  { key: 'dhuhr', label: 'Zohor' }, 
  { key: 'asr', label: 'Asar' },
  { key: 'maghrib', label: 'Maghrib' },
  { key: 'isha', label: 'Isyak' }
];

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;

export default function App() {
  const [selectedLoc, setSelectedLoc] = useState(LOCATIONS[0]);
  const [allPrayerTimes, setAllPrayerTimes] = useState([]);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [weather, setWeather] = useState(null);
  const [nextPrayer, setNextPrayer] = useState('');
  const [dayOffset, setDayOffset] = useState(0);
  
  const [weatherError, setWeatherError] = useState('');
  const [loadingSolat, setLoadingSolat] = useState(true);

  // ==========================================
  // API CALL 1: WAKTU SOLAT
  // ==========================================
  useEffect(() => {
    const fetchSolat = async () => {
      setLoadingSolat(true);
      try {
        const zoneId = selectedLoc.id.replace(/[^A-Z0-9]/gi, '');
        const response = await fetch(`https://api.waktusolat.app/solat/${encodeURIComponent(zoneId)}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        
        if (data && data.prayerTime) {
            const adjustTime = (timeStr, mins) => {
              const [h, m, s = 0] = timeStr.split(':').map(Number);
              const d = new Date();
              d.setHours(h, m + mins, s);
              return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}:${d.getSeconds().toString().padStart(2, '0')}`;
            };
            
            // Save all schedules for this month so we can access upcoming days
            const processed = data.prayerTime.map(dayData => ({
              ...dayData,
              imsak: adjustTime(dayData.fajr, -10),
              dhuha: adjustTime(dayData.syuruk, 28)
            }));
            
            setAllPrayerTimes(processed);
        }
      } catch (err) {
        console.error('Failed to fetch prayer times:', err);
      } finally {
        setLoadingSolat(false);
      }
    };

    fetchSolat();
  }, [selectedLoc]);

  // Update prayer times when the user changes the Day Tab (dayOffset)
  useEffect(() => {
    if (allPrayerTimes.length === 0) return;
    
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + dayOffset);
    const day = targetDate.getDate().toString().padStart(2, '0');
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const month = monthNames[targetDate.getMonth()];
    const year = targetDate.getFullYear();
    const targetStr = `${day}-${month}-${year}`; 

    // Find the specific date, or use the first data as a fallback (if skipping to next month)
    const targetData = allPrayerTimes.find(p => p.date === targetStr) || allPrayerTimes[0];
    setPrayerTimes(targetData);
  }, [allPrayerTimes, dayOffset]);

  // ==========================================
  // API CALL 2: WEATHER 
  // ==========================================
  useEffect(() => {
    const fetchWeather = async () => {
      if (!WEATHER_API_KEY) {
        setWeather(null);
        return;
      }

      try {
        setWeatherError('');
        // Change to days=7 to get a weekly forecast
        const res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(selectedLoc.city)}&days=7&aqi=no`);
        if (!res.ok && res.status !== 400) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        
        if (data.error) {
            setWeatherError(typeof data.error.message === 'string' ? data.error.message.slice(0, 200) : 'Unknown error');
            setWeather(null);
        } else {
            setWeather(data); 
        }
      } catch (err) {
        setWeatherError("Failed to connect to weather service.");
      }
    };

    fetchWeather();
  }, [selectedLoc]); 

  // ==========================================
  // UTILITY: Highlight next prayer
  // ==========================================
  useEffect(() => {
    if (!prayerTimes) return;
    
    const updateNextPrayer = () => {
      // Don't show the "Next" highlight if the user is viewing tomorrow's/future schedule tab
      if (dayOffset !== 0) {
        setNextPrayer('');
        return;
      }

      const now = new Date();
      const currentTimeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}:00`;

      let found = false;
      for (let p of PRAYERS.filter(p => !['imsak', 'dhuha'].includes(p.key))) {
        if (prayerTimes[p.key] && currentTimeStr < prayerTimes[p.key]) {
          setNextPrayer(p.label);
          found = true;
          break;
        }
      }
      if (!found) setNextPrayer('Subuh'); 
    };

    updateNextPrayer();
    const interval = setInterval(updateNextPrayer, 60000); 
    return () => clearInterval(interval);
  }, [prayerTimes]);

  const formatTime = (timeStr) => {
    if (!timeStr) return '--:--';
    const parts = timeStr.toString().split(':');
    if (parts.length >= 2) {
      let hour = parseInt(parts[0], 10);
      const m = parts[1];
      const ampm = hour >= 12 ? 'PM' : 'AM';
      hour = hour % 12 || 12;
      return `${hour}:${m} ${ampm}`;
    }
    return timeStr;
  };

  const currentDate = new Date().toLocaleDateString('en-MY', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const uniqueStates = [...new Set(LOCATIONS.map(loc => loc.state))];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100 font-sans p-4 md:p-8 lg:p-12 flex flex-col items-center">
      
      <div className="max-w-7xl w-full space-y-6 md:space-y-10">
        
        {/* HEADER SECTION */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 tracking-tight">
              Solat & Weather Hub
            </h1>
            <p className="text-lg md:text-xl text-slate-400 mt-2">{currentDate}</p>
          </div>
          
          <div className="flex items-center w-full md:w-auto">
            <div className="relative w-full md:w-auto max-w-full md:max-w-[400px]">
              <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 md:w-6 md:h-6 text-emerald-500 pointer-events-none" />
              
              <select 
                className="w-full bg-slate-800 border-2 border-slate-700 text-slate-200 rounded-2xl pl-12 pr-12 py-3.5 md:py-4 text-sm md:text-base appearance-none outline-none focus:border-emerald-500 hover:border-slate-600 transition-colors cursor-pointer font-semibold shadow-lg text-ellipsis overflow-hidden whitespace-nowrap"
                value={selectedLoc.id}
                onChange={(e) => setSelectedLoc(LOCATIONS.find(loc => loc.id === e.target.value))}
              >
                {uniqueStates.map(state => (
                  <optgroup key={state} label={state} className="bg-slate-900 text-emerald-400 font-bold">
                    {LOCATIONS.filter(loc => loc.state === state).map(loc => (
                      <option key={loc.id} value={loc.id} className="bg-slate-800 text-slate-200 font-normal">
                        {loc.name}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>

              <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </header>

        {/* DAY SELECTOR TABS (7 Days) */}
        <div className="flex overflow-x-auto gap-2 bg-slate-800/60 p-2 rounded-2xl w-full border border-slate-700/50 shadow-lg mt-2 mb-2 [&::-webkit-scrollbar]:hidden" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
          {[0, 1, 2, 3, 4, 5, 6].map(offset => {
            const d = new Date();
            d.setDate(d.getDate() + offset);
            const label = offset === 0 ? 'Today' : offset === 1 ? 'Tomorrow' : d.toLocaleDateString('en-MY', { weekday: 'long' });
            return (
              <button
                key={offset}
                onClick={() => setDayOffset(offset)}
                className={`flex-1 min-w-[100px] md:min-w-[120px] py-2.5 px-3 rounded-xl text-sm md:text-base font-bold transition-all duration-300 capitalize whitespace-nowrap ${
                  dayOffset === offset 
                    ? 'bg-emerald-500 text-emerald-950 shadow-md transform scale-[1.02]' 
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-700/50'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>

        {/* MAIN CONTENT VERTICAL LAYOUT */}
        <div className="flex flex-col gap-6 md:gap-8">
          
          {/* WAKTU SOLAT SECTION */}
          <div className="w-full">
            <div className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-6 md:p-8 lg:p-10 shadow-2xl">
              <div className="flex items-center gap-3 md:gap-4 mb-8 md:mb-10">
                <Clock className="w-7 h-7 md:w-9 md:h-9 text-emerald-500" />
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold">Prayer Times for {selectedLoc.city}</h2>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {loadingSolat ? (
                  Array.from({ length: 8 }).map((_, i) => (
                    <div key={i} className="bg-slate-700/30 animate-pulse h-32 md:h-40 rounded-3xl"></div>
                  ))
                ) : prayerTimes ? (
                  PRAYERS.map((prayer) => {
                    const isNext = nextPrayer === prayer.label;
                    return (
                      <div 
                        key={prayer.key} 
                        className={`relative overflow-hidden rounded-3xl p-5 md:p-6 lg:p-8 flex flex-col items-center justify-center transition-all duration-300 ${
                          isNext 
                            ? 'bg-emerald-500/10 border-2 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.2)] scale-105 md:scale-110 z-10' 
                            : 'bg-slate-900/50 border border-slate-700/50 hover:bg-slate-800 hover:scale-105'
                        }`}
                      >
                        {isNext && (
                          <div className="absolute top-0 w-full text-center bg-emerald-500 text-xs md:text-sm font-extrabold py-1 text-emerald-950 uppercase tracking-widest">
                            Next
                          </div>
                        )}
                        <span className={`text-base md:text-xl font-semibold mb-2 ${isNext ? 'text-emerald-400 mt-4 md:mt-5' : 'text-slate-400'}`}>
                          {prayer.label}
                        </span>
                        <span className={`text-2xl md:text-3xl lg:text-4xl font-black tracking-tight ${isNext ? 'text-white' : 'text-slate-200'}`}>
                          {formatTime(prayerTimes[prayer.key])}
                        </span>
                      </div>
                    )
                  })
                ) : (
                  <div className="col-span-full py-12 text-center text-lg md:text-xl text-slate-400">
                    Failed to load prayer times.
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* WEATHER SECTION */}
          <div className="w-full">
            {!WEATHER_API_KEY ? (
              <div className="bg-slate-800/40 border border-slate-700/50 rounded-3xl p-8 md:p-10 flex flex-col items-center justify-center text-center shadow-lg w-full">
                <Info className="w-12 h-12 md:w-16 md:h-16 text-slate-500 mb-4" />
                <h3 className="text-xl md:text-2xl font-bold text-slate-300">API Key Required</h3>
                <p className="mt-4 text-sm md:text-base text-slate-400">
                  Please add your WeatherAPI key to a <code className="text-emerald-400">.env</code> file in your project root:<br/>
                  <code className="bg-slate-900 text-emerald-400 px-3 py-1.5 rounded-lg inline-block mt-3 border border-slate-700">VITE_WEATHER_API_KEY=your_api_key_here</code> <br/>
                  <span className="text-xs text-slate-500 mt-3 block font-bold">(Remember to restart your dev server after adding it!)</span>
                </p>
              </div>
            ) : weatherError ? (
              <div className="bg-red-900/20 border border-red-500/20 rounded-3xl p-8 flex flex-col items-center justify-center text-center w-full">
                <Info className="w-12 h-12 md:w-16 md:h-16 text-red-400 mb-4" />
                <p className="text-base md:text-lg text-red-300 font-medium">{weatherError}</p>
              </div>
            ) : weather ? (
              (() => {
                const isToday = dayOffset === 0;
                // Get forecast data based on the day tab. If data is not available for the 7th day (API limitation), fallback to the first day.
                const targetForecast = weather.forecast?.forecastday[dayOffset] || weather.forecast?.forecastday[0];
                
                // Ensure no errors if the API fails to provide records for a specific day
                if (!targetForecast) return null;

                const currentTemp = isToday ? weather.current.temp_c : targetForecast.day.avgtemp_c;
                const condition = isToday ? weather.current.condition : targetForecast.day.condition;
                const wind = isToday ? weather.current.wind_kph : targetForecast.day.maxwind_kph;
                const humidity = isToday ? weather.current.humidity : targetForecast.day.avghumidity;
                
                return (
                  <div className="bg-gradient-to-br from-emerald-900/40 to-slate-800/80 border border-emerald-500/20 rounded-3xl p-8 md:p-10 flex flex-col lg:flex-row gap-8 lg:gap-12 relative overflow-hidden group shadow-2xl w-full">
                    {/* Background Decor */}
                    <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none">
                      <Cloud className="w-48 h-48 md:w-64 md:h-64" />
                    </div>
                    
                    {/* Current Weather (Left side on Desktop) */}
                    <div className="relative z-10 flex flex-col justify-center lg:w-1/3 xl:w-1/4">
                      <h2 className="text-lg md:text-xl text-slate-400 font-semibold flex items-center gap-2 mb-4">
                        {isToday ? 'Current Weather' : 'Average Weather'}
                      </h2>
                      <div className="flex justify-between items-center gap-4">
                        <div className="text-6xl md:text-7xl lg:text-8xl font-black tracking-tighter">
                          {Math.round(currentTemp)}°<span className="text-3xl md:text-4xl text-emerald-500">C</span>
                        </div>
                        <img src={`https:${condition.icon}`} alt="Weather icon" className="w-24 h-24 md:w-28 md:h-28 object-contain drop-shadow-lg" />
                      </div>
                      
                      <p className="text-2xl md:text-3xl font-bold text-slate-100 capitalize mt-4 mb-6">
                        {condition.text}
                      </p>
                      
                      <div className="flex flex-wrap gap-3 md:gap-4">
                        <div className="flex items-center gap-2 text-slate-300 text-base md:text-lg font-medium bg-slate-900/50 px-4 py-2.5 rounded-xl shadow-inner">
                          <Wind className="w-5 h-5 md:w-6 md:h-6 text-cyan-400" />
                          {wind} km/h
                        </div>
                        <div className="flex items-center gap-2 text-slate-300 text-base md:text-lg font-medium bg-slate-900/50 px-4 py-2.5 rounded-xl shadow-inner">
                          <Droplets className="w-5 h-5 md:w-6 md:h-6 text-blue-400" />
                          {humidity}%
                        </div>
                      </div>
                    </div>

                    {/* Hourly Forecast (Right side on Desktop) */}
                    <div className="relative z-10 flex-grow border-t lg:border-t-0 lg:border-l border-slate-700/50 pt-8 lg:pt-0 lg:pl-12 flex flex-col justify-center overflow-hidden">
                      <h3 className="text-sm md:text-base font-semibold text-slate-400 mb-6 uppercase tracking-wider">
                        {isToday ? "Today's Forecast" : "Hourly Forecast"}
                      </h3>
                      <div className="flex gap-4 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden w-full" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                        {targetForecast.hour
                          .filter(h => isToday ? h.time_epoch >= Math.floor(Date.now() / 1000) - 3600 : true)
                          .map((hour, index) => (
                          <div key={index} className="flex flex-col items-center min-w-[80px] md:min-w-[90px] bg-slate-900/40 hover:bg-slate-800/60 transition-colors p-4 rounded-2xl shadow-inner border border-slate-700/30">
                            <span className="text-slate-300 text-sm md:text-base font-medium mb-2 whitespace-nowrap">
                              {isToday && new Date(hour.time).getHours() === new Date().getHours() ? 'Now' : 
                               new Date(hour.time).toLocaleTimeString('en-US', { hour: 'numeric', hour12: true })}
                            </span>
                            <img src={`https:${hour.condition.icon}`} alt="icon" className="w-12 h-12 object-contain my-2" />
                            <span className="text-slate-100 font-bold text-xl md:text-2xl mt-1">{Math.round(hour.temp_c)}°</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })()
            ) : (
              <div className="bg-slate-800/40 animate-pulse rounded-3xl p-8 w-full min-h-[250px]"></div>
            )}
          </div>
          
        </div>
      </div>
    </div>
  );
}