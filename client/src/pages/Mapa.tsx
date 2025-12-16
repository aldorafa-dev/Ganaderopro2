import { useState } from 'react';
import { Maximize2, Minimize2, Layers, Plus, Settings } from 'lucide-react';
import TopHeader from '@/components/TopHeader';
import BottomNav from '@/components/BottomNav';
import FieldMap from '@/components/FieldMap';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';

export default function Mapa() {
  const { toast } = useToast();
  const [isFullscreen, setIsFullscreen] = useState(false);

  // todo: remove mock functionality
  const lotesInfo = [
    { id: '1', nombre: 'Lote Norte', superficie: 150, animales: 45, rodeos: 2, color: '#22c55e' },
    { id: '2', nombre: 'Lote Sur', superficie: 120, animales: 32, rodeos: 1, color: '#3b82f6' },
    { id: '3', nombre: 'Lote Este', superficie: 80, animales: 28, rodeos: 1, color: '#f59e0b' },
  ];

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleAddLote = () => {
    toast({
      title: 'Nuevo Lote',
      description: 'Dibuja el polígono en el mapa para delimitar el lote',
    });
  };

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-background" data-testid="page-mapa-fullscreen">
        <div className="absolute top-4 right-4 z-[1000]">
          <Button 
            size="icon" 
            variant="secondary"
            onClick={handleFullscreen}
            data-testid="button-exit-fullscreen"
          >
            <Minimize2 className="w-5 h-5" />
          </Button>
        </div>
        <div className="h-full">
          <FieldMap onFullscreen={handleFullscreen} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20" data-testid="page-mapa">
      <TopHeader title="Mapa del Campo" showEstablecimiento={true} />
      
      <div className="p-4 space-y-4">
        <div className="flex gap-2">
          <Button className="flex-1" onClick={handleAddLote} data-testid="button-add-lote">
            <Plus className="w-4 h-4 mr-2" />
            Nuevo Lote
          </Button>
          <Button variant="outline" onClick={handleFullscreen} data-testid="button-fullscreen">
            <Maximize2 className="w-4 h-4 mr-2" />
            Pantalla Completa
          </Button>
        </div>

        <FieldMap onFullscreen={handleFullscreen} />

        <Card className="p-4">
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-primary" />
              <h3 className="font-semibold">Lotes del Establecimiento</h3>
            </div>
            <Dialog>
              <DialogTrigger asChild>
                <Button size="icon" variant="ghost" data-testid="button-settings-lotes">
                  <Settings className="w-4 h-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Configuración de Lotes</DialogTitle>
                  <DialogDescription>
                    Administra los lotes y sus propiedades
                  </DialogDescription>
                </DialogHeader>
                <div className="py-4">
                  <p className="text-muted-foreground text-center">Panel de configuración</p>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <ScrollArea className="max-h-60">
            <div className="space-y-3">
              {lotesInfo.map((lote) => (
                <div 
                  key={lote.id}
                  className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg hover-elevate cursor-pointer"
                  data-testid={`lote-info-${lote.id}`}
                >
                  <div 
                    className="w-4 h-4 rounded-full shrink-0"
                    style={{ backgroundColor: lote.color }}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold">{lote.nombre}</p>
                    <p className="text-sm text-muted-foreground">
                      {lote.superficie} ha • {lote.rodeos} rodeo{lote.rodeos > 1 ? 's' : ''}
                    </p>
                  </div>
                  <Badge variant="secondary">
                    {lote.animales} animales
                  </Badge>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        <Card className="p-4 bg-muted/30">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-primary/10 rounded-lg text-primary">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold">Superficie Total</h4>
              <p className="text-2xl font-bold mt-1">350 ha</p>
              <p className="text-sm text-muted-foreground">
                3 lotes • 105 animales • 4 rodeos
              </p>
            </div>
          </div>
        </Card>
      </div>

      <BottomNav />
    </div>
  );
}
