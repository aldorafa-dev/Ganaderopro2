import { Home, Beef, Heart, Map, Bell } from 'lucide-react';
import { useLocation, Link } from 'wouter';

interface NavItem {
  path: string;
  label: string;
  icon: typeof Home;
}

const navItems: NavItem[] = [
  { path: '/', label: 'Inicio', icon: Home },
  { path: '/animales', label: 'Animales', icon: Beef },
  { path: '/reproduccion', label: 'Reproducción', icon: Heart },
  { path: '/mapa', label: 'Mapa', icon: Map },
  { path: '/alertas', label: 'Alertas', icon: Bell },
];

export default function BottomNav() {
  const [location] = useLocation();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-card-border" data-testid="nav-bottom">
      <div className="flex items-center justify-around h-16">
        {navItems.map((item) => {
          const isActive = location === item.path || 
            (item.path !== '/' && location.startsWith(item.path));
          const Icon = item.icon;
          
          return (
            <Link key={item.path} href={item.path}>
              <button
                className={`flex flex-col items-center justify-center w-16 h-14 rounded-lg transition-colors ${
                  isActive 
                    ? 'text-primary bg-primary/10' 
                    : 'text-muted-foreground'
                }`}
                data-testid={`nav-${item.label.toLowerCase()}`}
              >
                <Icon className="w-6 h-6" />
                <span className="text-xs mt-1 font-medium">{item.label}</span>
              </button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
