import EmptyState from '../EmptyState';
import { Beef } from 'lucide-react';

export default function EmptyStateExample() {
  return (
    <EmptyState
      icon={<Beef className="w-24 h-24" />}
      title="Sin animales registrados"
      description="Comienza agregando tu primer animal para gestionar tu establecimiento"
      actionLabel="Agregar Animal"
      onAction={() => console.log('Add animal clicked')}
    />
  );
}
