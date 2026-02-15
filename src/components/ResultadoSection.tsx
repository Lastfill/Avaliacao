import { TrendingUp, BarChart3, MapPin, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AvaliacaoResult, formatCurrency } from "@/lib/bairros-data";

interface ResultadoSectionProps {
  result: AvaliacaoResult;
  whatsapp: string;
}

const ResultadoSection = ({ result, whatsapp }: ResultadoSectionProps) => {
  const diffPercent = ((result.valorM2 - result.valorM2Bairro) / result.valorM2Bairro * 100).toFixed(1);
  const diffPositive = result.valorM2 >= result.valorM2Bairro;

  const whatsappLink = `https://wa.me/55${whatsapp.replace(/\D/g, "")}?text=${encodeURIComponent(
    `Olá! Fiz uma avaliação do meu imóvel em ${result.bairro} e o valor estimado foi de ${formatCurrency(result.valorMedio)}. Gostaria de falar com um especialista.`
  )}`;

  return (
    <section id="resultado" className="py-20 gradient-navy">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <p className="text-gold font-sans text-sm uppercase tracking-[0.2em] mb-3 font-medium">Resultado da avaliação</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-primary-foreground mb-2">
            Estimativa de Valor do Imóvel
          </h2>
          <p className="text-primary-foreground/60 font-sans flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" /> {result.bairro}, Rio de Janeiro
          </p>
        </div>

        {/* Main Value Card */}
        <div className="max-w-2xl mx-auto mb-10">
          <div className="bg-card/10 backdrop-blur-md border border-gold/20 rounded-2xl p-8 md:p-10 text-center">
            <p className="text-primary-foreground/70 font-sans text-sm mb-2">Faixa de valor estimada</p>
            <div className="flex items-baseline justify-center gap-3 mb-2 flex-wrap">
              <span className="text-primary-foreground/80 font-sans text-lg">{formatCurrency(result.valorMinimo)}</span>
              <span className="text-gold text-sm">a</span>
              <span className="text-primary-foreground/80 font-sans text-lg">{formatCurrency(result.valorMaximo)}</span>
            </div>
            <p className="font-display text-5xl md:text-6xl font-bold text-gold mt-4 mb-2 animate-counter">
              {formatCurrency(result.valorMedio)}
            </p>
            <p className="text-primary-foreground/50 font-sans text-sm">Valor médio estimado</p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard
            icon={<BarChart3 className="h-5 w-5 text-gold" />}
            label="Valor por m²"
            value={formatCurrency(result.valorM2)}
          />
          <StatCard
            icon={<MapPin className="h-5 w-5 text-gold" />}
            label={`Média ${result.bairro}`}
            value={`${formatCurrency(result.valorM2Bairro)}/m²`}
          />
          <StatCard
            icon={<TrendingUp className="h-5 w-5 text-gold" />}
            label="Comparativo bairro"
            value={`${diffPositive ? "+" : ""}${diffPercent}%`}
            highlight={diffPositive}
          />
        </div>

        {/* CTA */}
        <div className="text-center">
          <a href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="h-14 px-10 text-base font-semibold gradient-gold text-navy-dark hover:opacity-90 transition-opacity shadow-gold rounded-xl gap-2">
              <MessageCircle className="h-5 w-5" />
              Falar com Especialista
            </Button>
          </a>
          <p className="text-primary-foreground/40 font-sans text-xs mt-4 max-w-md mx-auto">
            *Valores estimados com base em dados de mercado. Avaliação oficial requer vistoria presencial.
          </p>
        </div>
      </div>
    </section>
  );
};

function StatCard({ icon, label, value, highlight }: { icon: React.ReactNode; label: string; value: string; highlight?: boolean }) {
  return (
    <div className="bg-card/10 backdrop-blur-sm border border-primary-foreground/10 rounded-xl p-6 text-center">
      <div className="flex justify-center mb-3">{icon}</div>
      <p className="text-primary-foreground/50 font-sans text-xs uppercase tracking-wider mb-1">{label}</p>
      <p className={`font-sans text-xl font-bold ${highlight ? "text-green-400" : "text-primary-foreground"}`}>{value}</p>
    </div>
  );
}

export default ResultadoSection;
