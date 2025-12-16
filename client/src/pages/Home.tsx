import { useState } from 'react';
import { Plus, Beef, Heart, Baby, AlertTriangle, ChevronRight } from 'lucide-react';
import { Link } from 'wouter';
import TopHeader from '@/components/TopHeader';
import BottomNav from '@/components/BottomNav';
import StatCard from '@/components/StatCard';
import AnimalCard from '@/components/AnimalCard';
import AlertCard from '@/components/AlertCard';
import BackupDialog from '@/components/BackupDialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

export default function Home() {
  const [backupOpen, setBackupOpen] = useState(false);

  // todo: remove mock functionality
  const stats = [
    { label: 'Total Animales', value: 248, icon: <Beef className="w-6 h-6" />, trend: 'up' as const, trendValue: '+12' },
    { label: 'Vacas Preñadas', value: 67, icon: <Heart className="w-6 h-6" />, trend: 'up' as const, trendValue: '78%' },
    { label: 'Partos del Mes', value: 8, icon: <Baby className="w-6 h-6" />, trend: 'neutral' as const, trendValue: 'Normal' },
    { label: 'Alertas', value: 5, icon: <AlertTriangle className="w-6 h-6" />, trend: 'down' as const, trendValue: '-2' },
  ];

  const recentAnimals = [
    { caravana: 'AR-2024-089', categoria: 'ternero' as const, sexo: 'macho' as const, colorRaza: 'Angus', lote: 'Norte' },
    { caravana: 'AR-2024-088', categoria: 'ternera' as const, sexo: 'hembra' as const, colorRaza: 'Hereford', lote: 'Sur' },
  ];

  const urgentAlerts = [
    { 
      type: 'parto_proximo' as const, 
      priority: 'urgente' as const, 
      animalCaravana: 'AR-2024-015', 
      message: 'Parto estimado en 5 días',
      date: '20/12/2024',
      daysRemaining: 5,
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-20" data-testid="page-home">
      <TopHeader onBackupClick={() => setBackupOpen(true)} />
      
      <ScrollArea className="h-[calc(100vh-7.5rem)]">
        <main className="p-4 space-y-6">
          <section>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((stat) => (
                <StatCard
                  key={stat.label}
                  label={stat.label}
                  value={stat.value}
                  icon={stat.icon}
                  trend={stat.trend}
                  trendValue={stat.trendValue}
                />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between gap-2 mb-3">
              <h2 className="text-lg font-semibold">Alertas Urgentes</h2>
              <Link href="/alertas">
                <Button variant="ghost" size="sm" className="gap-1" data-testid="link-all-alerts">
                  Ver todas <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {urgentAlerts.map((alert) => (
                <AlertCard key={alert.animalCaravana} {...alert} />
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center justify-between gap-2 mb-3">
              <h2 className="text-lg font-semibold">Últimos Registros</h2>
              <Link href="/animales">
                <Button variant="ghost" size="sm" className="gap-1" data-testid="link-all-animals">
                  Ver todos <ChevronRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>
            <div className="space-y-3">
              {recentAnimals.map((animal) => (
                <AnimalCard key={animal.caravana} {...animal} />
              ))}
            </div>
          </section>

          <section>
            <Card className="p-4 bg-primary/5 border-primary/20">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-primary/10 rounded-lg text-primary">
                  <Beef className="w-8 h-8" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">Registrar Nuevo Animal</h3>
                  <p className="text-sm text-muted-foreground">
                    Agregar animal individual o lote completo
                  </p>
                </div>
                <Link href="/animales/nuevo">
                  <Button data-testid="button-add-animal">
                    <Plus className="w-4 h-4 mr-2" />
                    Agregar
                  </Button>
                </Link>
              </div>
            </Card>
          </section>
        </main>
      </ScrollArea>

      <BottomNav />
      <BackupDialog open={backupOpen} onOpenChange={setBackupOpen} />
    </div>
  );
}
