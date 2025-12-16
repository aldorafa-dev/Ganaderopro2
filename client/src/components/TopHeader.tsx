import { useState } from 'react';
import { Menu, Search, Download, ChevronDown, Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';

interface TopHeaderProps {
  title?: string;
  showEstablecimiento?: boolean;
  onMenuClick?: () => void;
  onBackupClick?: () => void;
}

export default function TopHeader({ 
  title = 'GanaderoPro', 
  showEstablecimiento = true,
  onMenuClick,
  onBackupClick 
}: TopHeaderProps) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [selectedEstablecimiento, setSelectedEstablecimiento] = useState('La Esperanza');

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark');
  };

  // todo: remove mock functionality
  const establecimientos = ['La Esperanza', 'San Martín', 'El Roble'];

  return (
    <header className="sticky top-0 z-40 bg-primary text-primary-foreground" data-testid="header-top">
      <div className="flex items-center justify-between gap-2 px-4 h-14">
        <div className="flex items-center gap-2 min-w-0 flex-1">
          {onMenuClick && (
            <Button 
              size="icon" 
              variant="ghost" 
              className="text-primary-foreground shrink-0"
              onClick={onMenuClick}
              data-testid="button-menu"
            >
              <Menu className="w-5 h-5" />
            </Button>
          )}
          
          {showEstablecimiento ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="text-primary-foreground gap-1 px-2 min-w-0"
                  data-testid="dropdown-establecimiento"
                >
                  <span className="truncate">{selectedEstablecimiento}</span>
                  <ChevronDown className="w-4 h-4 shrink-0" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start">
                {establecimientos.map((est) => (
                  <DropdownMenuItem 
                    key={est}
                    onClick={() => setSelectedEstablecimiento(est)}
                    data-testid={`item-establecimiento-${est.toLowerCase().replace(' ', '-')}`}
                  >
                    {est}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <h1 className="text-lg font-semibold truncate">{title}</h1>
          )}
        </div>

        <div className="flex items-center gap-1">
          {searchOpen ? (
            <Input
              type="search"
              placeholder="Buscar caravana..."
              className="w-40 h-9 bg-primary-foreground/20 border-0 text-primary-foreground placeholder:text-primary-foreground/60"
              autoFocus
              onBlur={() => setSearchOpen(false)}
              data-testid="input-search"
            />
          ) : (
            <Button 
              size="icon" 
              variant="ghost"
              className="text-primary-foreground"
              onClick={() => setSearchOpen(true)}
              data-testid="button-search"
            >
              <Search className="w-5 h-5" />
            </Button>
          )}
          
          <Button 
            size="icon" 
            variant="ghost"
            className="text-primary-foreground"
            onClick={toggleTheme}
            data-testid="button-theme"
          >
            {isDark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>

          <Button 
            size="icon" 
            variant="ghost"
            className="text-primary-foreground"
            onClick={onBackupClick}
            data-testid="button-backup"
          >
            <Download className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}
