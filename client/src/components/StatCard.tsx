import { Card } from '@/components/ui/card';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
  onClick?: () => void;
}

export default function StatCard({
  label,
  value,
  icon,
  trend,
  trendValue,
  onClick,
}: StatCardProps) {
  return (
    <Card 
      className={`p-4 ${onClick ? 'hover-elevate active-elevate-2 cursor-pointer' : ''}`}
      onClick={onClick}
      data-testid={`stat-${label.toLowerCase().replace(/\s/g, '-')}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-muted-foreground truncate">
            {label}
          </p>
          <p className="text-3xl font-bold mt-1" data-testid={`value-${label.toLowerCase().replace(/\s/g, '-')}`}>
            {value}
          </p>
          {trend && trendValue && (
            <div className={`flex items-center gap-1 mt-2 text-sm ${
              trend === 'up' ? 'text-green-600' : 
              trend === 'down' ? 'text-red-600' : 
              'text-muted-foreground'
            }`}>
              {trend === 'up' && <TrendingUp className="w-4 h-4" />}
              {trend === 'down' && <TrendingDown className="w-4 h-4" />}
              {trend === 'neutral' && <Minus className="w-4 h-4" />}
              <span>{trendValue}</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-2 bg-primary/10 rounded-lg text-primary shrink-0">
            {icon}
          </div>
        )}
      </div>
    </Card>
  );
}
