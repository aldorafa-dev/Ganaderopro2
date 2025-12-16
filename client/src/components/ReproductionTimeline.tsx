import { Heart, Baby, Syringe } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface TimelineEvent {
  id: string;
  type: 'iatf' | 'servicio_natural' | 'parto';
  date: string;
  description: string;
  result?: string;
}

interface ReproductionTimelineProps {
  events: TimelineEvent[];
  animalCaravana: string;
}

const eventConfig = {
  iatf: {
    icon: Syringe,
    label: 'IATF',
    color: 'bg-blue-500',
    borderColor: 'border-blue-500',
  },
  servicio_natural: {
    icon: Heart,
    label: 'Servicio Natural',
    color: 'bg-pink-500',
    borderColor: 'border-pink-500',
  },
  parto: {
    icon: Baby,
    label: 'Parto',
    color: 'bg-green-500',
    borderColor: 'border-green-500',
  },
};

export default function ReproductionTimeline({ events, animalCaravana }: ReproductionTimelineProps) {
  return (
    <Card className="p-4" data-testid={`timeline-${animalCaravana}`}>
      <h3 className="text-lg font-semibold mb-4">Historial Reproductivo</h3>
      
      {events.length === 0 ? (
        <p className="text-muted-foreground text-center py-8">
          Sin eventos registrados
        </p>
      ) : (
        <div className="relative">
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-border" />
          
          <div className="space-y-4">
            {events.map((event, index) => {
              const config = eventConfig[event.type];
              const Icon = config.icon;
              
              return (
                <div 
                  key={event.id} 
                  className="relative flex gap-4 pl-10"
                  data-testid={`timeline-event-${event.id}`}
                >
                  <div className={`absolute left-2 w-5 h-5 rounded-full flex items-center justify-center ${config.color} text-white`}>
                    <Icon className="w-3 h-3" />
                  </div>
                  
                  <div className={`flex-1 p-3 border-l-2 ${config.borderColor} bg-muted/30 rounded-r-md`}>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline">{config.label}</Badge>
                      <span className="text-sm text-muted-foreground">{event.date}</span>
                    </div>
                    <p className="mt-1 text-sm">{event.description}</p>
                    {event.result && (
                      <p className="mt-1 text-sm font-medium text-primary">{event.result}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </Card>
  );
}
