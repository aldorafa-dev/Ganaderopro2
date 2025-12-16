import { useState } from 'react';
import { useParams, useLocation } from 'wouter';
import { ArrowLeft, Edit, Trash2, ArrowRightLeft, Heart, Baby, Syringe, FileText } from 'lucide-react';
import TopHeader from '@/components/TopHeader';
import BottomNav from '@/components/BottomNav';
import ReproductionTimeline from '@/components/ReproductionTimeline';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { useToast } from '@/hooks/use-toast';

export default function AnimalDetalle() {
  const params = useParams<{ caravana: string }>();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('info');

  // todo: remove mock functionality
  const animal = {
    caravana: params.caravana || 'AR-2024-001',
    categoria: 'vaca',
    sexo: 'hembra',
    colorRaza: 'Angus Negro',
    fechaNacimiento: '15/03/2020',
    fechaAlta: '20/03/2020',
    lote: 'Lote Norte',
    rodeo: 'Rodeo Principal',
    madre: 'AR-2018-045',
    padre: 'AR-2017-012',
    isPregnant: true,
    diasGestacion: 278,
    observaciones: 'Vaca de excelente producción. Segunda cría por IATF.',
  };

  const reproEvents = [
    { id: '1', type: 'iatf' as const, date: '15/03/2024', description: 'IATF con semen Angus Premium', result: 'Confirmada preñez' },
    { id: '2', type: 'parto' as const, date: '22/12/2023', description: 'Parto normal - Cría hembra', result: 'Cría: AR-2023-089' },
    { id: '3', type: 'servicio_natural' as const, date: '01/03/2023', description: 'Servicio con toro AR-2020-005' },
    { id: '4', type: 'parto' as const, date: '10/12/2022', description: 'Parto normal - Cría macho', result: 'Cría: AR-2022-156' },
  ];

  const hijos = [
    { caravana: 'AR-2023-089', sexo: 'Hembra', categoria: 'Ternera', fecha: '22/12/2023', origen: 'IATF' },
    { caravana: 'AR-2022-156', sexo: 'Macho', categoria: 'Novillo', fecha: '10/12/2022', origen: 'Natural' },
  ];

  const tratamientos = [
    { fecha: '10/11/2024', tipo: 'Vacunación', observaciones: 'Aftosa anual' },
    { fecha: '15/09/2024', tipo: 'Desparasitación', observaciones: 'Ivermectina' },
    { fecha: '20/03/2024', tipo: 'Tacto', observaciones: 'Confirmación preñez - 45 días' },
  ];

  const handleDelete = () => {
    toast({
      title: 'Animal eliminado',
      description: 'El registro ha sido eliminado correctamente',
      variant: 'destructive',
    });
    navigate('/animales');
  };

  const handleMove = () => {
    toast({
      title: 'Mover animal',
      description: 'Función de movimiento entre lotes',
    });
  };

  return (
    <div className="min-h-screen bg-background pb-20" data-testid="page-animal-detalle">
      <header className="sticky top-0 z-40 bg-primary text-primary-foreground">
        <div className="flex items-center justify-between gap-2 px-4 h-14">
          <div className="flex items-center gap-2">
            <Button 
              size="icon" 
              variant="ghost" 
              className="text-primary-foreground"
              onClick={() => navigate('/animales')}
              data-testid="button-back"
            >
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-lg font-semibold">{animal.caravana}</h1>
          </div>
          <div className="flex items-center gap-1">
            <Button 
              size="icon" 
              variant="ghost"
              className="text-primary-foreground"
              onClick={() => navigate(`/animales/${animal.caravana}/editar`)}
              data-testid="button-edit"
            >
              <Edit className="w-5 h-5" />
            </Button>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  size="icon" 
                  variant="ghost"
                  className="text-primary-foreground"
                  data-testid="button-delete"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Eliminar animal</AlertDialogTitle>
                  <AlertDialogDescription>
                    Esta acción eliminará permanentemente el registro de {animal.caravana}. Esta acción no se puede deshacer.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">
                    Eliminar
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </header>

      <ScrollArea className="h-[calc(100vh-7.5rem)]">
        <div className="p-4 space-y-4">
          <Card className="p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge variant="secondary">{animal.categoria}</Badge>
                  <Badge variant="outline">{animal.sexo}</Badge>
                  {animal.isPregnant && (
                    <Badge className="bg-pink-500 text-white">
                      <Heart className="w-3 h-3 mr-1" />
                      Preñada
                    </Badge>
                  )}
                </div>
                <p className="mt-2 text-lg font-medium">{animal.colorRaza}</p>
                <p className="text-sm text-muted-foreground">
                  Nacimiento: {animal.fechaNacimiento}
                </p>
              </div>
              <Button variant="outline" onClick={handleMove} data-testid="button-move">
                <ArrowRightLeft className="w-4 h-4 mr-2" />
                Mover
              </Button>
            </div>

            <div className="mt-4 pt-4 border-t grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Lote</p>
                <p className="font-medium">{animal.lote}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Rodeo</p>
                <p className="font-medium">{animal.rodeo}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Madre</p>
                <p className="font-medium text-primary">{animal.madre}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Padre</p>
                <p className="font-medium text-primary">{animal.padre}</p>
              </div>
            </div>

            {animal.isPregnant && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Días de Gestación</p>
                    <p className="text-2xl font-bold text-pink-600">{animal.diasGestacion}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">Parto Estimado</p>
                    <p className="font-semibold">20/12/2024</p>
                  </div>
                </div>
              </div>
            )}
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="info" data-testid="tab-info">
                <FileText className="w-4 h-4 mr-2" />
                Info
              </TabsTrigger>
              <TabsTrigger value="reproduccion" data-testid="tab-reproduccion">
                <Heart className="w-4 h-4 mr-2" />
                Repro
              </TabsTrigger>
              <TabsTrigger value="hijos" data-testid="tab-hijos">
                <Baby className="w-4 h-4 mr-2" />
                Hijos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="info" className="mt-4 space-y-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Observaciones</h3>
                <p className="text-sm text-muted-foreground">{animal.observaciones}</p>
              </Card>

              <Card className="p-4">
                <h3 className="font-semibold mb-3">Tratamientos</h3>
                <div className="space-y-3">
                  {tratamientos.map((t, i) => (
                    <div key={i} className="flex items-start gap-3 pb-3 border-b last:border-0 last:pb-0">
                      <div className="p-2 bg-blue-500/10 rounded-lg text-blue-600">
                        <Syringe className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between gap-2">
                          <p className="font-medium">{t.tipo}</p>
                          <span className="text-sm text-muted-foreground">{t.fecha}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{t.observaciones}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="reproduccion" className="mt-4">
              <ReproductionTimeline events={reproEvents} animalCaravana={animal.caravana} />
            </TabsContent>

            <TabsContent value="hijos" className="mt-4">
              <Card className="p-4">
                <h3 className="font-semibold mb-3">Crías ({hijos.length})</h3>
                <div className="space-y-3">
                  {hijos.map((hijo) => (
                    <div 
                      key={hijo.caravana} 
                      className="flex items-center justify-between gap-3 p-3 bg-muted/30 rounded-lg hover-elevate cursor-pointer"
                      onClick={() => navigate(`/animales/${hijo.caravana}`)}
                    >
                      <div>
                        <p className="font-semibold">{hijo.caravana}</p>
                        <p className="text-sm text-muted-foreground">
                          {hijo.sexo} • {hijo.categoria} • {hijo.fecha}
                        </p>
                      </div>
                      <Badge variant={hijo.origen === 'IATF' ? 'default' : 'secondary'}>
                        {hijo.origen}
                      </Badge>
                    </div>
                  ))}
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
}
