import React, { useState } from 'react';
function CepInput() {
  const [cep, setCep] = useState('');
  const [logradouro, setLogradouro] = useState('');
  const [bairro, setBairro] = useState('');
  const [localidade, setLocalidade] = useState('');
  const [uf, setUf] = useState('');
  const [error, setError] = useState('');
  const handleCepChange = (e) => {
    const newCep = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setCep(newCep);
    if (newCep.length === 8) {
      fetch(`https://viacep.com.br/ws/${newCep}/json/`)
        .then(res => res.json())
        .then(data => {
          if (data.erro) {
            setError('CEP não encontrado.');
            setLogradouro('');
            setBairro('');
            setLocalidade('');
            setUf('');
          } else {
            setError('');
            setLogradouro(data.logradouro);
            setBairro(data.bairro);
            setLocalidade(data.localidade);
            setUf(data.uf);
          }
        })
        .catch(err => {
          setError('Erro ao buscar CEP. Tente novamente.');
          setLogradouro('');
          setBairro('');
          setLocalidade('');
          setUf('');
          console.error("Erro ao buscar CEP:", err);
        });
    } else {
      setLogradouro('');
      setBairro('');
      setLocalidade('');
      setUf('');
      setError('');
    }
  };
  return (
    <div className="cep-form-container">
      <h2>Consulta de Endereço por CEP</h2>
      <div className="form-group">
        <label htmlFor="cep">CEP:</label>
        <input
          type="text"
          id="cep"
          value={cep}
          onChange={handleCepChange}
          maxLength="8"
          placeholder="Digite o CEP (somente números)"
          className="cep-input"
        />
        {error && <p className="error-message">{error}</p>}
      </div>
      <div className="form-group">
        <label htmlFor="logradouro">Logradouro:</label>
        <input type="text" id="logradouro" value={logradouro} readOnly className="address-input" />
      </div>
      <div className="form-group">
        <label htmlFor="bairro">Bairro:</label>
        <input type="text" id="bairro" value={bairro} readOnly className="address-input" />
      </div>
      <div className="form-group">
        <label htmlFor="localidade">Cidade:</label>
        <input type="text" id="localidade" value={localidade} readOnly className="address-input" />
      </div>
      <div className="form-group">
        <label htmlFor="uf">Estado (UF):</label>
        <input type="text" id="uf" value={uf} readOnly className="address-input" />
      </div>
    </div>
  );
}
export default CepInput;
