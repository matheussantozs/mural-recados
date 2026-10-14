'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [recados, setRecados] = useState([]);
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);

  // Busca a lista de recados da API
  async function carregarRecados() {
    try {
      const res = await fetch('/api/recados');
      const data = await res.json();
      if (Array.isArray(data)) {
        setRecados(data);
      }
    } catch (err) {
      console.error('Erro ao buscar recados', err);
    }
  }

  useEffect(() => {
    carregarRecados();
  }, []);

  // Envia o formulário
  async function handleSubmit(e) {
    e.preventDefault();
    if (!nome.trim() || !mensagem.trim()) return;

    setCarregando(true);
    try {
      const res = await fetch('/api/recados', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, mensagem }),
      });

      if (res.ok) {
        setNome('');
        setMensagem('');
        carregarRecados(); // Recarrega a lista
      }
    } catch (err) {
      console.error('Erro ao enviar recado', err);
    } finally {
      setCarregando(false);
    }
  }

  return (
    <main className="container">
      <h1>💬 Mural de Recados</h1>
      <p className="subtitle">Deixe sua mensagem salva no nosso banco Neon!</p>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="card form">
        <div className="input-group">
          <label htmlFor="nome">Seu Nome:</label>
          <input
            id="nome"
            type="text"
            placeholder="Ex: Ana Silva"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>

        <div className="input-group">
          <label htmlFor="mensagem">Sua Mensagem:</label>
          <textarea
            id="mensagem"
            rows="3"
            placeholder="Escreva algo legal..."
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            required
          ></textarea>
        </div>

        <button type="submit" disabled={carregando}>
          {carregando ? 'Enviando...' : 'Enviar Recado'}
        </button>
      </form>

      {/* Lista de recados */}
      <section>
        <h2>Recados Recentes</h2>
        {recados.length === 0 ? (
          <p className="empty">Nenhum recado ainda. Seja o primeiro a escrever!</p>
        ) : (
          <div className="recados-grid">
            {recados.map((item) => (
              <div key={item.id} className="card recado-item">
                <div className="recado-header">
                  <strong>{item.nome}</strong>
                  <small>{new Date(item.criado_em).toLocaleDateString('pt-BR')}</small>
                </div>
                <p>{item.mensagem}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}