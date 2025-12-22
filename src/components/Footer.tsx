export const Footer = () => {
  return (
    <footer className="bg-background py-12 border-t border-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center space-y-4">
          <p className="text-foreground font-medium">
            <span className="text-xl font-semibold">DOCSIER</span>
            <span className="text-muted-foreground"> — Para abogados independientes y microfirmas que prefieren operar limpiamente.</span>
          </p>
          
          <p className="text-sm text-muted-foreground">
            Hecho en Panamá 🇵🇦 • Seguridad sin transacciones.
          </p>
          
          <p className="text-xs text-muted-foreground/60">
            © {new Date().getFullYear()} DOCSIER. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
