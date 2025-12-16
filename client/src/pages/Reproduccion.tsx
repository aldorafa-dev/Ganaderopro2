import { useState } from 'react';
import { Plus, Heart, Syringe, Baby, TrendingUp, Award } from 'lucide-react';
import TopHeader from '@/components/TopHeader';
import BottomNav from '@/components/BottomNav';
import StatCard from '@/components/StatCard';
import FilterChips from '@/components/FilterChips';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export default function Reproduccion() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('resumen');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);

  // todo: remove mock functionality
  const stats = {
    vacasServidas: 86,
    vacasParidas: 67,
    preñezIATF: 72,
    preñezNatural: 65,
    diasPromGestacion: 281,
    totalPartos: 67,
  };

  const torosRanking = [
    { caravana: 'AR-2020-005', nombre: 'Toro Angus Elite', totalCrias: 45, iatf: 28, natural: 17, eficiencia: 92 },
    { caravana: 'AR-2019-012', nombre: 'Hereford Premium', totalCrias: 38, iatf: 22, natural: 16, eficiencia: 88 },
    { caravana: 'AR-2021-008', nombre: 'Braford Joven', totalCrias: 25, iatf: 15, natural: 10, eficiencia: 85 },
  ];

  const semenRanking = [
    { codigo: 'SEM-ANG-001', nombre: 'Angus Premium Plus', dosis: 50, exitosos: 42, eficiencia: 84 },
    { codigo: 'SEM-HER-003', nombre: 'Hereford Elite', dosis: 35, exitosos: 28, eficiencia: 80 },
    { codigo: 'SEM-BRA-002', nombre: 'Braford Select', dosis: 20, exitosos: 15, eficiencia: 75 },
  ];

  const proximosPartos = [
    { caravana: 'AR-2024-015', diasGestacion: 278, fechaEstimada: '20/12/2024', origen: 'IATF' },
    { caravana: 'AR-2024-023', diasGestacion: 275, fechaEstimada: '23/12/2024', origen: 'Natural' },
    { caravana: 'AR-2024-008', diasGestacion: 272, fechaEstimada: '26/12/2024', origen: 'IATF' },
  ];

  const filterOptions = [
    { id: 'iatf', label: 'IATF', value: 'iatf' },
    { id: 'natural', label: 'Servicio Natural', value: 'natural' },
    { id: 'prenadas', label: 'Preñadas', value: 'prenadas' },
    { id: 'paridas', label: 'Paridas', value: 'paridas' },
  ];

  const toggleFilter = (id: string) => {
    setActiveFilters(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  const handleNuevoEvento = (tipo: string) => {
    toast({
      title: `Nuevo ${tipo}`,
      description: 'Formulario de registro iniciado',
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20" data-testid="page-reproduccion">
      <TopHeader title="Reproducción" showEstablecimiento={true} />
      
      <div className="p-4">
        <div className="flex gap-2 mb-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button className="flex-1" data-testid="button-nuevo-servicio">
                <Syringe className="w-4 h-4 mr-2" />
                Nuevo IATF
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registrar IATF</DialogTitle>
                <DialogDescription>
                  Registra un nuevo evento de inseminación artificial
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-muted-foreground text-center">Formulario de IATF</p>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline" className="flex-1" data-testid="button-nuevo-natural">
                <Heart className="w-4 h-4 mr-2" />
                Servicio Natural
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registrar Servicio Natural</DialogTitle>
                <DialogDescription>
                  Registra un nuevo servicio natural con toro
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-muted-foreground text-center">Formulario de Servicio Natural</p>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Button variant="secondary" className="flex-1" data-testid="button-nuevo-parto">
                <Baby className="w-4 h-4 mr-2" />
                Parto
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Registrar Parto</DialogTitle>
                <DialogDescription>
                  Registra un nuevo nacimiento y datos de la cría
                </DialogDescription>
              </DialogHeader>
              <div className="py-4">
                <p className="text-muted-foreground text-center">Formulario de Parto</p>
              </div>
            </DialogContent>
          </Dialog>
        </div>

        <FilterChips
          filters={filterOptions}
          activeFilters={activeFilters}
          onToggle={toggleFilter}
          onClearAll={() => setActiveFilters([])}
        />
      </div>

      <ScrollArea className="h-[calc(100vh-14rem)]">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="px-4">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="resumen" data-testid="tab-resumen">Resumen</TabsTrigger>
            <TabsTrigger value="ranking" data-testid="tab-ranking">Ranking</TabsTrigger>
            <TabsTrigger value="proximos" data-testid="tab-proximos">Próximos</TabsTrigger>
          </TabsList>

          <TabsContent value="resumen" className="mt-4 space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <StatCard
                label="Vacas Servidas"
                value={stats.vacasServidas}
                icon={<Heart className="w-6 h-6" />}
              />
              <StatCard
                label="Vacas Paridas"
                value={stats.vacasParidas}
                icon={<Baby className="w-6 h-6" />}
              />
            </div>

            <Card className="p-4">
              <h3 className="font-semibold mb-4">Eficiencia Reproductiva</h3>
              
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Preñez IATF</span>
                    <span className="text-sm font-bold text-primary">{stats.preñezIATF}%</span>
                  </div>
                  <Progress value={stats.preñezIATF} className="h-3" />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Preñez Servicio Natural</span>
                    <span className="text-sm font-bold text-pink-600">{stats.preñezNatural}%</span>
                  </div>
                  <Progress value={stats.preñezNatural} className="h-3" />
                </div>
              </div>

              <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold">{stats.diasPromGestacion}</p>
                  <p className="text-sm text-muted-foreground">Días Prom. Gestación</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold">{stats.totalPartos}</p>
                  <p className="text-sm text-muted-foreground">Partos Este Año</p>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-3">Comparativa IATF vs Natural</h3>
              <div className="flex items-center gap-4">
                <div className="flex-1 text-center p-4 bg-primary/10 rounded-lg">
                  <Syringe className="w-8 h-8 mx-auto text-primary mb-2" />
                  <p className="text-2xl font-bold">{stats.preñezIATF}%</p>
                  <p className="text-sm text-muted-foreground">IATF</p>
                </div>
                <div className="text-2xl font-bold text-muted-foreground">vs</div>
                <div className="flex-1 text-center p-4 bg-pink-500/10 rounded-lg">
                  <Heart className="w-8 h-8 mx-auto text-pink-600 mb-2" />
                  <p className="text-2xl font-bold">{stats.preñezNatural}%</p>
                  <p className="text-sm text-muted-foreground">Natural</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="ranking" className="mt-4 space-y-4">
            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Ranking de Toros</h3>
              </div>
              <div className="space-y-3">
                {torosRanking.map((toro, index) => (
                  <div 
                    key={toro.caravana}
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-700'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">{toro.caravana}</p>
                      <p className="text-sm text-muted-foreground truncate">{toro.nombre}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{toro.totalCrias}</p>
                      <p className="text-xs text-muted-foreground">crías</p>
                    </div>
                    <Badge variant="outline">{toro.eficiencia}%</Badge>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-4">
              <div className="flex items-center gap-2 mb-4">
                <Syringe className="w-5 h-5 text-primary" />
                <h3 className="font-semibold">Ranking de Semen</h3>
              </div>
              <div className="space-y-3">
                {semenRanking.map((semen, index) => (
                  <div 
                    key={semen.codigo}
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg"
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                      index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-400' : 'bg-amber-700'
                    }`}>
                      {index + 1}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold">{semen.codigo}</p>
                      <p className="text-sm text-muted-foreground truncate">{semen.nombre}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{semen.exitosos}/{semen.dosis}</p>
                      <p className="text-xs text-muted-foreground">éxitos</p>
                    </div>
                    <Badge variant="outline">{semen.eficiencia}%</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="proximos" className="mt-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-4">Partos Próximos</h3>
              <div className="space-y-3">
                {proximosPartos.map((parto) => (
                  <div 
                    key={parto.caravana}
                    className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover-elevate cursor-pointer"
                  >
                    <div className="p-2 bg-pink-500/10 rounded-lg text-pink-600">
                      <Baby className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold">{parto.caravana}</p>
                      <p className="text-sm text-muted-foreground">
                        {parto.diasGestacion} días • {parto.fechaEstimada}
                      </p>
                    </div>
                    <Badge variant={parto.origen === 'IATF' ? 'default' : 'secondary'}>
                      {parto.origen}
                    </Badge>
                  </div>
                ))}
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </ScrollArea>

      <BottomNav />
    </div>
  );
}
