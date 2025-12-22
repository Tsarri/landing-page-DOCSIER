import { Lock, AlertTriangle, Shield, Users } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const securityData = [
  {
    icon: AlertTriangle,
    threat: "Empleados",
    problem: "Acceso no autorizado a tus casos",
    solution: "Row-Level Security + Audit Logging",
    color: "bg-amber-100 dark:bg-amber-900/30",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  {
    icon: Shield,
    threat: "Hackers",
    problem: "Robo de base de datos",
    solution: "Server-Side Encryption + Zero-Knowledge",
    color: "bg-red-100 dark:bg-red-900/30",
    iconColor: "text-red-600 dark:text-red-400",
  },
  {
    icon: Users,
    threat: "Competencia",
    problem: "IA genérica entrenada con todos los clientes",
    solution: "Modelos IA separados por firma. APIs no almacenan datos.",
    color: "bg-blue-100 dark:bg-blue-900/30",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
];

export const SecurityManifestoSection = () => {
  return (
    <section className="bg-bg-elevated section-padding relative overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[50%] right-[10%]">
          {[...Array(2)].map((_, i) => (
            <div
              key={`pulse-${i}`}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-brand-sage/6 animate-radar-pulse-slow"
              style={{
                animationDelay: `${i * 5}s`,
                width: '60px',
                height: '60px',
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-sage/10 border border-brand-sage/20 mx-auto">
              <Lock className="w-8 h-8 text-brand-sage" />
            </div>
            
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
              Tu seguridad es la prioridad.
            </h2>
            
            <p className="text-lg text-muted-foreground">
              La privacía es la infraestructura. No es una característica.
            </p>
          </div>

          {/* Security Table */}
          <div className="rounded-xl border border-border/50 overflow-hidden bg-card/50 backdrop-blur-sm">
            <Table>
              <TableHeader>
                <TableRow className="border-border/50 hover:bg-transparent">
                  <TableHead className="text-foreground font-semibold">Amenaza</TableHead>
                  <TableHead className="text-foreground font-semibold">Problema</TableHead>
                  <TableHead className="text-foreground font-semibold">Solución</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {securityData.map((row, index) => (
                  <TableRow 
                    key={index} 
                    className={`${row.color} border-border/30 hover:opacity-90 transition-opacity`}
                  >
                    <TableCell className="font-medium">
                      <div className="flex items-center gap-2">
                        <row.icon className={`w-4 h-4 ${row.iconColor}`} />
                        <span className="text-foreground">{row.threat}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-foreground/80">{row.problem}</TableCell>
                    <TableCell className="text-foreground/80">{row.solution}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Footer */}
          <p className="text-center text-muted-foreground">
            Cada capa es independiente. Si una falla, las otras siguen protegiéndote.
          </p>
        </div>
      </div>
    </section>
  );
};
