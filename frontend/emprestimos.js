
// Carrega os livros e exibe na página de empréstimos
fetch('http://localhost:8000/livros')
  .then(res => res.json())
  .then(livros => {
    const container = document.getElementById('livros-emprestimo');
    container.innerHTML = '';
    let livroSelecionadoId = localStorage.getItem('livroEmprestimoId');
    let livroSelecionado = null;
    livros.forEach((livro, idx) => {
      const card = document.createElement('div');
      card.className = 'card';
      card.innerHTML = `
        <h2>${livro.titulo}</h2>
        <p><strong>Autor:</strong> ${livro.autor}</p>
        <p><strong>Ano:</strong> ${livro.ano || '-'}</p>
        <p><strong>Disponibilidade:</strong> ${livro.status === 'disponivel' ? 'Disponível' : 'Emprestado'}</p>
        <button class="btn-acento detalhes-btn">Ver detalhes</button>
      `;
      card.querySelector('.detalhes-btn').onclick = function() {
        mostrarDetalhesLivro(livro, livro.sinopse);
      };
      container.appendChild(card);
      // Verifica se é o livro selecionado
      if (livroSelecionadoId && livro.id == livroSelecionadoId) {
        livroSelecionado = livro;
      }
    });
    // Se houver livro selecionado, mostra o modal automaticamente
    if (livroSelecionado) {
  mostrarDetalhesLivro(livroSelecionado, livroSelecionado.sinopse);
  localStorage.removeItem('livroEmprestimoId');
    }
  });

function mostrarDetalhesLivro(livro, sinopse) {
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <div class="modal-conteudo">
      <h2>${livro.titulo}</h2>
      <p><strong>Autor:</strong> ${livro.autor}</p>
      <p><strong>Ano:</strong> ${livro.ano || '-'}</p>
      <p><strong>Disponibilidade:</strong> ${livro.status === 'disponivel' ? 'Disponível' : 'Emprestado'}</p>
      <p><strong>Sinopse:</strong> ${sinopse || 'Sinopse não cadastrada.'}</p>
      <button class="btn-cancelar fechar-modal">Fechar</button>
    </div>
  `;
  document.body.appendChild(modal);
  modal.querySelector('.fechar-modal').onclick = function() {
    modal.remove();
  };
}
