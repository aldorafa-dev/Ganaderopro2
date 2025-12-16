import { useState } from 'react';
import { Plus, Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Link, useLocation } from 'wouter';
import TopHeader from '@/components/TopHeader';
import BottomNav from '@/components/BottomNav';
import AnimalCard from '@/components/AnimalCard';
import FilterChips from '@/components/FilterChips';
import EmptyState from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Beef } from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function Animales() {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('caravana');

  const filterOptions = [
    { id: 'vacas', label: 'Vacas', value: 'vacas' },
    { id: 'toros', label: 'Toros', value: 'toros' },
    { id: 'terneros', label: 'Terneros', value: 'terneros' },
    { id: 'prenadas', label: 'Preñadas', value: 'prenadas' },
    { id: 'alertas', label: 'Con Alertas', value: 'alertas' },
  ];

  // todo: remove mock functionality
  const animales = [
    { caravana: 'AR-2024-001', categoria: 'vaca' as const, sexo: 'hembra' as const, colorRaza: 'Angus Negro', lote: 'Lote Norte', rodeo: 'Principal', isPregnant: true },
    { caravana: 'AR-2024-002', categoria: 'toro' as const, sexo: 'macho' as const, colorRaza: 'Hereford', lote: 'Lote Sur', rodeo: 'Reproductores' },
    { caravana: 'AR-2024-003', categoria: 'vaca' as const, sexo: 'hembra' as const, colorRaza: 'Braford', lote: 'Lote Norte', hasAlert: true, alertMessage: 'Parto próximo - 5 días' },
    { caravana: 'AR-2024-004', categoria: 'vaquillona' as const, sexo: 'hembra' as const, colorRaza: 'Angus', lote: 'Lote Este', rodeo: 'Cría' },
    { caravana: 'AR-2024-005', categoria: 'novillo' as const, sexo: 'macho' as const, colorRaza: 'Cruzado', lote: 'Lote Sur', rodeo: 'Engorde' },
    { caravana: 'AR-2024-006', categoria: 'ternero' as const, sexo: 'macho' as const, colorRaza: 'Angus', lote: 'Lote Norte' },
    { caravana: 'AR-2024-007', categoria: 'ternera' as const, sexo: 'hembra' as const, colorRaza: 'Hereford', lote: 'Lote Sur' },
    { caravana: 'AR-2024-008', categoria: 'vaca' as const, sexo: 'hembra' as const, colorRaza: 'Angus Rojo', lote: 'Lote Este', isPregnant: true },
  ];

  const filteredAnimales = animales.filter(animal => 
    animal.caravana.toLowerCase().includes(searchQuery.toLowerCase()) ||
    animal.colorRaza?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleFilter = (id: string) => {
    setActiveFilters(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background pb-20" data-testid="page-animales">
      <TopHeader title="Animales" showEstablecimiento={true} />
      
      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por caravana o raza..."
              className="pl-10 h-12"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              data-testid="input-search-animals"
            />
          </div>
          
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="h-12 w-12" data-testid="button-filters">
                <SlidersHorizontal className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filtros y Ordenamiento</SheetTitle>
                <SheetDescription>
                  Configura los filtros para encontrar animales
                </SheetDescription>
              </SheetHeader>
              <div className="space-y-6 py-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Ordenar por</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger data-testid="select-sort">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="caravana">Caravana</SelectItem>
                      <SelectItem value="categoria">Categoría</SelectItem>
                      <SelectItem value="lote">Lote</SelectItem>
                      <SelectItem value="fecha">Fecha de Alta</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="text-sm font-medium mb-2 block">Lote</label>
                  <Select>
                    <SelectTrigger data-testid="select-lote-filter">
                      <SelectValue placeholder="Todos los lotes" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="norte">Lote Norte</SelectItem>
                      <SelectItem value="sur">Lote Sur</SelectItem>
                      <SelectItem value="este">Lote Este</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Rodeo</label>
                  <Select>
                    <SelectTrigger data-testid="select-rodeo-filter">
                      <SelectValue placeholder="Todos los rodeos" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todos</SelectItem>
                      <SelectItem value="principal">Principal</SelectItem>
                      <SelectItem value="cria">Cría</SelectItem>
                      <SelectItem value="engorde">Engorde</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </SheetContent>
          </Sheet>

          <Link href="/animales/nuevo">
            <Button className="h-12" data-testid="button-new-animal">
              <Plus className="w-5 h-5" />
            </Button>
          </Link>
        </div>

        <FilterChips
          filters={filterOptions}
          activeFilters={activeFilters}
          onToggle={toggleFilter}
          onClearAll={() => setActiveFilters([])}
        />
      </div>

      <ScrollArea className="h-[calc(100vh-16rem)]">
        <div className="px-4 pb-4 space-y-3">
          {filteredAnimales.length === 0 ? (
            <EmptyState
              icon={<Beef className="w-24 h-24" />}
              title="Sin resultados"
              description="No se encontraron animales con los filtros seleccionados"
            />
          ) : (
            filteredAnimales.map((animal) => (
              <AnimalCard
                key={animal.caravana}
                {...animal}
                onClick={() => navigate(`/animales/${animal.caravana}`)}
              />
            ))
          )}
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
}
