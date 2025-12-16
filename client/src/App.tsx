import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/Home";
import Animales from "@/pages/Animales";
import AnimalNuevo from "@/pages/AnimalNuevo";
import AnimalDetalle from "@/pages/AnimalDetalle";
import Reproduccion from "@/pages/Reproduccion";
import Mapa from "@/pages/Mapa";
import Alertas from "@/pages/Alertas";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/animales" component={Animales} />
      <Route path="/animales/nuevo" component={AnimalNuevo} />
      <Route path="/animales/:caravana" component={AnimalDetalle} />
      <Route path="/reproduccion" component={Reproduccion} />
      <Route path="/mapa" component={Mapa} />
      <Route path="/alertas" component={Alertas} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
