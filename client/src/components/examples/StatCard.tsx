import StatCard from '../StatCard';
import { Beef, Heart, Baby, AlertTriangle } from 'lucide-react';

export default function StatCardExample() {
  return (
    <div className="grid grid-cols-2 gap-3 p-4">
      <StatCard
        label="Total Animales"
        value={248}
        icon={<Beef className="w-6 h-6" />}
        trend="up"
        trendValue="+12 este mes"
      />
      <StatCard
        label="Vacas Preñadas"
        value={67}
        icon={<Heart className="w-6 h-6" />}
        trend="up"
        trendValue="78% preñez"
      />
      <StatCard
        label="Partos del Mes"
        value={8}
        icon={<Baby className="w-6 h-6" />}
        trend="neutral"
        trendValue="Normal"
      />
      <StatCard
        label="Alertas Activas"
        value={5}
        icon={<AlertTriangle className="w-6 h-6" />}
        trend="down"
        trendValue="-2 resueltas"
      />
    </div>
  );
}
