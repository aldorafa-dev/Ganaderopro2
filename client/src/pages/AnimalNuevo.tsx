import { useLocation } from 'wouter';
import TopHeader from '@/components/TopHeader';
import BottomNav from '@/components/BottomNav';
import AnimalForm from '@/components/AnimalForm';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

export default function AnimalNuevo() {
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const handleSubmit = (data: any) => {
    console.log('Animal data:', data);
    toast({
      title: 'Animal registrado',
      description: `Caravana ${data.caravana} agregada exitosamente`,
    });
    navigate('/animales');
  };

  return (
    <div className="min-h-screen bg-background pb-20" data-testid="page-animal-nuevo">
      <TopHeader title="Nuevo Animal" showEstablecimiento={false} />
      
      <ScrollArea className="h-[calc(100vh-7.5rem)]">
        <div className="p-4">
          <AnimalForm
            onSubmit={handleSubmit}
            onCancel={() => navigate('/animales')}
          />
        </div>
      </ScrollArea>

      <BottomNav />
    </div>
  );
}
