import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

interface FilterOption {
  id: string;
  label: string;
  value: string;
}

interface FilterChipsProps {
  filters: FilterOption[];
  activeFilters: string[];
  onToggle: (filterId: string) => void;
  onClearAll?: () => void;
}

export default function FilterChips({
  filters,
  activeFilters,
  onToggle,
  onClearAll,
}: FilterChipsProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2" data-testid="filter-chips">
      {filters.map((filter) => {
        const isActive = activeFilters.includes(filter.id);
        return (
          <Badge
            key={filter.id}
            variant={isActive ? 'default' : 'outline'}
            className="cursor-pointer shrink-0 py-1.5 px-3"
            onClick={() => onToggle(filter.id)}
            data-testid={`filter-${filter.id}`}
          >
            {filter.label}
            {isActive && (
              <X className="w-3 h-3 ml-1" />
            )}
          </Badge>
        );
      })}
      
      {activeFilters.length > 0 && onClearAll && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          className="shrink-0 text-muted-foreground"
          data-testid="button-clear-filters"
        >
          Limpiar
        </Button>
      )}
    </div>
  );
}
