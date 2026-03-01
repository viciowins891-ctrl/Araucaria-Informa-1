import { useState, useEffect } from 'react';
import { MapContainer, TileLayer, useMap, Popup, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { ArrowLeft, ChevronDown, Crosshair, Info, Map as MapIcon, Globe, Moon } from 'lucide-react';

// Componente para cuidar apenas do visual e movimento do mapa
function MapLogic({ center, zoom }: { center: [number, number], zoom: number }) {
  const map = useMap();

  useEffect(() => {
    if (!map || !center) return;
    map.setView(center, zoom);
  }, [center, zoom, map]);

  useEffect(() => {
    if (!map) return;
    const fix = () => map.invalidateSize();
    fix();
    setTimeout(fix, 100);
    setTimeout(fix, 500);
    window.addEventListener('resize', fix);
    return () => window.removeEventListener('resize', fix);
  }, [map]);

  return null;
}

function App() {
  const [showSummary, setShowSummary] = useState(true);
  const [mapCenter, setMapCenter] = useState<[number, number]>([-23.550520, -46.633308]); // Default SP
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [zoom, setZoom] = useState(13);
  const [mapStyle, setMapStyle] = useState<'dark' | 'street' | 'satellite'>('dark');

  const getTileUrl = () => {
    switch (mapStyle) {
      case 'street': return "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png";
      case 'satellite': return "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
      case 'dark': default: return "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png";
    }
  };

  const handleMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newPos: [number, number] = [latitude, longitude];
          setUserLocation(newPos);
          setMapCenter(newPos);
          setZoom(18);
          console.log("Localização encontrada (Alta Precisão):", newPos);
        },
        (error) => {
          console.error("Erro ao obter localização", error);
          alert("Para usar o GPS, certifique-se de que a página carregou em HTTPS e você deu permissão.");
        },
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
      );
    } else {
      alert('Geolocalização não é suportada neste navegador.');
    }
  };

  useEffect(() => {
    handleMyLocation();
  }, []);

  return (
    <div className="flex flex-col h-screen w-full bg-slate-900 text-white overflow-hidden relative font-sans">
      {/* Header Title */}
      <div className="absolute top-0 left-0 right-0 h-24 pt-8 flex items-start justify-center z-20 pointer-events-none bg-gradient-to-b from-black/80 to-transparent">
        <h1 className="text-white text-lg font-bold drop-shadow-md">Mapa de Segurança (Premium)</h1>
      </div>

      {/* Back Button */}
      <button
        className="absolute top-6 left-4 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-slate-900/50 backdrop-blur-md hover:bg-slate-800 border border-slate-700 pointer-events-auto transition-colors focus:outline-none"
      >
        <ArrowLeft size={24} className="text-white" />
      </button>

      {/* Map Style Toggle */}
      <div className="absolute top-6 right-4 z-30 flex bg-slate-900/80 backdrop-blur-md rounded-full border border-slate-700 p-1 pointer-events-auto shadow-lg">
        <button
          onClick={() => setMapStyle('dark')}
          className={`p-2 rounded-full transition-colors ${mapStyle === 'dark' ? 'bg-blue-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          title="Modo Escuro (Alerta)"
        >
          <Moon size={18} />
        </button>
        <button
          onClick={() => setMapStyle('street')}
          className={`p-2 rounded-full transition-colors ${mapStyle === 'street' ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          title="Ruas (Claro)"
        >
          <MapIcon size={18} />
        </button>
        <button
          onClick={() => setMapStyle('satellite')}
          className={`p-2 rounded-full transition-colors ${mapStyle === 'satellite' ? 'bg-amber-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
          title="Visão Satélite Real (ArcGIS)"
        >
          <Globe size={18} />
        </button>
      </div>

      {/* Container do Mapa */}
      <div className="flex-1 w-full h-full relative z-0">
        <MapContainer
          center={mapCenter}
          zoom={zoom}
          style={{ width: '100%', height: '100%' }}
          zoomControl={false}
          attributionControl={false}
        >
          <MapLogic center={mapCenter} zoom={zoom} />

          {/* Dynamic Theme Base Map */}
          <TileLayer
            url={getTileUrl()}
            attribution={mapStyle === 'satellite' ? '&copy; Esri' : '&copy; CARTO'}
          />

          {/* User Location Pulse Marker */}
          {userLocation && (
            <>
              <CircleMarker
                center={userLocation}
                radius={8}
                pathOptions={{ color: 'white', fillColor: '#3b82f6', fillOpacity: 1, weight: 2 }}
              >
                <Popup>Você está aqui</Popup>
              </CircleMarker>
              <CircleMarker
                center={userLocation}
                radius={40}
                pathOptions={{ color: '#3b82f6', fillColor: '#3b82f6', fillOpacity: 0.15, weight: 0 }}
              />
            </>
          )}
        </MapContainer>
      </div>

      {/* Bottom Summary UI */}
      {showSummary ? (
        <div className="absolute bottom-6 left-4 right-4 z-40 pointer-events-none">
          <div className="bg-slate-900/95 border border-slate-700 rounded-3xl p-5 shadow-2xl backdrop-blur-xl pointer-events-auto mx-auto max-w-md">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h2 className="text-white font-bold text-xl">Resumo da Área</h2>
                <p className="text-emerald-400 text-xs font-bold uppercase tracking-wider">Monitoramento Ativo</p>
              </div>
              <button
                onClick={() => setShowSummary(false)}
                className="bg-slate-800 p-1.5 rounded-full border border-slate-700 hover:bg-slate-700 focus:outline-none transition-colors"
              >
                <ChevronDown size={24} className="text-slate-400" />
              </button>
            </div>

            <div className="flex gap-4 mt-2">
              <div className="flex flex-col items-center justify-center flex-1 bg-slate-800/50 p-3 rounded-xl border border-slate-700">
                <span className="text-white font-black text-2xl leading-none">0</span>
                <span className="text-slate-400 text-[10px] uppercase font-semibold mt-1">Incidentes</span>
              </div>
              <button
                onClick={handleMyLocation}
                className="flex flex-col items-center justify-center flex-1 bg-blue-600 p-3 rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)] hover:bg-blue-500 border border-blue-400 focus:outline-none transition-all active:scale-95"
              >
                <Crosshair size={24} className="text-white mb-1" />
                <span className="text-white font-bold text-[10px] uppercase">Localizar</span>
              </button>
            </div>
          </div>
        </div>
      ) : (
        /* Floating Action Buttons when summary is collapsed */
        <div className="absolute bottom-8 right-4 z-40 flex flex-col gap-3">
          <button
            onClick={handleMyLocation}
            className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.4)] border border-blue-400 hover:bg-blue-500 transition-all active:scale-95 focus:outline-none"
          >
            <Crosshair size={22} className="text-white" />
          </button>
          <button
            onClick={() => setShowSummary(true)}
            className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center shadow-lg border border-slate-600 hover:bg-slate-700 transition-all active:scale-95 focus:outline-none"
          >
            <Info size={22} className="text-blue-400" />
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
