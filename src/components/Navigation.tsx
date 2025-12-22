import { useState } from "react";
import { Button } from "@/components/ui/button";
import { NosotrosModal } from "./NosotrosModal";
import { CapacityScorecardModal, LeakageCalculatorModal } from "./diagnostics";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Navigation = () => {
  const [nosotrosOpen, setNosotrosOpen] = useState(false);
  const [capacityOpen, setCapacityOpen] = useState(false);
  const [leakageOpen, setLeakageOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo + Login */}
            <div className="flex items-center gap-4">
              <span className="text-2xl font-bold text-brand-coral tracking-tight">
                DOCSIER
              </span>
              <Button
                size="sm"
                className="bg-brand-coral hover:bg-brand-coral-hover text-white"
              >
                Iniciar Sesión
              </Button>
            </div>

            {/* Navigation Tabs */}
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="gap-1 bg-brand-sage/15 text-brand-sage hover:bg-brand-sage/25 hover:text-brand-sage border border-brand-sage/30"
                  >
                    Auto-Diagnóstico
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-bg-elevated border-border z-50">
                  <DropdownMenuItem 
                    onClick={() => setCapacityOpen(true)}
                    className="cursor-pointer"
                  >
                    Índice de Capacidad Operacional
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => setLeakageOpen(true)}
                    className="cursor-pointer"
                  >
                    Calculadora de Pérdidas
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                size="sm"
                className="bg-brand-blue-gray/15 text-brand-blue-gray hover:bg-brand-blue-gray/25 hover:text-brand-blue-gray border border-brand-blue-gray/30"
                onClick={() => setNosotrosOpen(true)}
              >
                Nosotros
              </Button>
            </div>
          </div>
        </div>
      </nav>

      <NosotrosModal open={nosotrosOpen} onOpenChange={setNosotrosOpen} />
      <CapacityScorecardModal open={capacityOpen} onOpenChange={setCapacityOpen} />
      <LeakageCalculatorModal open={leakageOpen} onOpenChange={setLeakageOpen} />
    </>
  );
};
