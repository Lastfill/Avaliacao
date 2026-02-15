import { useState, forwardRef, useImperativeHandle } from "react";
import { Building, Home, Car, Bath, Layers, Ruler, MapPin, Mail, Phone, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { bairrosRJ, TipoImovel, EstadoImovel, AvaliacaoInput } from "@/lib/bairros-data";

const tiposImovel: TipoImovel[] = ["Apartamento", "Casa", "Cobertura", "Comercial", "Terreno"];
const estadosImovel: EstadoImovel[] = ["Novo", "Reformado", "Bom", "Precisa reforma"];

interface AvaliacaoFormProps {
  initialEndereco?: string;
  initialBairro?: string;
  initialTipo?: TipoImovel;
  onSubmit: (data: AvaliacaoInput) => void;
}

export interface AvaliacaoFormRef {
  scrollIntoView: () => void;
}

const AvaliacaoForm = forwardRef<AvaliacaoFormRef, AvaliacaoFormProps>(
  ({ initialEndereco = "", initialBairro = "", initialTipo = "Apartamento", onSubmit }, ref) => {
    const [formData, setFormData] = useState<AvaliacaoInput>({
      endereco: initialEndereco,
      bairro: initialBairro,
      cep: "",
      tipologia: initialTipo,
      metragem: 0,
      quartos: 0,
      suites: 0,
      vagas: 0,
      banheiros: 0,
      andar: 0,
      estado: "Bom",
      valorDesejado: undefined,
      nome: "",
      whatsapp: "",
      email: "",
    });

    useImperativeHandle(ref, () => ({
      scrollIntoView: () => {
        document.getElementById("formulario")?.scrollIntoView({ behavior: "smooth" });
      },
    }));

    const [cepLoading, setCepLoading] = useState(false);

    const update = (field: keyof AvaliacaoInput, value: string | number) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const formatCep = (value: string) => {
      const digits = value.replace(/\D/g, "").slice(0, 8);
      return digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits;
    };

    const handleCepChange = async (raw: string) => {
      const formatted = formatCep(raw);
      update("cep", formatted);
      const digits = formatted.replace(/\D/g, "");
      if (digits.length === 8) {
        setCepLoading(true);
        try {
          const res = await fetch(`https://viacep.com.br/ws/${digits}/json/`);
          const data = await res.json();
          if (!data.erro) {
            setFormData((prev) => ({
              ...prev,
              endereco: data.logradouro ? `${data.logradouro}${data.complemento ? `, ${data.complemento}` : ""}` : prev.endereco,
              bairro: bairrosRJ.find((b) => b.nome.toLowerCase() === data.bairro?.toLowerCase())?.nome || prev.bairro,
            }));
          }
        } catch { /* silently fail */ }
        setCepLoading(false);
      }
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };

    const SelectField = ({ value, onChange, options, placeholder }: { value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) => (
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full h-12 px-4 rounded-md bg-muted/50 border border-border text-foreground font-sans text-sm appearance-none cursor-pointer focus:outline-none focus:ring-2 focus:ring-ring"
          required
        >
          {placeholder && <option value="">{placeholder}</option>}
          {options.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      </div>
    );

    return (
      <section id="formulario" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-4">
              Avaliação Completa do Imóvel
            </h2>
            <p className="text-muted-foreground font-sans max-w-xl mx-auto">
              Preencha os dados abaixo para receber uma estimativa precisa baseada no mercado imobiliário do Rio de Janeiro.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="max-w-4xl mx-auto bg-card rounded-2xl shadow-xl p-8 md:p-10">
            {/* Localização */}
            <div className="mb-10">
              <h3 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-gold" /> Localização
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2">
                  <Label className="font-sans text-sm text-muted-foreground mb-1.5 block">Endereço</Label>
                  <Input value={formData.endereco} onChange={(e) => update("endereco", e.target.value)} placeholder="Rua, número" className="h-12 bg-muted/50" required />
                </div>
                <div>
                  <Label className="font-sans text-sm text-muted-foreground mb-1.5 block">CEP</Label>
                  <div className="relative">
                    <Input value={formData.cep} onChange={(e) => handleCepChange(e.target.value)} placeholder="00000-000" className="h-12 bg-muted/50" required />
                    {cepLoading && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground animate-pulse">Buscando...</span>}
                  </div>
                </div>
                <div className="md:col-span-3">
                  <Label className="font-sans text-sm text-muted-foreground mb-1.5 block">Bairro</Label>
                  <SelectField value={formData.bairro} onChange={(v) => update("bairro", v)} options={bairrosRJ.map((b) => b.nome)} placeholder="Selecione o bairro" />
                </div>
              </div>
            </div>

            {/* Características */}
            <div className="mb-10">
              <h3 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <Building className="h-5 w-5 text-gold" /> Características
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div>
                  <Label className="font-sans text-sm text-muted-foreground mb-1.5 block">Tipologia</Label>
                  <SelectField value={formData.tipologia} onChange={(v) => update("tipologia", v)} options={tiposImovel} />
                </div>
                <div>
                  <Label className="font-sans text-sm text-muted-foreground mb-1.5 flex items-center gap-1"><Ruler className="h-3.5 w-3.5" /> Metragem (m²)</Label>
                  <Input type="number" min={1} value={formData.metragem || ""} onChange={(e) => update("metragem", Number(e.target.value))} placeholder="Ex: 80" className="h-12 bg-muted/50" required />
                </div>
                <div>
                  <Label className="font-sans text-sm text-muted-foreground mb-1.5 flex items-center gap-1"><Home className="h-3.5 w-3.5" /> Quartos</Label>
                  <Input type="number" min={0} value={formData.quartos ?? ""} onChange={(e) => update("quartos", Number(e.target.value))} placeholder="0" className="h-12 bg-muted/50" required />
                </div>
                <div>
                  <Label className="font-sans text-sm text-muted-foreground mb-1.5 block">Suítes</Label>
                  <Input type="number" min={0} value={formData.suites ?? ""} onChange={(e) => update("suites", Number(e.target.value))} placeholder="0" className="h-12 bg-muted/50" />
                </div>
                <div>
                  <Label className="font-sans text-sm text-muted-foreground mb-1.5 flex items-center gap-1"><Car className="h-3.5 w-3.5" /> Vagas</Label>
                  <Input type="number" min={0} value={formData.vagas ?? ""} onChange={(e) => update("vagas", Number(e.target.value))} placeholder="0" className="h-12 bg-muted/50" required />
                </div>
                <div>
                  <Label className="font-sans text-sm text-muted-foreground mb-1.5 flex items-center gap-1"><Bath className="h-3.5 w-3.5" /> Banheiros</Label>
                  <Input type="number" min={0} value={formData.banheiros || ""} onChange={(e) => update("banheiros", Number(e.target.value))} placeholder="0" className="h-12 bg-muted/50" required />
                </div>
                {formData.tipologia === "Apartamento" && (
                  <div>
                    <Label className="font-sans text-sm text-muted-foreground mb-1.5 flex items-center gap-1"><Layers className="h-3.5 w-3.5" /> Andar</Label>
                    <Input type="number" min={0} value={formData.andar || ""} onChange={(e) => update("andar", Number(e.target.value))} placeholder="0" className="h-12 bg-muted/50" />
                  </div>
                )}
                <div>
                  <Label className="font-sans text-sm text-muted-foreground mb-1.5 block">Estado do imóvel</Label>
                  <SelectField value={formData.estado} onChange={(v) => update("estado", v)} options={estadosImovel} />
                </div>
              </div>
            </div>

            {/* Dados adicionais */}
            <div className="mb-10">
              <h3 className="font-display text-xl font-semibold text-foreground mb-6 flex items-center gap-2">
                <User className="h-5 w-5 text-gold" /> Seus Dados
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label className="font-sans text-sm text-muted-foreground mb-1.5 block">Nome</Label>
                  <Input value={formData.nome} onChange={(e) => update("nome", e.target.value)} placeholder="Seu nome" className="h-12 bg-muted/50" required />
                </div>
                <div>
                  <Label className="font-sans text-sm text-muted-foreground mb-1.5 flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> WhatsApp</Label>
                  <Input value={formData.whatsapp} onChange={(e) => update("whatsapp", e.target.value)} placeholder="(21) 99999-9999" className="h-12 bg-muted/50" required />
                </div>
                <div>
                  <Label className="font-sans text-sm text-muted-foreground mb-1.5 flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> Email</Label>
                  <Input type="email" value={formData.email} onChange={(e) => update("email", e.target.value)} placeholder="seu@email.com" className="h-12 bg-muted/50" required />
                </div>
              </div>
              <div className="mt-4">
                <Label className="font-sans text-sm text-muted-foreground mb-1.5 block">Valor estimado desejado (opcional)</Label>
                <Input type="number" value={formData.valorDesejado || ""} onChange={(e) => update("valorDesejado", Number(e.target.value))} placeholder="R$ (opcional)" className="h-12 bg-muted/50 max-w-xs" />
              </div>
            </div>

            <Button type="submit" size="lg" className="w-full h-14 text-base font-semibold gradient-gold text-navy-dark hover:opacity-90 transition-opacity shadow-gold rounded-xl">
              Calcular Valor Médio
            </Button>
          </form>
        </div>
      </section>
    );
  }
);

AvaliacaoForm.displayName = "AvaliacaoForm";
export default AvaliacaoForm;
