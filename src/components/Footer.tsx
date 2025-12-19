export const Footer = () => {
  return (
    <footer className="bg-background py-10 border-t border-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground/60">DOCSIER</span>
          <span className="hidden sm:inline">·</span>
          <span>© {new Date().getFullYear()} Todos los derechos reservados</span>
          <span className="hidden sm:inline">·</span>
          <span>Hecho en Panamá 🇵🇦</span>
        </div>
      </div>
    </footer>
  );
};
