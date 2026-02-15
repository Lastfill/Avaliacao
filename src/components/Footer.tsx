const Footer = () => (
  <footer className="bg-navy-dark py-10">
    <div className="container mx-auto px-4 text-center">
      <p className="font-display text-lg font-bold text-primary-foreground/80 mb-2">
        Avaliação Imobiliária <span className="text-gold">RJ</span>
      </p>
      <p className="text-primary-foreground/40 font-sans text-sm mb-6">
        Saiba quanto vale seu imóvel no Rio de Janeiro — avaliação gratuita baseada em dados reais de mercado.
      </p>
      <div className="border-t border-primary-foreground/10 pt-6">
        <p className="text-primary-foreground/30 font-sans text-xs">
          © {new Date().getFullYear()} Avaliação Imobiliária RJ. Todos os direitos reservados.
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
