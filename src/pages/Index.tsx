import { useState, useRef } from "react";
import HeroSection from "@/components/HeroSection";
import AvaliacaoForm, { AvaliacaoFormRef } from "@/components/AvaliacaoForm";
import LeadGate from "@/components/LeadGate";
import ResultadoSection from "@/components/ResultadoSection";
import Footer from "@/components/Footer";
import { TipoImovel, AvaliacaoInput, AvaliacaoResult, calcularAvaliacao } from "@/lib/bairros-data";

type Stage = "hero" | "form" | "lead-gate" | "resultado";

const Index = () => {
  const [stage, setStage] = useState<Stage>("hero");
  const [heroData, setHeroData] = useState({ endereco: "", bairro: "", tipo: "Apartamento" as TipoImovel });
  const [pendingResult, setPendingResult] = useState<AvaliacaoResult | null>(null);
  const [finalResult, setFinalResult] = useState<AvaliacaoResult | null>(null);
  const [leadWhatsapp, setLeadWhatsapp] = useState("");
  const formRef = useRef<AvaliacaoFormRef>(null);

  const handleHeroSubmit = (endereco: string, bairro: string, tipo: TipoImovel) => {
    setHeroData({ endereco, bairro, tipo });
    setStage("form");
    setTimeout(() => formRef.current?.scrollIntoView(), 100);
  };

  const handleFormSubmit = (data: AvaliacaoInput) => {
    const result = calcularAvaliacao(data);
    setPendingResult(result);
    setLeadWhatsapp(data.whatsapp);

    // If they already filled contact data in the form, skip gate
    if (data.nome && data.whatsapp && data.email) {
      setFinalResult(result);
      setStage("resultado");
    } else {
      setStage("lead-gate");
    }

    setTimeout(() => {
      const target = document.getElementById("resultado") || document.querySelector("section:last-of-type");
      target?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  const handleLeadSubmit = (_nome: string, whatsapp: string, _email: string) => {
    setLeadWhatsapp(whatsapp);
    setFinalResult(pendingResult);
    setStage("resultado");
    setTimeout(() => {
      document.getElementById("resultado")?.scrollIntoView({ behavior: "smooth" });
    }, 150);
  };

  return (
    <main className="min-h-screen">
      <HeroSection onAvaliar={handleHeroSubmit} />

      {(stage === "form" || stage === "lead-gate" || stage === "resultado") && (
        <AvaliacaoForm
          ref={formRef}
          initialEndereco={heroData.endereco}
          initialBairro={heroData.bairro}
          initialTipo={heroData.tipo}
          onSubmit={handleFormSubmit}
        />
      )}

      {stage === "lead-gate" && pendingResult && (
        <LeadGate onSubmit={handleLeadSubmit} />
      )}

      {stage === "resultado" && finalResult && (
        <ResultadoSection result={finalResult} whatsapp={leadWhatsapp} />
      )}

      <Footer />
    </main>
  );
};

export default Index;
