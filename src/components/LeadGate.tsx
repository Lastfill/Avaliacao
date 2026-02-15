import { useState } from "react";
import { Lock, User, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface LeadGateProps {
  onSubmit: (nome: string, whatsapp: string, email: string) => void;
}

const LeadGate = ({ onSubmit }: LeadGateProps) => {
  const [nome, setNome] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nome && whatsapp && email) {
      onSubmit(nome, whatsapp, email);
    }
  };

  return (
    <section className="py-20 gradient-navy">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-card rounded-2xl shadow-2xl p-8 md:p-10 text-center">
          <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-6">
            <Lock className="h-7 w-7 text-gold" />
          </div>
          <h3 className="font-display text-2xl font-bold text-foreground mb-2">
            Seu resultado está pronto!
          </h3>
          <p className="text-muted-foreground font-sans text-sm mb-8">
            Preencha seus dados para visualizar a avaliação completa do seu imóvel.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <div>
              <Label className="font-sans text-sm text-muted-foreground mb-1.5 flex items-center gap-1">
                <User className="h-3.5 w-3.5" /> Nome
              </Label>
              <Input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome completo" className="h-12 bg-muted/50" required />
            </div>
            <div>
              <Label className="font-sans text-sm text-muted-foreground mb-1.5 flex items-center gap-1">
                <Phone className="h-3.5 w-3.5" /> WhatsApp
              </Label>
              <Input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} placeholder="(21) 99999-9999" className="h-12 bg-muted/50" required />
            </div>
            <div>
              <Label className="font-sans text-sm text-muted-foreground mb-1.5 flex items-center gap-1">
                <Mail className="h-3.5 w-3.5" /> Email
              </Label>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" className="h-12 bg-muted/50" required />
            </div>
            <Button type="submit" size="lg" className="w-full h-14 text-base font-semibold gradient-gold text-navy-dark hover:opacity-90 transition-opacity shadow-gold rounded-xl mt-4">
              Ver Resultado Completo
            </Button>
          </form>

          <p className="text-muted-foreground/60 font-sans text-xs mt-6">
            🔒 Seus dados estão seguros e não serão compartilhados.
          </p>
        </div>
      </div>
    </section>
  );
};

export default LeadGate;
