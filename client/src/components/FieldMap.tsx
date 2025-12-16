import { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, Marker } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Maximize2, Layers, Filter } from 'lucide-react';
import FilterChips from './FilterChips';

interface LotePolygon {
  id: string;
  nombre: string;
  coordenadas: LatLngExpression[];
  color: string;
  animalesCount: number;
}

interface AnimalMarker {
  id: string;
  caravana: string;
  posicion: LatLngExpression;
  categoria: string;
}

interface FieldMapProps {
  center?: LatLngExpression;
  zoom?: number;
  lotes?: LotePolygon[];
  animales?: AnimalMarker[];
  onFullscreen?: () => void;
}

export default function FieldMap({
  center = [-34.6037, -58.3816],
  zoom = 14,
  lotes = [],
  animales = [],
  onFullscreen,
}: FieldMapProps) {
  const [showFilters, setShowFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // todo: remove mock functionality
  const mockLotes: LotePolygon[] = [
    {
      id: '1',
      nombre: 'Lote Norte',
      coordenadas: [
        [-34.600, -58.385],
        [-34.600, -58.375],
        [-34.605, -58.375],
        [-34.605, -58.385],
      ],
      color: '#22c55e',
      animalesCount: 45,
    },
    {
      id: '2',
      nombre: 'Lote Sur',
      coordenadas: [
        [-34.606, -58.385],
        [-34.606, -58.375],
        [-34.612, -58.375],
        [-34.612, -58.385],
      ],
      color: '#3b82f6',
      animalesCount: 32,
    },
    {
      id: '3',
      nombre: 'Lote Este',
      coordenadas: [
        [-34.600, -58.370],
        [-34.600, -58.360],
        [-34.608, -58.360],
        [-34.608, -58.370],
      ],
      color: '#f59e0b',
      animalesCount: 28,
    },
  ];

  const displayLotes = lotes.length > 0 ? lotes : mockLotes;

  const filterOptions = [
    { id: 'vacas', label: 'Vacas', value: 'vacas' },
    { id: 'toros', label: 'Toros', value: 'toros' },
    { id: 'terneros', label: 'Terneros', value: 'terneros' },
    { id: 'prenadas', label: 'Preñadas', value: 'prenadas' },
  ];

  const toggleFilter = (id: string) => {
    setActiveFilters(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <Card className="overflow-hidden" data-testid="field-map">
      <div className="relative">
        <div className="absolute top-2 right-2 z-[1000] flex gap-2">
          <Button
            size="icon"
            variant="secondary"
            onClick={() => setShowFilters(!showFilters)}
            data-testid="button-map-filter"
          >
            <Filter className="w-4 h-4" />
          </Button>
          <Button
            size="icon"
            variant="secondary"
            onClick={onFullscreen}
            data-testid="button-map-fullscreen"
          >
            <Maximize2 className="w-4 h-4" />
          </Button>
        </div>

        {showFilters && (
          <div className="absolute top-14 left-2 right-2 z-[1000] bg-card p-2 rounded-lg border">
            <FilterChips
              filters={filterOptions}
              activeFilters={activeFilters}
              onToggle={toggleFilter}
              onClearAll={() => setActiveFilters([])}
            />
          </div>
        )}

        <MapContainer
          center={center}
          zoom={zoom}
          style={{ height: '400px', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {displayLotes.map((lote) => (
            <Polygon
              key={lote.id}
              positions={lote.coordenadas}
              pathOptions={{ 
                color: lote.color, 
                fillColor: lote.color,
                fillOpacity: 0.3,
                weight: 2,
              }}
            >
              <Popup>
                <div className="p-2">
                  <h4 className="font-semibold">{lote.nombre}</h4>
                  <p className="text-sm text-muted-foreground">
                    {lote.animalesCount} animales
                  </p>
                </div>
              </Popup>
            </Polygon>
          ))}
        </MapContainer>

        <div className="absolute bottom-2 left-2 z-[1000] bg-card/90 backdrop-blur-sm p-2 rounded-lg border">
          <div className="flex items-center gap-2 text-xs">
            <Layers className="w-4 h-4" />
            <span className="font-medium">Leyenda:</span>
          </div>
          <div className="flex flex-wrap gap-2 mt-1">
            {displayLotes.map((lote) => (
              <Badge 
                key={lote.id} 
                variant="outline" 
                style={{ borderColor: lote.color, color: lote.color }}
              >
                {lote.nombre}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
