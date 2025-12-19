export const CostSection = () => {
  return (
    <section id="cost-section" className="bg-bg-secondary section-padding">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto text-center space-y-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
            ¿Cuánto vale tu tiempo?
          </h2>

          <div className="bg-bg-elevated rounded-2xl p-8 border border-muted/20">
            <p className="text-4xl sm:text-5xl font-bold text-brand-coral">
              20 horas/semana × $150/hora
            </p>
            <p className="text-5xl sm:text-6xl font-bold text-foreground mt-4">
              = $3,000
            </p>
          </div>

          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Eso es lo que pierdes cada semana en trabajo que no requiere un abogado.
          </p>
        </div>
      </div>
    </section>
  );
};
