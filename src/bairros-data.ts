export interface BairroData {
  nome: string;
  valorM2: number;
}

export const bairrosRJ: BairroData[] = [
  { nome: "Barra da Tijuca", valorM2: 12000 },
  { nome: "Recreio dos Bandeirantes", valorM2: 9000 },
  { nome: "Copacabana", valorM2: 14000 },
  { nome: "Tijuca", valorM2: 8000 },
  { nome: "Ipanema", valorM2: 18000 },
  { nome: "Leblon", valorM2: 22000 },
  { nome: "Botafogo", valorM2: 13000 },
  { nome: "Flamengo", valorM2: 11000 },
  { nome: "Laranjeiras", valorM2: 10500 },
  { nome: "Jardim Botânico", valorM2: 16000 },
  { nome: "Gávea", valorM2: 17000 },
  { nome: "São Conrado", valorM2: 15000 },
  { nome: "Lagoa", valorM2: 19000 },
  { nome: "Humaitá", valorM2: 12500 },
  { nome: "Catete", valorM2: 9500 },
  { nome: "Glória", valorM2: 9000 },
  { nome: "Centro", valorM2: 7000 },
  { nome: "Lapa", valorM2: 7500 },
  { nome: "Santa Teresa", valorM2: 8500 },
  { nome: "Vila Isabel", valorM2: 7000 },
  { nome: "Grajaú", valorM2: 6500 },
  { nome: "Méier", valorM2: 5500 },
  { nome: "Madureira", valorM2: 4000 },
  { nome: "Jacarepaguá", valorM2: 7500 },
  { nome: "Taquara", valorM2: 6000 },
  { nome: "Freguesia", valorM2: 7000 },
  { nome: "Pechincha", valorM2: 6500 },
  { nome: "Del Castilho", valorM2: 5000 },
  { nome: "Penha", valorM2: 4500 },
  { nome: "Campo Grande", valorM2: 3500 },
  { nome: "Santa Cruz", valorM2: 2500 },
  { nome: "Guaratiba", valorM2: 3000 },
  { nome: "Bangu", valorM2: 3000 },
  { nome: "Realengo", valorM2: 3500 },
  { nome: "Ilha do Governador", valorM2: 5500 },
  { nome: "Urca", valorM2: 16000 },
  { nome: "Cosme Velho", valorM2: 11000 },
  { nome: "Leme", valorM2: 13500 },
];

export type TipoImovel = "Apartamento" | "Casa" | "Cobertura" | "Comercial" | "Terreno";
export type EstadoImovel = "Novo" | "Reformado" | "Bom" | "Precisa reforma";

export interface AvaliacaoInput {
  endereco: string;
  bairro: string;
  cep: string;
  tipologia: TipoImovel;
  metragem: number;
  quartos: number;
  suites: number;
  vagas: number;
  banheiros: number;
  andar: number;
  estado: EstadoImovel;
  valorDesejado?: number;
  nome: string;
  whatsapp: string;
  email: string;
}

export interface AvaliacaoResult {
  valorMinimo: number;
  valorMedio: number;
  valorMaximo: number;
  valorM2: number;
  valorM2Bairro: number;
  bairro: string;
}

export function calcularAvaliacao(input: AvaliacaoInput): AvaliacaoResult {
  const bairro = bairrosRJ.find(
    (b) => b.nome.toLowerCase() === input.bairro.toLowerCase()
  );
  const valorM2Bairro = bairro?.valorM2 ?? 8000;

  let valorBase = input.metragem * valorM2Bairro;

  // Ajustes
  let fator = 1;

  // Suítes: +8% por suíte
  fator += input.suites * 0.08;

  // Vagas: +5% por vaga
  if (input.vagas > 0) {
    fator += input.vagas * 0.05;
  } else {
    fator -= 0.07; // Sem vaga: -7%
  }

  // Estado do imóvel
  switch (input.estado) {
    case "Novo":
      fator += 0.15;
      break;
    case "Reformado":
      fator += 0.08;
      break;
    case "Bom":
      break;
    case "Precisa reforma":
      fator -= 0.12;
      break;
  }

  // Tipologia
  if (input.tipologia === "Cobertura") fator += 0.25;
  if (input.tipologia === "Terreno") fator -= 0.15;
  if (input.tipologia === "Comercial") fator -= 0.05;

  // Andar (apartamentos)
  if (input.tipologia === "Apartamento" && input.andar > 0) {
    fator += Math.min(input.andar * 0.01, 0.15);
  }

  const valorMedio = valorBase * fator;
  const valorMinimo = valorMedio * 0.88;
  const valorMaximo = valorMedio * 1.12;
  const valorM2 = valorMedio / input.metragem;

  return {
    valorMinimo,
    valorMedio,
    valorMaximo,
    valorM2,
    valorM2Bairro,
    bairro: input.bairro,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(value);
}
