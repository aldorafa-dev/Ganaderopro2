import { AlertTriangle, Baby, Calendar, Clock, ChevronRight } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

type AlertType = 'parto_proximo' | 'repeticion_celo' | 'control_postparto';
type AlertPriority = 'urgente' | 'proximo' | 'rutina';

interface AlertCardProps {
  type: AlertType;
  priority: AlertPriority;
  animalCaravana: string;
  message: string;
  date: string;
  daysRemaining?: number;
  lote?: string;
  onClick?: () => void;
}

const alertConfig = {
  parto_proximo: {
    icon: Baby,
    label: 'Parto Próximo',
    color: 'bg-pink-500',
  },
  repeticion_celo: {
    icon: Calendar,
    label: 'Repetición Celo',
    color: 'bg-orange-500',
  },
  control_postparto: {
    icon: Clock,
    label: 'Control Post-parto',
    color: 'bg-blue-500',
  },
};

const priorityConfig = {
  urgente: { variant: 'destructive' as const, label: 'Urgente' },
  proximo: { variant: 'default' as const, label: 'Próximo' },
  rutina: { variant: 'secondary' as const, label: 'Rutina' },
};

export default function AlertCard({
  type,
  priority,
  animalCaravana,
  message,
  date,
  daysRemaining,
  lote,
  onClick,
}: AlertCardProps) {
  const config = alertConfig[type];
  const priorityCfg = priorityConfig[priority];
  const Icon = config.icon;

  return (
    <Card 
      className="p-4 hover-elevate active-elevate-2 cursor-pointer"
      onClick={onClick}
      data-testid={`alert-${animalCaravana}`}
    >
      <div className="flex items-start gap-3">
        <div className={`p-2 rounded-lg text-white shrink-0 ${config.color}`}>
          <Icon className="w-5 h-5" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="font-bold text-lg">{animalCaravana}</span>
            <Badge variant={priorityCfg.variant}>
              {priorityCfg.label}
            </Badge>
          </div>
          
          <p className="text-sm font-medium mt-1">{config.label}</p>
          <p className="text-sm text-muted-foreground mt-1">{message}</p>
          
          <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground flex-wrap">
            <span>{date}</span>
            {daysRemaining !== undefined && (
              <Badge variant="outline">
                {daysRemaining > 0 ? `${daysRemaining} días` : 'Hoy'}
              </Badge>
            )}
            {lote && <span>Lote: {lote}</span>}
          </div>
        </div>
        
        <Button size="icon" variant="ghost" className="shrink-0">
          <ChevronRight className="w-5 h-5 text-muted-foreground" />
        </Button>
      </div>
    </Card>
  );
}
