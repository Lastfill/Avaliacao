import { useState } from "react";
import { Building2, MapPin, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { bairrosRJ, TipoImovel } from "@/lib/bairros-data";
import heroImage from "@/assets/hero-rio.jpg";

const tiposImovel: TipoImovel[] = ["Apartamento", "Casa", "Cobertura", "Comercial", "Terreno"];

interface HeroSectionProps {
  onAvaliar: (endereco: string, bairro: string, tipo: TipoImovel) => void;
}

const HeroSection = ({ onAvaliar }: HeroSectionProps) => {
  const [endereco, setEndereco] = useState("");
  const [bairro, setBairro] = useState("");
  const [tipo, setTipo] = useState<TipoImovel>("Apartamento");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (endereco && bairro) {
      onAvaliar(endereco, bairro, tipo);
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img src={heroImage} alt="Rio de Janeiro" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/80 via-navy/70 to-navy-dark/90" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-20 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-gold font-sans text-sm md:text-base uppercase tracking-[0.25em] mb-6 animate-fade-up font-medium">
            Avaliação gratuita • Dados reais do mercado carioca
          </p>
          <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
            Descubra o valor do seu imóvel no{" "}
            <span className="text-gold">Rio de Janeiro</span>{" "}
            em segundos
          </h1>
          <p className="font-sans text-lg md:text-xl text-primary-foreground/80 mb-12 max-w-2xl mx-auto animate-fade-up" style={{ animationDelay: "0.2s" }}>
            Utilizamos dados reais de mercado, ITBI e média por m² da região para estimar o valor do seu imóvel.
          </p>

          {/* Quick Form */}
          <form
            onSubmit={handleSubmit}
            className="bg-card/95 backdrop-blur-md rounded-2xl p-6 md:p-8 shadow-2xl max-w-3xl mx-auto animate-fade-up"
            style={{ animationDelay: "0.3s" }}
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  placeholder="Endereço completo"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  className="pl-10 h-12 bg-muted/50 border-border font-sans text-foreground"
                  required
                />
              </div>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground z-10" />
                <select
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  required
                  className="w-full h-12 pl-10 pr-10 rounded-md bg-muted/50 border border-border text-foreground font-sans text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Selecione o bairro</option>
                  {bairrosRJ.map((b) => (
                    <option key={b.nome} value={b.nome}>{b.nome}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
              <div className="relative">
                <select
                  value={tipo}
                  onChange={(e) => setTipo(e.target.value as TipoImovel)}
                  className="w-full h-12 px-4 rounded-md bg-muted/50 border border-border text-foreground font-sans text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  {tiposImovel.map((t) => (
                    <option key={t} value={t}>{t}</option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <Button type="submit" size="lg" className="w-full md:w-auto px-12 h-14 text-base font-semibold gradient-gold text-navy-dark hover:opacity-90 transition-opacity shadow-gold rounded-xl">
              Avaliar Imóvel Gratuitamente
            </Button>
          </form>

          {/* Trust badges */}
          <div className="flex flex-wrap items-center justify-center gap-6 mt-10 animate-fade-up" style={{ animationDelay: "0.4s" }}>
            {["+ 5.000 avaliações", "Dados ITBI & mercado", "100% gratuito"].map((text) => (
              <span key={text} className="flex items-center gap-2 text-primary-foreground/70 text-sm font-sans">
                <span className="w-2 h-2 rounded-full bg-gold" />
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
