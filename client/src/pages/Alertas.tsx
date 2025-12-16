import { useState } from 'react';
import { Bell, Check, Filter, Baby, Calendar, Clock } from 'lucide-react';
import TopHeader from '@/components/TopHeader';
import BottomNav from '@/components/BottomNav';
import AlertCard from '@/components/AlertCard';
import FilterChips from '@/components/FilterChips';
import EmptyState from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';

export default function Alertas() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('activas');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // todo: remove mock functionality
  const alertasActivas = [
    { 
      type: 'parto_proximo' as const, 
      priority: 'urgente' as const, 
      animalCaravana: 'AR-2024-015', 
      message: 'Días de gestación: 278. Parto estimado para el 20/12',
      date: '15/12/2024',
      daysRemaining: 5,
      lote: 'Lote Norte',
    },
    { 
      type: 'repeticion_celo' as const, 
      priority: 'proximo' as const, 
      animalCaravana: 'AR-2024-023', 
      message: 'Han pasado 22 días desde el último servicio sin confirmación de preñez',
      date: '12/12/2024',
      daysRemaining: 0,
      lote: 'Lote Sur',
    },
    { 
      type: 'parto_proximo' as const, 
      priority: 'proximo' as const, 
      animalCaravana: 'AR-2024-008', 
      message: 'Días de gestación: 272. Parto estimado para el 26/12',
      date: '15/12/2024',
      daysRemaining: 11,
      lote: 'Lote Este',
    },
    { 
      type: 'control_postparto' as const, 
      priority: 'rutina' as const, 
      animalCaravana: 'AR-2024-045', 
      message: 'Control programado a los 30 días post-parto',
      date: '18/12/2024',
      daysRemaining: 3,
      lote: 'Lote Norte',
    },
    { 
      type: 'control_postparto' as const, 
      priority: 'rutina' as const, 
      animalCaravana: 'AR-2024-052', 
      message: 'Revisar estado post-parto - Parto hace 25 días',
      date: '20/12/2024',
      daysRemaining: 5,
      lote: 'Lote Sur',
    },
  ];

  const alertasResueltas = [
    { 
      type: 'parto_proximo' as const, 
      priority: 'urgente' as const, 
      animalCaravana: 'AR-2024-012', 
      message: 'Parto completado exitosamente - Cría macho',
      date: '10/12/2024',
      lote: 'Lote Norte',
    },
    { 
      type: 'control_postparto' as const, 
      priority: 'rutina' as const, 
      animalCaravana: 'AR-2024-033', 
      message: 'Control completado - Sin novedades',
      date: '08/12/2024',
      lote: 'Lote Este',
    },
  ];

  const filterOptions = [
    { id: 'parto', label: 'Parto Próximo', value: 'parto' },
    { id: 'celo', label: 'Celo', value: 'celo' },
    { id: 'postparto', label: 'Post-parto', value: 'postparto' },
    { id: 'norte', label: 'Lote Norte', value: 'norte' },
    { id: 'sur', label: 'Lote Sur', value: 'sur' },
  ];

  const toggleFilter = (id: string) => {
    setActiveFilters(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleMarkResolved = (caravana: string) => {
    toast({
      title: 'Alerta resuelta',
      description: `La alerta de ${caravana} fue marcada como resuelta`,
    });
  };

  const countByType = {
    parto: alertasActivas.filter(a => a.type === 'parto_proximo').length,
    celo: alertasActivas.filter(a => a.type === 'repeticion_celo').length,
    postparto: alertasActivas.filter(a => a.type === 'control_postparto').length,
  };

  return (
    <div className="min-h-screen bg-background pb-20" data-testid="page-alertas">
      <TopHeader title="Alertas" showEstablecimiento={true} />
      
      <div className="p-4 space-y-4">
        <div className="grid grid-cols-3 gap-3">
          <div className="p-3 bg-pink-500/10 rounded-lg text-center">
            <Baby className="w-6 h-6 mx-auto text-pink-600 mb-1" />
            <p className="text-2xl font-bold">{countByType.parto}</p>
            <p className="text-xs text-muted-foreground">Partos</p>
          </div>
          <div className="p-3 bg-orange-500/10 rounded-lg text-center">
            <Calendar className="w-6 h-6 mx-auto text-orange-600 mb-1" />
            <p className="text-2xl font-bold">{countByType.celo}</p>
            <p className="text-xs text-muted-foreground">Celo</p>
          </div>
          <div className="p-3 bg-blue-500/10 rounded-lg text-center">
            <Clock className="w-6 h-6 mx-auto text-blue-600 mb-1" />
            <p className="text-2xl font-bold">{countByType.postparto}</p>
            <p className="text-xs text-muted-foreground">Post-parto</p>
          </div>
        </div>

        <FilterChips
          filters={filterOptions}
          activeFilters={activeFilters}
          onToggle={toggleFilter}
          onClearAll={() => setActiveFilters([])}
        />
      </div>

      <ScrollArea className="h-[calc(100vh-18rem)]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="activas" className="gap-2" data-testid="tab-activas">
              Activas
              <Badge variant="destructive" className="ml-1">
                {alertasActivas.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="resueltas" className="gap-2" data-testid="tab-resueltas">
              Resueltas
              <Badge variant="secondary" className="ml-1">
                {alertasResueltas.length}
              </Badge>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="activas" className="mt-4 space-y-3">
            {alertasActivas.length === 0 ? (
              <EmptyState
                icon={<Bell className="w-24 h-24" />}
                title="Sin alertas activas"
                description="No hay alertas pendientes en este momento"
              />
            ) : (
              alertasActivas.map((alerta, index) => (
                <div key={`${alerta.animalCaravana}-${index}`} className="relative">
                  <AlertCard {...alerta} />
                  <Button
                    size="sm"
                    variant="ghost"
                    className="absolute top-2 right-12 text-muted-foreground"
                    onClick={() => handleMarkResolved(alerta.animalCaravana)}
                    data-testid={`button-resolve-${alerta.animalCaravana}`}
                  >
                    <Check className="w-4 h-4" />
                  </Button>
                </div>
              ))
            )}
          </TabsContent>

          <TabsContent value="resueltas" className="mt-4 space-y-3">
            {alertasResueltas.length === 0 ? (
              <EmptyState
                icon={<Check className="w-24 h-24" />}
                title="Sin historial"
                description="Las alertas resueltas aparecerán aquí"
              />
            ) : (
              alertasResueltas.map((alerta, index) => (
                <div key={`${alerta.animalCaravana}-${index}`} className="opacity-60">
                  <AlertCard {...alerta} />
                </div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </ScrollArea>

      <BottomNav />
    </div>
  );
}
