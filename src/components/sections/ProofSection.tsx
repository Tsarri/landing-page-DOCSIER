export const ProofSection = () => {
  return (
    <section className="bg-bg-secondary section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-brand-coral">
            83%
          </h2>
          <p className="text-2xl font-semibold text-foreground">
            menos errores de plazo
          </p>

          <p className="text-lg text-muted-foreground">
            Resultado promedio de 12 firmas en Panamá usando DOCSIER.
          </p>

          <div className="inline-flex items-center gap-3 bg-bg-elevated rounded-full px-6 py-3 border border-brand-sage/30">
            <span className="text-2xl font-bold text-brand-sage">15</span>
            <span className="text-foreground font-medium">horas recuperadas por semana</span>
          </div>
        </div>
      </div>
    </section>
  );
};
