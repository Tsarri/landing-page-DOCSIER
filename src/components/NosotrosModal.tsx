import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Mail, Phone, MapPin } from "lucide-react";

interface NosotrosModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const NosotrosModal = ({ open, onOpenChange }: NosotrosModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] bg-bg-elevated border-brand-purple p-8 sm:p-12">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-foreground">
            Quiénes Somos
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <p className="text-muted-foreground leading-relaxed">
            DOCSIER fue creado por abogados panameños que perdieron casos por plazos olvidados. 
            Construimos la herramienta que hubiéramos querido tener.
          </p>

          <p className="text-foreground font-medium">
            Nuestra misión: Que ningún abogado pierda un caso por caos administrativo.
          </p>

          <Separator className="bg-muted/20" />

          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">
              Contáctanos
            </h4>

            <div className="space-y-3">
              <a
                href="mailto:hola@docsier.com"
                className="flex items-center gap-3 text-muted-foreground hover:text-brand-coral transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>hola@docsier.com</span>
              </a>

              <a
                href="https://wa.me/50761234567"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-brand-coral transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>+507 6123-4567</span>
              </a>

              <div className="flex items-center gap-3 text-muted-foreground">
                <MapPin className="w-5 h-5" />
                <span>Ciudad de Panamá</span>
              </div>
            </div>
          </div>

          <Separator className="bg-muted/20" />

          <div className="flex items-center gap-4">
            <a
              href="https://linkedin.com/company/docsier"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-brand-sage transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a
              href="https://twitter.com/docsier"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-brand-sage transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
              </svg>
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
