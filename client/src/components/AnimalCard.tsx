import { ChevronRight, Heart, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import type { CategoriaAnimal, SexoAnimal } from '@/lib/db';

interface AnimalCardProps {
  caravana: string;
  categoria: CategoriaAnimal;
  sexo: SexoAnimal;
  colorRaza?: string;
  lote?: string;
  rodeo?: string;
  isPregnant?: boolean;
  hasAlert?: boolean;
  alertMessage?: string;
  onClick?: () => void;
}

const categoriaLabels: Record<CategoriaAnimal, string> = {
  ternero: 'Ternero',
  ternera: 'Ternera',
  novillo: 'Novillo',
  vaquillona: 'Vaquillona',
  vaca: 'Vaca',
  toro: 'Toro',
};

export default function AnimalCard({
  caravana,
  categoria,
  sexo,
  colorRaza,
  lote,
  rodeo,
  isPregnant,
  hasAlert,
  alertMessage,
  onClick,
}: AnimalCardProps) {
  return (
    <Card 
      className="p-4 hover-elevate active-elevate-2 cursor-pointer"
      onClick={onClick}
      data-testid={`card-animal-${caravana}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xl font-bold" data-testid={`text-caravana-${caravana}`}>
              {caravana}
            </span>
            {isPregnant && (
              <Badge variant="default" className="bg-pink-500 text-white">
                <Heart className="w-3 h-3 mr-1" />
                Preñada
              </Badge>
            )}
            {hasAlert && (
              <Badge variant="destructive">
                <AlertTriangle className="w-3 h-3 mr-1" />
                Alerta
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            <Badge variant="secondary">
              {categoriaLabels[categoria]}
            </Badge>
            <Badge variant="outline">
              {sexo === 'macho' ? 'Macho' : 'Hembra'}
            </Badge>
            {colorRaza && (
              <span className="text-sm text-muted-foreground">{colorRaza}</span>
            )}
          </div>
          
          {(lote || rodeo) && (
            <p className="text-sm text-muted-foreground mt-2">
              {lote && <span>Lote: {lote}</span>}
              {lote && rodeo && <span className="mx-1">•</span>}
              {rodeo && <span>Rodeo: {rodeo}</span>}
            </p>
          )}

          {hasAlert && alertMessage && (
            <p className="text-sm text-destructive mt-2">{alertMessage}</p>
          )}
        </div>
        
        <Button size="icon" variant="ghost">
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </Button>
      </div>
    </Card>
  );
}
