import { useState } from 'react';
import FilterChips from '../FilterChips';

export default function FilterChipsExample() {
  const [activeFilters, setActiveFilters] = useState<string[]>(['vacas']);

  const filters = [
    { id: 'vacas', label: 'Vacas', value: 'vacas' },
    { id: 'toros', label: 'Toros', value: 'toros' },
    { id: 'terneros', label: 'Terneros', value: 'terneros' },
    { id: 'prenadas', label: 'Preñadas', value: 'prenadas' },
    { id: 'alertas', label: 'Con Alertas', value: 'alertas' },
  ];

  const toggleFilter = (id: string) => {
    setActiveFilters(prev => 
      prev.includes(id) ? prev.filter(f => f !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-4">
      <FilterChips
        filters={filters}
        activeFilters={activeFilters}
        onToggle={toggleFilter}
        onClearAll={() => setActiveFilters([])}
      />
    </div>
  );
}
