import React from 'react';
import './App.css'; // Mantenha seus estilos globais
import CepInput from './components/CepInput'; // Importe o novo componente
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Meu Aplicativo</h1>
      </header>
      <main>
        {/* Aqui você pode renderizar o componente CepInput */}
        <CepInput />
        {/* Outros conteúdos da sua aplicação */}
      </main>
    </div>
  );
}
export default App;
