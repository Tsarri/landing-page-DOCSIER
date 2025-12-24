import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface NosotrosModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NosotrosModal = ({ open, onOpenChange }: NosotrosModalProps) => {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-[520px] bg-bg-elevated border-brand-purple p-8 sm:p-10 overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-foreground">
            Nosotros
          </SheetTitle>
        </SheetHeader>

        <div className="space-y-8 mt-6">
          {/* El Problema Real */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-brand-coral">El Problema Real</h3>
            <p className="text-muted-foreground leading-relaxed">
              El mayor costo para abogados es el tiempo perdido en trabajo administrativo.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Incapacidad de priorizar trabajo. Una fecha límite se olvida. Un documento se archiva mal. Meses después: perdidas operacionales en la firma.
            </p>
            <p className="text-foreground font-medium">
              No falta mano de obra, falta infraestructura inteligente.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Hemos visto abogados brillantes perder su negocio. Hemos visto familias enteras construidas en firmas legales colapsar por peso muerto administrativo.
            </p>
            <p className="text-muted-foreground leading-relaxed italic">
              Nosotros venimos de familias con ese mismo problema.
            </p>
          </section>

          <Separator className="bg-muted/20" />

          {/* Qué Hacemos */}
          <section className="space-y-4">
            <h3 className="text-lg font-semibold text-brand-coral">Qué Hacemos</h3>
            <p className="text-muted-foreground leading-relaxed">
              DOCSIER es la infraestructura inteligente que reduce errores y recupera tiempo perdido. Tu equipo administrativo y estratégico.
            </p>
            <ul className="space-y-2 text-foreground">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-coral rounded-full"></span>
                30-50 horas mensuales recuperadas
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-coral rounded-full"></span>
                Tu IA aprende solo de TUS casos
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-brand-coral rounded-full"></span>
                Tu información nunca sale de tu control
              </li>
            </ul>
            <p className="text-foreground font-medium">
              La tecnología es tu clave para desbloquear tu capacidad operativa.
            </p>
          </section>

          <Separator className="bg-muted/20" />

          {/* Nosotros - Team */}
          <section className="space-y-6">
            <h3 className="text-lg font-semibold text-brand-coral">Nosotros</h3>
            
            <div className="space-y-4">
              <div>
                <h4 className="text-foreground font-semibold">Teo Irisarri</h4>
                <p className="text-brand-sage text-sm font-medium">CTO</p>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  Pasó años como paralegal en servicios fiduciarios. Vio de primera mano cómo los abogados pierden tiempo procesando documentos que una máquina podría manejar en segundos. Luego aprendió a desarrollar software.
                </p>
              </div>
              
              <div>
                <h4 className="text-foreground font-semibold">Julio Luque</h4>
                <p className="text-brand-sage text-sm font-medium">CEO</p>
                <p className="text-muted-foreground leading-relaxed mt-2">
                  Especialista en seguridad de la información. Ha pasado años protegiendo datos sensibles, construyendo sistemas que los gobiernos y los bancos confían. Sabe que para los abogados, la privacidad no es una característica opcional.
                </p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed italic">
              Ambos venimos de familias que construyen firmas. Sabemos lo que significa luchar contra el caos administrativo cada día.
            </p>
          </section>

          <Separator className="bg-muted/20" />

          {/* Nuestra Misión */}
          <section className="space-y-3">
            <h3 className="text-lg font-semibold text-brand-coral">Nuestra Misión</h3>
            <p className="text-foreground font-medium text-lg">
              Que abogados sean mejores operadores y empresarios.
            </p>
          </section>
        </div>
      </SheetContent>
    </Sheet>
  );
};
